import module = require("module");
export = {
    getConfig: function() {
        return module.config();
    }
};
