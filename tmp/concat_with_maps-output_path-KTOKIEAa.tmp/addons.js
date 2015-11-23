define('ember-cli-app-version/components/app-version', ['exports', 'ember', 'ember-cli-app-version/templates/app-version'], function (exports, Ember, layout) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'span',
    layout: layout['default']
  });

});
define('ember-cli-app-version/initializer-factory', ['exports', 'ember'], function (exports, Ember) {

  'use strict';



  exports['default'] = initializerFactory;
  var classify = Ember['default'].String.classify;

  function initializerFactory(name, version) {
    var registered = false;

    return function () {
      if (!registered && name && version) {
        var appName = classify(name);
        Ember['default'].libraries.register(appName, version);
        registered = true;
      }
    };
  }

});
define('ember-cli-app-version/templates/app-version', ['exports'], function (exports) {

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
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "modules/ember-cli-app-version/templates/app-version.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","version",["loc",[null,[1,0],[1,11]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-cli-app-version', ['ember-cli-app-version/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-content-security-policy', ['ember-cli-content-security-policy/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-data-fixture-adapter/index', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  var get = Ember['default'].get;
  var indexOf = Array.prototype.indexOf && function (array, item) {
    return array.indexOf(item);
  } || Ember['default'].EnumerableUtils.indexOf;

  var map = Array.prototype.map && function (array, cb, binding) {
    return array.map(cb, binding);
  } || Ember['default'].EnumerableUtils.map;

  var counter = 0;

  /**
    `DS.FixtureAdapter` is an adapter that loads records from memory.
    It's primarily used for development and testing. You can also use
    `DS.FixtureAdapter` while working on the API but is not ready to
    integrate yet. It is a fully functioning adapter. All CRUD methods
    are implemented. You can also implement query logic that a remote
    system would do. It's possible to develop your entire application
    with `DS.FixtureAdapter`.

    For information on how to use the `FixtureAdapter` in your
    application please see the [FixtureAdapter
    guide](/guides/models/the-fixture-adapter/).

    @class FixtureAdapter
    @namespace DS
    @extends DS.Adapter
  */
  exports['default'] = DS['default'].Adapter.extend({
    defaultSerializer: '-default',

    // The fixture adapter does not support coalesceFindRequests
    coalesceFindRequests: false,

    /**
      If `simulateRemoteResponse` is `true` the `FixtureAdapter` will
      wait a number of milliseconds before resolving promises with the
      fixture values. The wait time can be configured via the `latency`
      property.
       @property simulateRemoteResponse
      @type {Boolean}
      @default true
    */
    simulateRemoteResponse: true,

    /**
      By default the `FixtureAdapter` will simulate a wait of the
      `latency` milliseconds before resolving promises with the fixture
      values. This behavior can be turned off via the
      `simulateRemoteResponse` property.
       @property latency
      @type {Number}
      @default 50
    */
    latency: 50,

    /**
      Implement this method in order to provide data associated with a type
       @method fixturesForType
      @param {Subclass of DS.Model} typeClass
      @return {Array}
    */
    fixturesForType: function fixturesForType(typeClass) {
      if (typeClass.FIXTURES) {
        var fixtures = typeClass.FIXTURES;
        return map(fixtures, function (fixture) {
          var fixtureIdType = typeof fixture.id;
          if (fixtureIdType !== 'number' && fixtureIdType !== 'string') {
            throw new Error('the id property must be defined as a number or string for fixture ' + fixture);
          }
          fixture.id = fixture.id + '';
          return fixture;
        });
      }
      return null;
    },

    /**
      Implement this method in order to query fixtures data
       @method queryFixtures
      @param {Array} fixture
      @param {Object} query
      @param {Subclass of DS.Model} typeClass
      @return {Promise|Array}
    */
    queryFixtures: function queryFixtures() /*fixtures, query, typeClass*/{
      Ember['default'].assert('Not implemented: You must override the DS.FixtureAdapter::queryFixtures method to support querying the fixture store.');
    },

    /**
      @method updateFixtures
      @param {Subclass of DS.Model} typeClass
      @param {Array} fixture
    */
    updateFixtures: function updateFixtures(typeClass, fixture) {
      if (!typeClass.FIXTURES) {
        typeClass.reopenClass({
          FIXTURES: []
        });
      }

      var fixtures = typeClass.FIXTURES;

      this.deleteLoadedFixture(typeClass, fixture);

      fixtures.push(fixture);
    },

    /**
      Implement this method in order to provide json for CRUD methods
       @method mockJSON
      @param {DS.Store} store
      @param {Subclass of DS.Model} typeClass
      @param {DS.Snapshot} snapshot
    */
    mockJSON: function mockJSON(store, typeClass, snapshot) {
      return store.serializerFor(snapshot.modelName).serialize(snapshot, { includeId: true });
    },

    /**
      @method generateIdForRecord
      @param {DS.Store} store
      @param {DS.Model} record
      @return {String} id
    */
    generateIdForRecord: function generateIdForRecord() /*store*/{
      return 'fixture-' + counter++;
    },

    /**
      @method find
      @param {DS.Store} store
      @param {subclass of DS.Model} typeClass
      @param {String} id
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    find: function find(store, typeClass, id /*, snapshot*/) {
      var fixtures = this.fixturesForType(typeClass);
      var fixture;

      Ember['default'].assert('Unable to find fixtures for model type ' + typeClass.toString() + '. If you\'re defining your fixtures using \'Model.FIXTURES = ...\'\', please change it to \'Model.reopenClass({ FIXTURES: ... })\'.', fixtures);

      if (fixtures) {
        fixture = Ember['default'].A(fixtures).findBy('id', id);
      }

      if (fixture) {
        return this.simulateRemoteCall(function () {
          return fixture;
        });
      }
    },

    /**
      @method findMany
      @param {DS.Store} store
      @param {subclass of DS.Model} typeClass
      @param {Array} ids
      @param {Array} snapshots
      @return {Promise} promise
    */
    findMany: function findMany(store, typeClass, ids /*, snapshots*/) {
      var fixtures = this.fixturesForType(typeClass);

      Ember['default'].assert('Unable to find fixtures for model type ' + typeClass.toString(), fixtures);

      if (fixtures) {
        fixtures = fixtures.filter(function (item) {
          return indexOf(ids, item.id) !== -1;
        });
      }

      if (fixtures) {
        return this.simulateRemoteCall(function () {
          return fixtures;
        });
      }
    },

    /**
      @private
      @method findAll
      @param {DS.Store} store
      @param {subclass of DS.Model} typeClass
      @param {String} sinceToken
      @return {Promise} promise
    */
    findAll: function findAll(store, typeClass) {
      var fixtures = this.fixturesForType(typeClass);

      Ember['default'].assert('Unable to find fixtures for model type ' + typeClass.toString(), fixtures);

      return this.simulateRemoteCall(function () {
        return fixtures;
      });
    },

    /**
      @private
      @method findQuery
      @param {DS.Store} store
      @param {subclass of DS.Model} typeClass
      @param {Object} query
      @param {DS.AdapterPopulatedRecordArray} recordArray
      @return {Promise} promise
    */
    findQuery: function findQuery(store, typeClass, query /*, array*/) {
      var fixtures = this.fixturesForType(typeClass);

      Ember['default'].assert('Unable to find fixtures for model type ' + typeClass.toString(), fixtures);

      fixtures = this.queryFixtures(fixtures, query, typeClass);

      if (fixtures) {
        return this.simulateRemoteCall(function () {
          return fixtures;
        });
      }
    },

    /**
      @method createRecord
      @param {DS.Store} store
      @param {subclass of DS.Model} typeClass
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    createRecord: function createRecord(store, typeClass, snapshot) {
      var fixture = this.mockJSON(store, typeClass, snapshot);

      this.updateFixtures(typeClass, fixture);

      return this.simulateRemoteCall(function () {
        return fixture;
      });
    },

    /**
      @method updateRecord
      @param {DS.Store} store
      @param {subclass of DS.Model} type
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    updateRecord: function updateRecord(store, typeClass, snapshot) {
      var fixture = this.mockJSON(store, typeClass, snapshot);

      this.updateFixtures(typeClass, fixture);

      return this.simulateRemoteCall(function () {
        return fixture;
      });
    },

    /**
      @method deleteRecord
      @param {DS.Store} store
      @param {subclass of DS.Model} typeClass
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    deleteRecord: function deleteRecord(store, typeClass, snapshot) {
      this.deleteLoadedFixture(typeClass, snapshot);

      return this.simulateRemoteCall(function () {
        return null;
      });
    },

    /*
      @method deleteLoadedFixture
      @private
      @param typeClass
      @param snapshot
    */
    deleteLoadedFixture: function deleteLoadedFixture(typeClass, snapshot) {
      var existingFixture = this.findExistingFixture(typeClass, snapshot);

      if (existingFixture) {
        var index = indexOf(typeClass.FIXTURES, existingFixture);
        typeClass.FIXTURES.splice(index, 1);
        return true;
      }
    },

    /*
      @method findExistingFixture
      @private
      @param typeClass
      @param snapshot
    */
    findExistingFixture: function findExistingFixture(typeClass, snapshot) {
      var fixtures = this.fixturesForType(typeClass);
      var id = snapshot.id;

      return this.findFixtureById(fixtures, id);
    },

    /*
      @method findFixtureById
      @private
      @param fixtures
      @param id
    */
    findFixtureById: function findFixtureById(fixtures, id) {
      return Ember['default'].A(fixtures).find(function (r) {
        return '' + get(r, 'id') === '' + id;
      });
    },

    /*
      @method simulateRemoteCall
      @private
      @param callback
      @param context
    */
    simulateRemoteCall: function simulateRemoteCall(callback, context) {
      var adapter = this;

      return new Ember['default'].RSVP.Promise(function (resolve) {
        var value = Ember['default'].copy(callback.call(context), true);
        if (get(adapter, 'simulateRemoteResponse')) {
          // Schedule with setTimeout
          Ember['default'].run.later(null, resolve, value, get(adapter, 'latency'));
        } else {
          // Asynchronous, but at the of the runloop with zero latency
          resolve(value);
        }
      }, 'DS: FixtureAdapter#simulateRemoteCall');
    }
  });

});
define('ember-data-fixture-adapter', ['ember-data-fixture-adapter/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});
//# sourceMappingURL=addons.map