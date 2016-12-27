if(require.has){
	require.has.add("config-selectorEngine", "acme");
}
import dojo from "../ready";
import "./kernel";
import "./connect";
import "./unload";
import "./window";
import "./event";
import "./html";
import "./NodeList";
import "../query";
import "./xhr";
import "./fx";

// module:
//		dojo/_base/browser

/*=====
return {
	// summary:
	//		This module causes the browser-only base modules to be loaded.
};
=====*/

export default dojo;
