var helpers = {
    template: function (name, locals) {
        return require(name)(locals);
    },

    production: function () {
        return location.hostname.match(/(.com)|(.pl)$/) ? true : false;
    },

    api: function (path) {
        return 'api/v1/' + path;
    }
};

module.exports = helpers;