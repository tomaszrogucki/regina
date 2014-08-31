var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var CalendarWidgetView = Base.View.extend({
    template: 'calendarWidgetTemplate'
});


var CalendarWidget = {
    View: CalendarWidgetView
};

module.exports = CalendarWidget;