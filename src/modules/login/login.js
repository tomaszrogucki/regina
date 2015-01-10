var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var session = require('session');

var LoginView = Base.View.extend({
    template: 'loginTemplate',
    id: 'login',

    events: {
        'click .submit': 'authenticate'
    },

    initialize: function () {
        this.listenTo(session, 'loginFailed', this._onLoginFailed);
        this.listenTo(session, 'loggedIn', this._clearError);
    },

    authenticate: function () {
        var credentials = {
            email: this.$('.email').val(),
            password: this.$('.password').val(),
            rememberMe: this.$('.rememberMe').is(':checked')
        };

        session.authenticate(credentials);
    },

    _onLoginFailed: function () {
        this._markError();
    },

    _markError: function () {
        this.$('.emailGroup, .passwordGroup, .errorGroup').addClass('has-error');
    },

    _clearError: function () {
        this.$('.emailGroup, .passwordGroup, .errorGroup').removeClass('has-error');
        this.$('.email, .password').val('');
    }
});


var Login = {
    View: LoginView
};

module.exports = Login;