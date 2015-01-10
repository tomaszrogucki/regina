var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var template = require('helpers').template;


var BaseView = Backbone.View.extend({
    render: function () {
        var modelJson = (this.model instanceof Backbone.Model) ? this.model.toJSON() : this.model || {};
        this.$el.html(template(this.template, modelJson));
        return this;
    }
});

var BaseCollectionView = Backbone.View.extend({
    render: function () {
        if (this.view) {
            var $fragment = $(document.createDocumentFragment());
            this.collection.each(function (model) {
                var view = new this.view({model: model});
                var viewHtml = view.render();
                $fragment.append(viewHtml.$el);
            }, this);
            this.$el.html($fragment);
        }
        else {
            this.$el.html(template(this.template, this.collection.toJSON()));
        }

        return this;
    }
});

var BaseModel = Backbone.Model;


var Base = {
    View: BaseView,
    CollectionView: BaseCollectionView,
    Model: BaseModel
};


module.exports = Base;