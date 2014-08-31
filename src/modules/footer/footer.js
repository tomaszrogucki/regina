var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var FooterView = Base.View.extend({
    template: 'footerTemplate'
});


var Footer = {
    View: FooterView
};

module.exports = Footer;