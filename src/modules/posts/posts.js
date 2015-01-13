var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var helpers = require('helpers');
var session = require('session');
var Post = require('post');


var PostsView = Base.View.extend({
    template: 'postsTemplate',
    id: 'posts',
    initialize: function () {
        this.postsCollection = new PostsCollection();
        this.postsCollectionView = new PostsCollectionView({collection: this.postsCollection});

        this.listenTo(this.postsCollection, 'add sync reset', this._renderPostCollectionView);
        this.listenTo(session, 'loggedIn', this._fetchPosts.bind(this, {addPost: true}));
        this.listenTo(session, 'loggedOut', this._fetchPosts.bind(this, {removePost: true}));

        this._fetchPosts({addPost: session.hasPermission('write_post')});
    },

    _renderPostCollectionView: function () {
        return this.postsCollectionView.render();
    },

    _fetchPosts: function (options) {
        options || (options = {});

        var newPost = {title: 'Nowy tytuł', content: 'Nowa treść'};
        var fetchOptions = {remove: false};

        if (options.addPost && session.hasPermission('write_post')) {
            fetchOptions = {remove: false};
            this.postsCollection.add(newPost, {at: 0});
            if (this.postsCollection.length > 1) {
                return;
            }
        }

        if (options.removePost) {
            fetchOptions = {reset: true};
        }

        this.postsCollection.fetch(fetchOptions);
    }
});

var PostsCollectionView = Base.CollectionView.extend({
    el: '.postsContainer',
    view: Post.View
});


var PostsCollection = Base.Collection.extend({
    model: Post.Model,
    url: helpers.api('posts'),

    parse: function (response) {
        return response.posts;
    }
});


var Posts = {
    View: PostsView,
    Collection: PostsCollection
};

module.exports = Posts;