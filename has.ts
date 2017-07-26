
import module = require("module");
// module:
//		dojo/has
// summary:
//		Defines the has.js API and several feature tests used by dojo.
// description:
//		This module defines the has API as described by the project has.js with the following additional features:
//
//		- the has test cache is exposed at has.cache.
//		- the method has.add includes a forth parameter that controls whether or not existing tests are replaced
//		- the loader's has cache may be optionally copied into this module's has cahce.
//
//		This module adopted from https://github.com/phiggins42/has.js; thanks has.js team!

// try to pull the has implementation from the loader; both the dojo loader and bdLoad provide one
// if using a foreign loader, then the has cache may be initialized via the config object for this module
// WARNING: if a foreign loader defines require.has to be something other than the has.js API, then this implementation fail

declare const load: any;
declare const process: any;
declare const Packages: any;

interface HasCache {
	[feature: string]: any;
}

interface HasTestFunction {
	/* TypeScript has no way of referring to the global scope see Microsoft/TypeScript#983 */
	(global?: any, doc?: Document, element?: Element): any;
}

interface Has {
	/**
	 * Return the current value of the named feature.
	 * @param {string | number} name The name (if a string) or identifier (if an integer) of the feature to test.
	 */
	(name: string | number): any;
	(name: 'dojo-dom-ready-api'): 1;
	(name: 'dojo-sniff'): 1;
	(name: 'dom'): boolean;
	(name: 'host-browser'): boolean;
	(name: 'host-node'): any;
	(name: 'host-rhino'): boolean;
	// if host-browser is true
	(name: 'MSPointer'): void | boolean;
	(name: 'device-width'): void | number;
	(name: 'dom-addeventlistener'): void | boolean;
	(name: 'dom-attributes-explicit'): void | boolean;
	(name: 'dom-attributes-specified-flag'): void | boolean;
	(name: 'pointer-events'): void | boolean;
	(name: 'touch'): void | boolean;
	(name: 'touch-events'): void | boolean;
	// dojo/_base/browser
	(name: 'config-selectorEngine'): string;

	cache: HasCache;

	/**
	 * Register a new feature test for some named feature.
	 */
	add(name: string | number, test: HasTestFunction, now?: boolean | 0 | 1, force?: boolean): any;
	add<T extends (object | string | number | boolean | null | void)>(name: string | number, test: T, now?: boolean, force?: boolean): any;

	/**
	 * Deletes the contents of the element passed to test functions.
	 */
	clearElement<T extends HTMLElement>(element: T): T;

	/**
	 * Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
	 */
	normalize(id: string, toAbsMid: Function): string; /* TODO: Align with loader api */

	/**
	 * Conditional loading of AMD modules based on a has feature test value.
	 */
	load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
}

