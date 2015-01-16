var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var helpers = require('helpers');

var PostsNavView = Base.View.extend({
    template: 'postsNavTemplate'
});

var PostsNavModel = Base.Model.extend({
});


var PostsNav = {
    View: PostsNavView,
    Model: PostsNavModel
};

module.exports = PostsNav;