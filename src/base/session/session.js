var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

require('jquery.cookie');

var helpers = require('helpers');
var User = require('user');


var token = '';
var user = new User.Model();

var init = function () {
    var cookieToken = $.cookie('token');
    if(!_.isEmpty(cookieToken)) {
        token = cookieToken;
    }
    _addAuthorizeHeader();
    if (!_.isEmpty(token)) {
        _fetchUser.bind(this)();
    }
};

var authenticate = function (params) {
    params || (params = {});

    var credentials = {
        email: params.email,
        password: params.password
    };

    $.ajax(helpers.api('oauth'), {
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(credentials)
        })
        .fail(function () {
            this.trigger('loginFailed');
        }.bind(this))
        .done(function (data) {
            token = data.token;

            _fetchUser.bind(this)();

            if (params.rememberMe) {
                remember();
            }
        }.bind(this))
};

var _fetchUser = function () {
    user.fetch({
        error: function () {
            this.trigger('loginFailed');
        }.bind(this),
        success: function () {
            this.trigger('loggedIn');
        }.bind(this)
    });
};

var remember = function () {
    $.cookie('token', token, {expires: 30, path: '/' });
};

var logout = function () {
    user.clear().set(user.defaults);
    token = '';
    $.removeCookie('token', { path: '/' });
    this.trigger('loggedOut');
};

var isLoggedIn = function () {
    return !_.isEmpty(token) && !_.isEmpty(user.get('id'));
};

var hasPermission = function (permission) {
    return _.contains(user.get('permissions'), permission);
};

var sync = Backbone.sync;
var _addAuthorizeHeader = function () {
    Backbone.sync = function (method, model, options) {
        options || (options = {});

        var optionsBeforeSend = options.beforeSend;
        var beforeSend = function (xhr) {
            xhr.setRequestHeader("Authorization", 'OAuth ' + token);
            if (optionsBeforeSend) {
                optionsBeforeSend.apply(this, arguments);
            }

        };
        options.beforeSend = beforeSend;

        return sync(method, model, options);
    };
};



var session = {
    token: token,
    user: user,

    init: init,
    authenticate: authenticate,
    remember: remember,
    logout: logout,
    isLoggedIn: isLoggedIn,
    hasPermission: hasPermission
};

_.extend(session, Backbone.Events);


module.exports = session;