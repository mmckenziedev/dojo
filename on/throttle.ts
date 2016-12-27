import throttle from '../throttle';
import on from '../on';
// summary:
//		This module provides an event throttler for dojo/on
// module:
//		dojo/on/throttle

export = function (selector: string, delay: number) {
    // summary:
    //		event parser for custom events
    // selector: String
    //		The selector to check against
    // delay: Interger
    //		The amount of ms before testing the selector

    return function (node, listenerFnc: Function) {
        return on(node, selector, throttle(listenerFnc, delay));
    };
};
