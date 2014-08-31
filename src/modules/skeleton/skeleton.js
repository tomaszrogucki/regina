var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');
var Router = require('router');
var TopNav = require('topNav');
var Main = require('main');


var SkeletonView = Base.View.extend({
    template: 'skeletonTemplate',
    el: '#skeletonContainer',

    initialize: function () {
        this.topNavView = new TopNav.View();
        this.mainView = new Main.View();
    },

    render: function () {
        Base.View.prototype.render.apply(this, arguments);

        this.topNavView.$el = this.$('#topNav');
        this.topNavView.render();

        this.mainView.$el = this.$('#content');
        this.mainView.render();

        return this;
    }
});


var Skeleton = {
    View: SkeletonView
};

module.exports = Skeleton;



$(document).ready(function () {
    var router = new Router();
    Backbone.history.start({pushState: true});

    var skeletonView = new Skeleton.View();
    skeletonView.render();
});