var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');

var helpers = require('helpers');
var session = require('session');
var Post = require('post');
var Editor = require('editor');
var PostsNav = require('postsNav');

var PostsView = Base.View.extend({
    template: 'postsTemplate',
    id: 'posts',

    initialize: function (options) {
        options || (options = {});

        this.postsCollection = new PostsCollection(null, options);
        this.postsCollectionView = new PostsCollectionView({collection: this.postsCollection});

        this.postsNavView = new PostsNav.View({el: this.$('.postsNav'), model: this.postsCollection.metadata});

        this.editor = new Editor({el: this.el});

        this.listenTo(this.postsCollection, 'add sync reset', this._renderPostCollectionView);
        this.listenTo(session, 'loggedIn', this._fetchPosts.bind(this, {addPost: true}));
        this.listenTo(session, 'loggedOut', this._fetchPosts.bind(this, {removePost: true}));

        this.listenTo(this.postsCollection.metadata, 'change', this.postsNavView.render.bind(this.postsNavView));

        this._fetchPosts({addPost: session.hasPermission('write_post')});
    },

    remove: function () {
        this.editor.disable();
        Base.View.prototype.remove.apply(this, arguments);
    },

    _renderPostCollectionView: function () {
        this.postsCollectionView.render();
        if (session.hasPermission('write_post')) {
            this.editor.enable();
        }
        else {
            this.editor.disable();
        }
    },

    _fetchPosts: function (options) {
        options || (options = {});

        var newPost = {title: 'Nowy tytuł', content: 'Nowa treść', created: ''};
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
    url: function () {
        var postId = this.postId ? '/' + this.postId : '';
        return helpers.api('posts') + postId;
    },

    initialize: function (models, options) {
        options || (options = {});

        this.postId = options.id;
        this.metadata = new PostsCollectionMetadata();
    },

    parse: function (response) {
        this.metadata.set(response.metadata);
        return response.posts;
    }
});

var PostsCollectionMetadata = Base.Model.extend({

});


var Posts = {
    View: PostsView,
    Collection: PostsCollection
};

module.exports = Posts;