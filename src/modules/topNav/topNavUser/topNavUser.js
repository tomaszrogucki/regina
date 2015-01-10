var $ = require('twbs'); // Bootstrap
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var session = require('session');


var TopNavUserView = Base.View.extend({
    template: 'topNavUserTemplate',
    id: 'topNavUser',
    tagName: 'li',
    className: 'dropdown user hidden',

    events: {
        'click a.logout': '_logOut'
    },

    initialize: function () {
        this.$el.attr('role', 'presentation');

        this.model = session.user;
        this.listenTo(session, 'loggedIn', this._onLoggedIn);
        this.listenTo(session, 'loggedOut', this._onLoggedOut);
    },

    _onLoggedIn: function () {
        this.render();
        this.$el.removeClass('hidden');
    },

    _onLoggedOut: function () {
        this.$el.addClass('hidden');
    },

    _logOut: function (event) {
        event.preventDefault();
        session.logout();
    }
});


var TopNavUser = {
    View: TopNavUserView
};

module.exports = TopNavUser;