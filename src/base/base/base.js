var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var template = require('helpers').template;


var BaseView = Backbone.View.extend({
    render: function () {
        if (_.isUndefined(this.el)) {
            this.setElement(this.$el.selector);
        }

        var modelJson = (this.model instanceof Backbone.Model) ? this.model.toJSON() : this.model || {};
        this.$el.html(template(this.template, modelJson));
        return this;
    }
});

var BaseCollectionView = Backbone.View.extend({
    render: function () {
        if (_.isEmpty(this.el)) {
            this.setElement(this.$el.selector);
        }

        if (this.view) {
            var $fragment = $(document.createDocumentFragment());
            this.collection.each(function (model) {
                model = (model instanceof BaseModel) ? model.toJSON() : model || {};
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

var BaseCollection = Backbone.Collection;


var Base = {
    View: BaseView,
    CollectionView: BaseCollectionView,
    Model: BaseModel,
    Collection: BaseCollection
};


module.exports = Base;