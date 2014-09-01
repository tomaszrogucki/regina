var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Skeleton = require('skeleton');

var Router = Backbone.Router.extend({
    routes: {
        'glowna': 'main',
        'omnie': 'aboutMe',
        'uslugi': 'services',
        'kontakt': 'contact',
        '*path': 'defaultRoute'
    },

    initialize: function () {
        this.skeletonView = new Skeleton.View();
        this.listenTo(this.skeletonView, 'navigateTo', this.navigateTo)
    },

    main: function () {
        this.skeletonView.renderModule('main');
    },

    aboutMe: function () {
        this.skeletonView.renderModule('aboutMe');
    },

    services: function () {
        this.skeletonView.renderModule('services');
    },

    contact: function () {
        this.skeletonView.renderModule('contact');
    },

    defaultRoute: function(path) {
        this.skeletonView.render();
    },

    navigateTo: function (fragment) {
        this.navigate(fragment, {trigger: true});
    }
});

module.exports = Router;



$(document).ready(function () {
    var router = new Router();
    Backbone.history.start({pushState: true});
});