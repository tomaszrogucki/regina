var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Skeleton = require('skeleton');
var analytics = require('analytics');

var Router = Backbone.Router.extend({
    routes: {
        'glowna': 'main',
        'omnie': 'aboutMe',
        'uslugi': 'services',
        'kontakt': 'contact',
        'wiadomosci': 'information',
        '*path': 'main'
    },

    initialize: function () {
        analytics.init();

        this.skeletonView = new Skeleton.View();
        this.skeletonView.render();

        this.listenTo(this.skeletonView, 'navigateTo', this.navigateTo);
        this.listenTo(this, 'route', analytics.pageView);
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

    information: function () {
        this.skeletonView.renderModule('information');
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