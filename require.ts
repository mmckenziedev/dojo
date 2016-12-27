import loader = require("./_base/loader");
export = {
    dynamic: 0,
    normalize: function(id) {
        return id;
    },
    load: loader.require
};
