var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');
var NewsWidget = require('newsWidget');
var CalendarWidget = require('calendarWidget');


var MainView = Base.View.extend({
    template: 'mainTemplate',

    initialize: function () {
        this.newsWidgetView = new NewsWidget.View();
        this.calendarWidgetView = new CalendarWidget.View();
    },

    render: function () {
        Base.View.prototype.render.apply(this, arguments);

        this.newsWidgetView.$el = this.$('#newsWidget');
        this.newsWidgetView.render();

        this.calendarWidgetView.$el = this.$('#calendarWidget');
        this.calendarWidgetView.render();

        return this;
    }
});


var Main = {
    View: MainView
};

module.exports = Main;