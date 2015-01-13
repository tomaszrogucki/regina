var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var PostView = Base.View.extend({
    template: 'postTemplate',
    className: 'row'
});

var PostModel = Base.Model.extend({

});


var Post = {
    View: PostView,
    Model: PostModel
};

module.exports = Post;