import dojoDeclare = require("../_base/declare");
import Source = require("./Source");
export = dojoDeclare("dojo.dnd.AutoSource", Source, {
    // summary:
    //		a source that syncs its DnD nodes by default

    constructor: function( /*===== node, params =====*/ ) {
        // summary:
        //		constructor of the AutoSource --- see the Source constructor for details
        this.autoSync = true;
    }
});
