var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var ServicesView = Base.View.extend({
    template: 'servicesTemplate',
    id: 'services'
});


var Services = {
    View: ServicesView
};

module.exports = Services;