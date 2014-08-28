var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var MainView = Base.View.extend({
    template: 'mainTemplate'
});


var Main = {
    View: MainView
};

module.exports = Main;