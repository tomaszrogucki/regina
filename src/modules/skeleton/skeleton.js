var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');
var Router = require('router');
var TopNav = require('topNav');
var Main = require('main');
var Footer = require('footer');
var AboutMe = require('aboutMe');
var Services = require('services');
var Contact = require('contact');


var SkeletonView = Base.View.extend({
    template: 'skeletonTemplate',
    el: '#skeletonContainer',

    initialize: function () {
        this.topNavView = new TopNav.View();
        this.mainView = new Main.View();
        this.footerView = new Footer.View();

        this.listenTo(this.topNavView, 'itemClicked', this.navigateTo);

        this.modules = {
            aboutMe: AboutMe,
            main: Main,
            services: Services,
            contact: Contact
        }
    },

    render: function () {
        Base.View.prototype.render.apply(this, arguments);

        this.topNavView.$el = this.$('#topNav');
        this.topNavView.render();

        this.mainView.render();
        this.$('#content').append(this.mainView.$el);

        this.footerView.$el = this.$('#footer');
        this.footerView.render();

        return this;
    },

    renderModule: function (module) {
        var NewModule = this.modules[module];
        if (NewModule) {
            this.mainView.remove();
            this.mainView = new NewModule.View();
            this.mainView.render();
            this.$('#content').append(this.mainView.$el);
        }
    },

    navigateTo: function (fragment) {
        this.trigger('navigateTo', fragment);
    }
});


var Skeleton = {
    View: SkeletonView
};

module.exports = Skeleton;