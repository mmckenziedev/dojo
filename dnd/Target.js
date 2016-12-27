import declare from "../_base/declare";
import domClass from "../dom-class";
import Source from "./Source";
export default declare("dojo.dnd.Target", Source, {
    // summary:
    //		a Target object, which can be used as a DnD target

    constructor: function( /*===== node, params =====*/ ) {
        // summary:
        //		a constructor of the Target --- see the `dojo/dnd/Source` constructor for details
        this.isSource = false;
        domClass.remove(this.node, "dojoDndSource");
    }
});
