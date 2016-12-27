import loader from "./_base/loader";
export default {
    dynamic: 0,
    normalize: function(id) {
        return id;
    },
    load: loader.loadInit
};
