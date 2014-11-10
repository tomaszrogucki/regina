var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var InformationView = Base.View.extend({
    template: 'informationTemplate',
    id: 'information'
});


var Information = {
    View: InformationView
};

module.exports = Information;