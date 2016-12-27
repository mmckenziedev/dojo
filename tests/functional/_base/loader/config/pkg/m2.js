import module from "module";
export default {
    getConfig: function() {
        return module.config();
    }
};

