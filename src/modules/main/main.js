var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');
var Router = require('router');
var TopNav = require('topNav');

var MainView = Base.View.extend({
    template: 'mainTemplate',
    el: '#mainContainer'
});


var Main = {
    View: MainView
};

module.exports = Main;



$(document).ready(function () {
    var router = new Router();
    Backbone.history.start({pushState: true});

    var mainView = new Main.View();
    mainView.render();

    var topNavView = new TopNav.View({el: mainView.$('#topNav')});
    topNavView.render();
});