var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var NewsWidgetView = Base.View.extend({
    template: 'newsWidgetTemplate'
});


var NewsWidget = {
    View: NewsWidgetView
};

module.exports = NewsWidget;