import declare from "../_base/declare";
import Source from "./Source";
export default declare("dojo.dnd.AutoSource", Source, {
    // summary:
    //		a source that syncs its DnD nodes by default

    constructor: function( /*===== node, params =====*/ ) {
        // summary:
        //		constructor of the AutoSource --- see the Source constructor for details
        this.autoSync = true;
    }
});
