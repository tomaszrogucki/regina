var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var Skeleton = require('skeleton');
var analytics = require('analytics');
var session = require('session');

var Router = Backbone.Router.extend({
    routes: {
        'glowna': 'main',
        'omnie': 'aboutMe',
        'uslugi': 'services',
        'kontakt': 'contact',
        'wiadomosci': 'posts',
        'login': 'login',
        '*path': 'main'
    },

    initialize: function () {
        analytics.init();
        session.init();

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

    posts: function () {
        this.skeletonView.renderModule('posts');
    },

    login: function () {
        this.skeletonView.renderModule('login');
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