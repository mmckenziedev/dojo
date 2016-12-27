import kernel = require("./_base/kernel");
import has = require("./has");
// import require = require("require");
import sniff = require("./sniff");
import lang = require("./_base/lang");
import array = require("./_base/array");
import config = require("./_base/config");
import ready = require("./ready");
import "./_base/declare";
import "./_base/connect";
import "./_base/Deferred";
import "./_base/json";
import "./_base/Color";
import "./has!dojo-firebug?./_firebug/firebug";
import "./has!host-browser?./_base/browser";
import "./has!dojo-sync-loader?./_base/loader";


// module:
//		dojo/main
// summary:
//		This is the package main module for the dojo package; it loads dojo base appropriate for the execution environment.

// Load code to fix IE's console
if (config.isDebug) {
	require(["./_firebug/firebug"]);
}

// dojoConfig.require is deprecated; use the loader configuration property deps
has.add("dojo-config-require", 1);
if (has("dojo-config-require")) {
	var deps = config.require;
	if (deps) {
		// config.require may be dot notation
		deps = array.map(lang.isArray(deps) ? deps : [deps], function (item) { return item.replace(/\./g, "/"); });
		if (kernel.isAsync) {
			require(deps);
		} else {
			// this is a bit janky; in 1.6- dojo is defined before these requires are applied; but in 1.7+
			// dojo isn't defined until returning from this module; this is only a problem in sync mode
			// since we're in sync mode, we know we've got our loader with its priority ready queue
			ready(1, function () { require(deps); });
		}
	}
}

export = kernel;
