var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var TopNavView = Base.View.extend({
    template: 'topNavTemplate',

    render: function () {
        Base.View.prototype.render.apply(this, arguments);
        this.$('a').on('click', function (event) {
            event.preventDefault();
            this.trigger('itemClicked', $(event.currentTarget).attr('href'));
        }.bind(this));
    }
});


var TopNav = {
    View: TopNavView
};

module.exports = TopNav;