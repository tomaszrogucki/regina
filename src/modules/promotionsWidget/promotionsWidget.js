var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var PromotionsWidgetView = Base.View.extend({
    template: 'promotionsWidgetTemplate'
});


var PromotionsWidget = {
    View: PromotionsWidgetView
};

module.exports = PromotionsWidget;