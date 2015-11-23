export default Ember.HTMLBars.template((function() {
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