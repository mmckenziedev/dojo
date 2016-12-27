import has = require("../sniff");
import kernel = require("../_base/kernel");
import lang = require("../_base/lang");
import dom = require("../dom");

// module:
//		dojo/dnd/common

var exports = lang.getObject("dojo.dnd", true);
/*=====
// TODO: for 2.0, replace line above with this code.
var exports = {
	// summary:
	//		TODOC
};
=====*/

export const getCopyKeyState = function(evt) {
    return evt[has("mac") ? "metaKey" : "ctrlKey"]
};

export const _uniqueId = 0;
export const getUniqueId = function() {
    // summary:
    //		returns a unique string for use with any DOM element
    var id;
    do {
        id = kernel._scopeName + "Unique" + (++exports._uniqueId);
    } while (dom.byId(id));
    return id;
};

export const _empty = {};

export const isFormElement = function( /*Event*/ e) {
    // summary:
    //		returns true if user clicked on a form element
    var t = e.target;
    if (t.nodeType == 3 /*TEXT_NODE*/ ) {
        t = t.parentNode;
    }
    return " a button textarea input select option ".indexOf(" " + t.tagName.toLowerCase() + " ") >= 0; // Boolean
};

export = exports;
