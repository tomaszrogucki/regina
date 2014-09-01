var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');
var NewsWidget = require('newsWidget');
var CalendarWidget = require('calendarWidget');
var CarouselWidget = require('carouselWidget');


var MainView = Base.View.extend({
    template: 'mainTemplate',
    id: 'main',

    initialize: function () {
        this.newsWidgetView = new NewsWidget.View();
        this.calendarWidgetView = new CalendarWidget.View();
        this.carouselWidgetView = new CarouselWidget.View();
    },

    render: function () {
        Base.View.prototype.render.apply(this, arguments);

        this.newsWidgetView.$el = this.$('#newsWidget');
        this.newsWidgetView.render();

        this.calendarWidgetView.$el = this.$('#calendarWidget');
        this.calendarWidgetView.render();

        this.carouselWidgetView.$el = this.$('#carouselWidget');
        this.carouselWidgetView.render();

        return this;
    }
});


var Main = {
    View: MainView
};

module.exports = Main;