var has: Has = require.has || function() {};
if (!has("dojo-has-api")) {
    var
        isBrowser =
        // the most fundamental decision: are we in the browser?
        typeof window != "undefined" &&
        typeof location != "undefined" &&
        typeof document != "undefined" &&
        window.location == location && window.document == document,

        // has API variables
        global = (function() {
            return this;
        })(),
        doc = isBrowser && document,
        element = doc && doc.createElement("DiV"),
        cache = (module.config && module.config()) || {};

    has = function(name) {
        // summary:
        //		Return the current value of the named feature.
        //
        // name: String|Integer
        //		The name (if a string) or identifier (if an integer) of the feature to test.
        //
        // description:
        //		Returns the value of the feature named by name. The feature must have been
        //		previously added to the cache by has.add.

        return typeof cache[name] == "function" ? (cache[name] = cache[name](global, doc, element)) : cache[name]; // Boolean
    } as Has;

    has.cache = cache;

    has.add = function(name, test, now, force) {
        // summary:
        //	 	Register a new feature test for some named feature.
        // name: String|Integer
        //	 	The name (if a string) or identifier (if an integer) of the feature to test.
        // test: Function
        //		 A test function to register. If a function, queued for testing until actually
        //		 needed. The test function should return a boolean indicating
        //	 	the presence of a feature or bug.
        // now: Boolean?
        //		 Optional. Omit if `test` is not a function. Provides a way to immediately
        //		 run the test and cache the result.
        // force: Boolean?
        //	 	Optional. If the test already exists and force is truthy, then the existing
        //	 	test will be replaced; otherwise, add does not replace an existing test (that
        //	 	is, by default, the first test advice wins).
        // example:
        //		A redundant test, testFn with immediate execution:
        //	|	has.add("javascript", function(){ return true; }, true);
        //
        // example:
        //		Again with the redundantness. You can do this in your tests, but we should
        //		not be doing this in any internal has.js tests
        //	|	has.add("javascript", true);
        //
        // example:
        //		Three things are passed to the testFunction. `global`, `document`, and a generic element
        //		from which to work your test should the need arise.
        //	|	has.add("bug-byid", function(g, d, el){
        //	|		// g	== global, typically window, yadda yadda
        //	|		// d	== document object
        //	|		// el == the generic element. a `has` element.
        //	|		return false; // fake test, byid-when-form-has-name-matching-an-id is slightly longer
        //	|	});

        (typeof cache[name] == "undefined" || force) && (cache[name] = test);
        return now && has(name);
    };

    // since we're operating under a loader that doesn't provide a has API, we must explicitly initialize
    // has as it would have otherwise been initialized by the dojo loader; use has.add to the builder
    // can optimize these away iff desired
    has.add("host-browser", isBrowser);
    has.add("host-node", (typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
    has.add("host-rhino", (typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
    has.add("dom", isBrowser);
    has.add("dojo-dom-ready-api", 1);
    has.add("dojo-sniff", 1);
}

if (has("host-browser")) {
    // Common application level tests
    has.add("dom-addeventlistener", !!document.addEventListener);

    // Do the device and browser have touch capability?
    has.add("touch", "ontouchstart" in document || ("onpointerdown" in document && navigator.maxTouchPoints > 0) || window.navigator.msMaxTouchPoints);

    // Touch events support
    has.add("touch-events", "ontouchstart" in document);

    // Test if pointer events are supported and enabled, with either standard names ("pointerdown" etc.) or
    // IE specific names ("MSPointerDown" etc.).  Tests are designed to work on embedded C# WebBrowser Controls
    // in addition to IE, Edge, and future versions of Firefox and Chrome.
    // Note that on IE11, has("pointer-events") and has("MSPointer") are both true.
    has.add("pointer-events", "pointerEnabled" in window.navigator ?
        window.navigator.pointerEnabled : "PointerEvent" in window);
    has.add("MSPointer", window.navigator.msPointerEnabled);

    // I don't know if any of these tests are really correct, just a rough guess
    has.add("device-width", screen.availWidth || innerWidth);

    // Tests for DOMNode.attributes[] behavior:
    //	 - dom-attributes-explicit - attributes[] only lists explicitly user specified attributes
    //	 - dom-attributes-specified-flag (IE8) - need to check attr.specified flag to skip attributes user didn't specify
    //	 - Otherwise, in IE6-7. attributes[] will list hundreds of values, so need to do outerHTML to get attrs instead.
    var form = document.createElement("form");
    has.add("dom-attributes-explicit", form.attributes.length == 0); // W3C
    has.add("dom-attributes-specified-flag", form.attributes.length > 0 && form.attributes.length < 40); // IE8
}

has.clearElement = function(element) {
    // summary:
    //	 Deletes the contents of the element passed to test functions.
    element.innerHTML = "";
    return element;
};

has.normalize = function(id: string, toAbsMid) {
    // summary:
    //	 Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
    //
    // toAbsMid: Function
    //	 Resolves a relative module id into an absolute module id
    var
        tokens = id.match(/[\?:]|[^:\?]*/g),
        i = 0,
        get = function(skip?) {
            var term = tokens[i++];
            if (term == ":") {
                // empty string module name, resolves to 0
                return 0;
            } else {
                // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
                if (tokens[i++] == "?") {
                    if (!skip && has(term)) {
                        // matched the feature, get the first value from the options
                        return get();
                    } else {
                        // did not match, get the second value, passing over the first
                        get(true);
                        return get(skip);
                    }
                }
                // a module
                return term || 0;
            }
        };
    id = get();
    return id && toAbsMid(id);
};

has.load = function(id, parentRequire, loaded) {
    // summary:
    //		Conditional loading of AMD modules based on a has feature test value.
    // id: String
    //		Gives the resolved module id to load.
    // parentRequire: Function
    //		The loader require function with respect to the module that contained the plugin resource in it's
    //		dependency list.
    // loaded: Function
    //	 Callback to loader that consumes result of plugin demand.

    if (id) {
        parentRequire([id], loaded);
    } else {
        loaded();
    }
};

export = has as Has;
