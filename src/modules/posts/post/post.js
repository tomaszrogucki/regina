var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var helpers = require('helpers');

var PostView = Base.View.extend({
    template: 'postTemplate',
    className: 'row post',

    events: {
        'click .editing': '_showSubmit',
        'click .save': '_save'
    },

    initialize: function () {
        this.delegateEvents();
        this.once('click .editable', this._showSubmit);
        //this.listenToOnce(this, 'click .editable', this._showSubmit);
    },

    _showSubmit: function () {
        this.$('.save').removeClass('hidden');
    },

    _save: function () {
        this.model.title = this.$('.title').html();
        this.model.content = this.$('.content').html();
        var postModel = new PostModel(this.model);
        postModel.save();
    }
});

var PostModel = Base.Model.extend({
    url: helpers.api('posts')

    //toJSON: function () {
    //    var json = Base.Model.prototype.toJSON.apply(this, arguments);
    //    json.created = json.created ? this._formatDate(new Date(json.created)) : '';
    //    return json;
    //},
    //
    //_formatDate: function(date) {
    //    return date.getDate() + ' ' + date.getMonth() + ' ' + date.getYear();
    //}
});


var Post = {
    View: PostView,
    Model: PostModel
};

module.exports = Post;