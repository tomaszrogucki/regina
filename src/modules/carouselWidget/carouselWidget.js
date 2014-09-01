var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var CarouselWidgetView = Base.View.extend({
    template: 'carouselWidgetTemplate'
});


var CarouselWidgetView = {
    View: CarouselWidgetView
};

module.exports = CarouselWidgetView;