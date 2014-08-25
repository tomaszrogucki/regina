var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var TopNavView = Base.View.extend({
    template: 'topNavTemplate'
});

var TopNav = {
    View: TopNavView
};

module.exports = TopNav;