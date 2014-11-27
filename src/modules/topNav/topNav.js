var $ = require('twbs'); // Bootstrap
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

        var affixHeight = this.$('.navbar').height();
        //this.$('.topNavAffix').height(120);
        this.$('.topNavAffix').height(affixHeight);

        this.$el.on('affixed.bs.affix', function () {
            this.$('.topNavAffix').show();
        }.bind(this));

        this.$el.on('affixed-top.bs.affix', function () {
            this.$('.topNavAffix').hide();
        }.bind(this));

        // TODO unbind events
    }
});


var TopNav = {
    View: TopNavView
};

module.exports = TopNav;