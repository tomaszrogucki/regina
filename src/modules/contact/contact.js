var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var ContactView = Base.View.extend({
    template: 'contactTemplate',
    id: 'contact'
});


var Contact = {
    View: ContactView
};

module.exports = Contact;