
import config = require("./_base/config");
import domClass = require("./dom-class");
import domStyle = require("./dom-style");
import has = require("./has");
import domReady = require("./domReady");
import win = require("./_base/window");

// module:
//		dojo/hccss

/*=====
return function(){
	// summary:
	//		Test if computer is in high contrast mode (i.e. if browser is not displaying background images).
	//		Defines `has("highcontrast")` and sets `dj_a11y` CSS class on `<body>` if machine is in high contrast mode.
	//		Returns `has()` method;
};
=====*/

// Has() test for when background images aren't displayed.  Don't call has("highcontrast") before dojo/domReady!.
has.add("highcontrast", function() {
    // note: if multiple documents, doesn't matter which one we use
    var div = win.doc.createElement("div");
    try {
        div.style.cssText = "border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;" +
            "background-image: url(\"" + (config.blankGif || require.toUrl("./resources/blank.gif")) + "\");";
        win.body().appendChild(div);

        var cs = domStyle.getComputedStyle(div),
            bkImg = cs.backgroundImage;
        return cs.borderTopColor == cs.borderRightColor ||
            (bkImg && (bkImg == "none" || bkImg == "url(invalid-url:)"));
    } catch (e) {
        console.warn("hccss: exception detecting high-contrast mode, document is likely hidden: " + e.toString());
        return false;
    } finally {
        if (has("ie") <= 8) {
            div.outerHTML = ""; // prevent mixed-content warning, see http://support.microsoft.com/kb/925014
        } else {
            win.body().removeChild(div);
        }
    }
});

domReady(function() {
    if (has("highcontrast")) {
        domClass.add(win.body(), "dj_a11y");
    }
});

export = has;
