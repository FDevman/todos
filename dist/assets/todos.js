"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('todos/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].FixtureAdapter.extend({
		defaultSerializer: "-default"
	});

});
define('todos/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'todos/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('todos/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'todos/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('todos/components/todo-li', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({

		completed: Ember['default'].observer('todo.isCompleted', function () {
			this.get('todo').save();
		}),

		actions: {
			'delete': function _delete(todo) {

				var title = todo.get('title');

				console.log('delete: ' + title);

				todo.deleteRecord();
				todo.save();
			},

			editTodo: function editTodo() {
				// console.log(this.get('todo'));
				// Set component to edit mode
				this.set('isEditing', true);
				// Initialize the text to the current title
				this.set('editedTitle', this.get('todo').get('title'));
			},

			commitEdit: function commitEdit() {
				// Get the current title
				var newtitle = this.get('editedTitle');
				var todo = this.get('todo');

				// If new title is null or empty, just go back to normal mode
				if (!newtitle.trim()) {
					this.set('isEditing', false);
					return;
				}

				// console.log(this);

				// Save changed
				todo.set('title', newtitle);

				// this.save();

				// Go back to normal mode.
				this.set('isEditing', false);
			}
		},

		isEditing: false
	});

});
define('todos/components/toggle-all', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({

		allCompleted: false,

		completed: Ember['default'].observer('allCompleted', function () {
			this.get('todos').forEach(function (rec) {
				Ember['default'].run.once(this, function () {
					rec.set('isCompleted', this.allCompleted);
					rec.save();
				});
			}, this);
		})

	});

});
define('todos/controllers/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		actions: {
			createTodo: function createTodo() {
				// Get the todo title set by the "New Todo" text field
				var title = this.get('newTitle');
				if (!title.trim()) {
					return;
				}

				// Create the new Todo model
				var todo = this.store.createRecord('todo', {
					title: title,
					isCompleted: false
				});

				// Clear the "New Todo" text field
				this.set('newTitle', '');

				console.log('Saving Todo: ' + title);

				// Save the new model
				todo.save();
			},
			clear: function clear() {
				this.get('model').completed.forEach(function (rec) {
					Ember['default'].run.once(this, function () {
						rec.deleteRecord();
						rec.save();
					});
				}, this);
			}
		},

		remaining: Ember['default'].computed('model.all.@each.isCompleted', function () {
			return this.get('model').active.get('length');
		}),

		inflection: Ember['default'].computed('remaining', function () {
			var remaining = this.get('remaining');
			return remaining === 1 ? 'item' : 'items';
		}),

		completed: Ember['default'].computed('model.all.@each.isCompleted', function () {
			return this.get('model').completed.get('length');
		})
	});

});
define('todos/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('todos/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('todos/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'todos/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('todos/initializers/export-application-global', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('todos/mirage/config', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () {

    this.get('/api/todos', function () {
      return {
        todos: [{
          id: 1,
          title: 'Learn Ember.js',
          isCompleted: true
        }, {
          id: 2,
          title: '...',
          isCompleted: false
        }, {
          id: 3,
          title: 'Profit!',
          isCompleted: false
        }]
      };
    });

    // These comments are here to help you get started. Feel free to delete them.

    /*
      Config (with defaults).
       Note: these only affect routes defined *after* them!
      */
    // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
    // this.namespace = '';    // make this `api`, for example, if your API is namespaced
    // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    /*
      Route shorthand cheatsheet
      */
    /*
      GET shorthands
       // Collections
      this.get('/contacts');
      this.get('/contacts', 'users');
      this.get('/contacts', ['contacts', 'addresses']);
       // Single objects
      this.get('/contacts/:id');
      this.get('/contacts/:id', 'user');
      this.get('/contacts/:id', ['contact', 'addresses']);
      */

    /*
      POST shorthands
       this.post('/contacts');
      this.post('/contacts', 'user'); // specify the type of resource to be created
      */

    /*
      PUT shorthands
       this.put('/contacts/:id');
      this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
      */

    /*
      DELETE shorthands
       this.del('/contacts/:id');
      this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted
       // Single object + related resources. Make sure parent resource is first.
      this.del('/contacts/:id', ['contact', 'addresses']);
      */

    /*
      Function fallback. Manipulate data in the db via
         - db.{collection}
        - db.{collection}.find(id)
        - db.{collection}.where(query)
        - db.{collection}.update(target, attrs)
        - db.{collection}.remove(target)
       // Example: return a single object with related models
      this.get('/contacts/:id', function(db, request) {
        var contactId = +request.params.id;
         return {
          contact: db.contacts.find(contactId),
          addresses: db.addresses.where({contact_id: contactId})
        };
      });
    */
  }

  /*
  You can optionally export a config that is only loaded during tests
  export function testConfig() {

  }
  */

});
define('todos/mirage/factories/contact', ['exports', 'ember-cli-mirage'], function (exports, Mirage) {

  'use strict';

  /*
    This is an example factory definition.

    Create more files in this directory to define additional factories.
  */
  exports['default'] = Mirage['default'].Factory.extend({
    // name: 'Pete',                         // strings
    // age: 20,                              // numbers
    // tall: true,                           // booleans

    // email: function(i) {                  // and functions
    //   return 'person' + i + '@test.com';
    // },

    // firstName: faker.name.firstName,       // using faker
    // lastName: faker.name.firstName,
    // zipCode: faker.address.zipCode
  });

});
define('todos/mirage/factories/todo', ['exports', 'ember-cli-mirage'], function (exports, ember_cli_mirage) {

	'use strict';

	exports['default'] = ember_cli_mirage['default'].Factory.extend({});

});
define('todos/mirage/scenarios/default', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () /* server */{

    // Seed your development database using your factories. This
    // data will not be loaded in your tests.

    // server.createList('contact', 10);
  }

});
define('todos/models/todo', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	var Todo = DS['default'].Model.extend({
		title: DS['default'].attr('string'),
		isCompleted: DS['default'].attr('boolean')

	});
	Todo.reopenClass({
		FIXTURES: [{
			id: 1,
			title: 'Learn Ember.js',
			isCompleted: true
		}, {
			id: 2,
			title: '...',
			isCompleted: false
		}, {
			id: 3,
			title: 'Profit!',
			isCompleted: false
		}]
	});
	exports['default'] = Todo;

});
define('todos/router', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('active');
    this.route('completed');
  });

  exports['default'] = Router;

});
define('todos/routes/active', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.all('todo').filterBy('isCompleted', false);
		}
	});

});
define('todos/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return Ember['default'].RSVP.hash({
				all: this.store.findAll('todo'),
				completed: this.store.all('todo').filterBy('isCompleted', true),
				active: this.store.all('todo').filterBy('isCompleted', false)
			});
		}
	});

});
define('todos/routes/completed', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.all('todo').filterBy('isCompleted', true);
		}
	});

});
define('todos/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('todo');
		}
	});

});
define('todos/templates/active', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "todos/templates/active.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","todo-li",[],["todo",["subexpr","@mut",[["get","todo",["loc",[null,[4,18],[4,22]]]]],[],[]]],["loc",[null,[4,3],[4,24]]]]
        ],
        locals: ["todo"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "todos/templates/active.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"id","main");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"id","todo-list");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[1] = dom.createMorphAt(element0,3,3);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[3,10],[3,15]]]]],[],0,null,["loc",[null,[3,2],[5,11]]]],
        ["inline","toggle-all",[],["todos",["subexpr","@mut",[["get","model",["loc",[null,[8,20],[8,25]]]]],[],[]]],["loc",[null,[8,1],[8,27]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('todos/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 46,
            "column": 0
          }
        },
        "moduleName": "todos/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("body");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2,"id","todoapp");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("header");
        dom.setAttribute(el3,"id","header");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("todos");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("footer");
        dom.setAttribute(el3,"id","footer");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"id","todo-count");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("strong");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" left\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"id","filters");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"id","clear-completed");
        var el5 = dom.createTextNode("\n				Clear completed (");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(")\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("footer");
        dom.setAttribute(el2,"id","info");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Double-click to edit a todo");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [6]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var element4 = dom.childAt(element1, [5]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),3,3);
        morphs[1] = dom.createMorphAt(element0,3,3);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        morphs[3] = dom.createMorphAt(element2,3,3);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [1]),1,1);
        morphs[5] = dom.createMorphAt(dom.childAt(element3, [3]),1,1);
        morphs[6] = dom.createMorphAt(dom.childAt(element3, [5]),1,1);
        morphs[7] = dom.createElementMorph(element4);
        morphs[8] = dom.createMorphAt(element4,1,1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["id","new-todo","placeholder","What needs to be done?","type","text","value",["subexpr","@mut",[["get","newTitle",["loc",[null,[5,80],[5,88]]]]],[],[]],"enter","createTodo"],["loc",[null,[5,3],[5,109]]]],
        ["content","outlet",["loc",[null,[8,2],[8,12]]]],
        ["content","remaining",["loc",[null,[22,12],[22,25]]]],
        ["content","inflection",["loc",[null,[22,35],[22,49]]]],
        ["inline","link-to",["All","index"],[],["loc",[null,[26,5],[26,30]]]],
        ["inline","link-to",["Active","active"],[],["loc",[null,[29,5],[29,34]]]],
        ["inline","link-to",["Completed","completed"],[],["loc",[null,[32,5],[32,40]]]],
        ["element","action",["clear"],[],["loc",[null,[36,32],[36,50]]]],
        ["content","completed",["loc",[null,[37,21],[37,34]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('todos/templates/completed', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "todos/templates/completed.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","todo-li",[],["todo",["subexpr","@mut",[["get","todo",["loc",[null,[4,18],[4,22]]]]],[],[]]],["loc",[null,[4,3],[4,24]]]]
        ],
        locals: ["todo"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "todos/templates/completed.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"id","main");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"id","todo-list");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[1] = dom.createMorphAt(element0,3,3);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[3,10],[3,15]]]]],[],0,null,["loc",[null,[3,2],[5,11]]]],
        ["inline","toggle-all",[],["todos",["subexpr","@mut",[["get","model",["loc",[null,[8,20],[8,25]]]]],[],[]]],["loc",[null,[8,1],[8,27]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('todos/templates/components/todo-li', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 1
            },
            "end": {
              "line": 5,
              "column": 1
            }
          },
          "moduleName": "todos/templates/components/todo-li.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","input",[],["class","edit","type","text","value",["subexpr","@mut",[["get","editedTitle",["loc",[null,[4,41],[4,52]]]]],[],[]],"enter","commitEdit","focus-out","commitEdit","autofocus","true"],["loc",[null,[4,2],[4,113]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 1
            },
            "end": {
              "line": 7,
              "column": 1
            }
          },
          "moduleName": "todos/templates/components/todo-li.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0,0,0);
          return morphs;
        },
        statements: [
          ["element","action",["editTodo",["get","todo",["loc",[null,[6,29],[6,33]]]]],["on","doubleClick"],["loc",[null,[6,9],[6,52]]]],
          ["content","todo.title",["loc",[null,[6,53],[6,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "todos/templates/components/todo-li.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("li");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","destroy");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [5]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element1, 'class');
        morphs[1] = dom.createMorphAt(element1,1,1);
        morphs[2] = dom.createMorphAt(element1,3,3);
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",[["subexpr","if",[["get","todo.isCompleted",[]],"completed",""],[],[]]," ",["subexpr","if",[["get","isEditing",[]],"editing",""],[],[]]]]],
        ["inline","input",[],["type","checkbox","checked",["subexpr","@mut",[["get","todo.isCompleted",["loc",[null,[2,33],[2,49]]]]],[],[]],"class","toggle"],["loc",[null,[2,1],[2,66]]]],
        ["block","if",[["get","isEditing",["loc",[null,[3,7],[3,16]]]]],[],0,1,["loc",[null,[3,1],[7,8]]]],
        ["element","action",["delete",["get","todo",["loc",[null,[8,43],[8,47]]]]],[],["loc",[null,[8,25],[8,49]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('todos/templates/components/toggle-all', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 62
          }
        },
        "moduleName": "todos/templates/components/toggle-all.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","checkbox","id","toggle-all","checked",["subexpr","@mut",[["get","allCompleted",["loc",[null,[1,48],[1,60]]]]],[],[]]],["loc",[null,[1,0],[1,62]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('todos/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "todos/templates/index.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","todo-li",[],["todo",["subexpr","@mut",[["get","todo",["loc",[null,[4,18],[4,22]]]]],[],[]]],["loc",[null,[4,3],[4,24]]]]
        ],
        locals: ["todo"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "todos/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"id","main");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"id","todo-list");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        morphs[1] = dom.createMorphAt(element0,3,3);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[3,10],[3,15]]]]],[],0,null,["loc",[null,[3,2],[5,11]]]],
        ["inline","toggle-all",[],["todos",["subexpr","@mut",[["get","model",["loc",[null,[8,20],[8,25]]]]],[],[]]],["loc",[null,[8,1],[8,27]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('todos/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('todos/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('todos/tests/components/todo-li.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/todo-li.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/todo-li.js should pass jshint.'); 
  });

});
define('todos/tests/components/toggle-all.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/toggle-all.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/toggle-all.js should pass jshint.'); 
  });

});
define('todos/tests/controllers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('todos/tests/helpers/resolver', ['exports', 'ember/resolver', 'todos/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('todos/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('todos/tests/helpers/start-app', ['exports', 'ember', 'todos/app', 'todos/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('todos/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('todos/tests/integration/components/new-todo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('new-todo', 'Integration | Component | new todo', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 12
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'new-todo', ['loc', [null, [1, 0], [1, 12]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'new-todo', [], [], 0, null, ['loc', [null, [2, 4], [4, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('todos/tests/integration/components/new-todo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/new-todo-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/new-todo-test.js should pass jshint.'); 
  });

});
define('todos/tests/integration/components/show-todo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('show-todo', 'Integration | Component | show todo', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'show-todo', ['loc', [null, [1, 0], [1, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'show-todo', [], [], 0, null, ['loc', [null, [2, 4], [4, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('todos/tests/integration/components/show-todo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/show-todo-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/show-todo-test.js should pass jshint.'); 
  });

});
define('todos/tests/integration/components/todo-li-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('todo-li', 'Integration | Component | todo li', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 11
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'todo-li', ['loc', [null, [1, 0], [1, 11]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'todo-li', [], [], 0, null, ['loc', [null, [2, 4], [4, 16]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('todos/tests/integration/components/todo-li-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/todo-li-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/todo-li-test.js should pass jshint.'); 
  });

});
define('todos/tests/integration/components/todos-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('todos-component', 'Integration | Component | todos component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'todos-component', ['loc', [null, [1, 0], [1, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'todos-component', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('todos/tests/integration/components/todos-component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/todos-component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/todos-component-test.js should pass jshint.'); 
  });

});
define('todos/tests/integration/components/toggle-all-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('toggle-all', 'Integration | Component | toggle all', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'toggle-all', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'toggle-all', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('todos/tests/integration/components/toggle-all-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/toggle-all-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/toggle-all-test.js should pass jshint.'); 
  });

});
define('todos/tests/mirage/config.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mirage');
  QUnit.test('mirage/config.js should pass jshint', function(assert) { 
    assert.ok(true, 'mirage/config.js should pass jshint.'); 
  });

});
define('todos/tests/mirage/factories/contact.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mirage/factories');
  QUnit.test('mirage/factories/contact.js should pass jshint', function(assert) { 
    assert.ok(true, 'mirage/factories/contact.js should pass jshint.'); 
  });

});
define('todos/tests/mirage/factories/todo.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mirage/factories');
  QUnit.test('mirage/factories/todo.js should pass jshint', function(assert) { 
    assert.ok(false, 'mirage/factories/todo.js should pass jshint.\nmirage/factories/todo.js: line 1, col 17, \'faker\' is defined but never used.\n\n1 error'); 
  });

});
define('todos/tests/mirage/scenarios/default.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mirage/scenarios');
  QUnit.test('mirage/scenarios/default.js should pass jshint', function(assert) { 
    assert.ok(true, 'mirage/scenarios/default.js should pass jshint.'); 
  });

});
define('todos/tests/models/todo.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/todo.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/todo.js should pass jshint.'); 
  });

});
define('todos/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('todos/tests/routes/active.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/active.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/active.js should pass jshint.'); 
  });

});
define('todos/tests/routes/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('todos/tests/routes/completed.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/completed.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/completed.js should pass jshint.'); 
  });

});
define('todos/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('todos/tests/test-helper', ['todos/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('todos/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('todos/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('todos/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/application-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/controllers/index-controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index-controller', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('todos/tests/unit/controllers/index-controller-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/index-controller-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/index-controller-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/controllers/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('todos/tests/unit/controllers/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/index-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/index-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/controllers/todo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:todo', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('todos/tests/unit/controllers/todo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/todo-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/todo-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/controllers/todos-controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:todos-controller', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('todos/tests/unit/controllers/todos-controller-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/todos-controller-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/todos-controller-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/models/todo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('todo', 'Unit | Model | todo', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('todos/tests/unit/models/todo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/todo-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/todo-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/routes/active-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:active', 'Unit | Route | active', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('todos/tests/unit/routes/active-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/active-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/active-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/routes/all-todos-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:all-todos', 'Unit | Route | all todos', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('todos/tests/unit/routes/all-todos-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/all-todos-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/all-todos-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('todos/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/application-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/routes/completed-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:completed', 'Unit | Route | completed', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('todos/tests/unit/routes/completed-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/completed-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/completed-test.js should pass jshint.'); 
  });

});
define('todos/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('todos/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('todos/config/environment', ['ember'], function(Ember) {
  var prefix = 'todos';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("todos/tests/test-helper");
} else {
  require("todos/app")["default"].create({"name":"todos","version":"0.0.0+5ce0d897"});
}

/* jshint ignore:end */
//# sourceMappingURL=todos.map