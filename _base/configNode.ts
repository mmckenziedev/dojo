export const config = function(config){
    // summary:
    //		This module provides bootstrap configuration for running dojo in node.js

    // any command line arguments with the load flag are pushed into deps
    for(var deps = [], args = [], i = 0; i < process.argv.length; i++){
		const arg = (`${process.argv[i]}`).split("=");
		if(arg[0] == "load"){
			deps.push(arg[1]);
		}else if(arg[0] == "mapPackage") {
            const parts = arg[1].split(":");
            const name = parts[0];
            const location=parts[1];
            let isPrexisting = false;

            for (let j = 0; j < config.packages.length; j++) {
				const pkg = config.packages[j];
				if (pkg.name === name) {
					pkg.location = location;
					isPrexisting = true;
					break;
				}
			}

            if (!isPrexisting) {
				config.packages.push({
					name: name,
					location: location
				});
			}
        }else{
			args.push(arg);
		}
	}

    const fs = require("fs");

    // make sure global require exists
    //if (typeof global.require=="undefined"){
    //	global.require= {};
    //}

    // reset the has cache with node-appropriate values;
    const hasCache = {
		"host-node":1,
		"host-browser":0,
		"dom":0,
		"dojo-has-api":1,
		"dojo-xhr-factory":0,
		"dojo-inject-api":1,
		"dojo-timeout-api":0,
		"dojo-trace-api":1,
		"dojo-dom-ready-api":0,
		"dojo-publish-privates":1,
		"dojo-sniff":0,
		"dojo-loader":1,
		"dojo-test-xd":0,
		"dojo-test-sniff":0
	};
    for(var p in hasCache){
		config.hasCache[p] = hasCache[p];
	}

    const vm = require('vm');
    const path = require('path');

    // reset some configuration switches with node-appropriate values
    const nodeConfig = {
		baseUrl: path.dirname(process.argv[1]),
		commandLineArgs:args,
		deps:deps,
		timeout:0,

		// TODO: really get the locale
		locale:"en-us",

		loaderPatch: {
			log(item) {
				// define debug for console messages during dev instead of console.log
				// (node's heavy async makes console.log confusing sometimes)
				const util = require("util");
				util.debug(util.inspect(item));
			},

			eval(__text, __urlHint) {
				return vm.runInThisContext(__text, __urlHint);
			},

			injectUrl(url, callback) {
				try{
					vm.runInThisContext(fs.readFileSync(url, "utf8"), url);
					callback();
				}catch(e){
					this.log(`failed to load resource (${url})`);
					this.log(e);
				}
			},

			getText(url, sync, onLoad) {
				// TODO: implement async and http/https handling
				onLoad(fs.readFileSync(url, "utf8"));
			}
		}
	};
    for(p in nodeConfig){
		config[p] = nodeConfig[p];
	}
};
