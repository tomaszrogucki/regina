var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var AboutMeView = Base.View.extend({
    template: 'aboutMeTemplate',
    id: 'aboutMe'
});


var AboutMe = {
    View: AboutMeView
};

module.exports = AboutMe;