var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var helpers = require('helpers');

var UserModel = Base.Model.extend({
    url: helpers.api('me'),

    defaults: {
        id: null,
        email: '',
        name: '',
        surname: ''
    }
});


var User = {
    Model: UserModel
};


module.exports = User;