var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Base = require('base');


var Editor = function (params) {
    params || (params = {});

    this.el = params.el;
    this.view = new EditorView();
};

Editor.prototype.enable = function () {
    this.view.render();
    $('body').prepend(this.view.$el);

    $(this.el).find('.editable').attr('contentEditable', true).addClass('editing');
    $(this.el).find('.editing').on('mouseup', function (event) {
        var target = $(event.currentTarget);
        var offset = target.offset();
        this.view.$el.removeClass('hidden');
        this.view.$el.css({top: offset.top - this.view.$el.height(), left: offset.left});
    }.bind(this));
};

Editor.prototype.disable = function () {
    // TODO: check bound events
    this.view.$el.remove();

    $(this.el).find('.editable').attr('contentEditable', false).removeClass('editing');
};


var EditorView = Base.View.extend({
    template: 'editorTemplate',
    id: 'editor',
    className: 'hidden',

    events: {
        'mousedown .editorBold': '_bold',
        'mousedown .editorItalic': '_italic',
        'mousedown .editorUnderline': '_underline',
        'mousedown .editorH1': '_h1',
        'mousedown .editorH2': '_h2',
        'mousedown .editorH3': '_h3',
        'mousedown .editorH4': '_h4',
        'mousedown .editorParagraph': '_paragraph',
        'mousedown .editorLeft': '_left',
        'mousedown .editorRight': '_right',
        'mousedown .editorCenter': '_center',
        'mousedown .editorOrderedList': '_orderedList',
        'mousedown .editorUnorderedList': '_unorderedList'

    },

    _bold: function () {
        this._executeCommand('bold');
    },

    _italic: function () {
        this._executeCommand('italic');
    },

    _underline: function () {
        this._executeCommand('underline');
    },

    _h1: function () {
        this._executeCommand('formatBlock', false, '<h1>');
    },

    _h2: function () {
        this._executeCommand('formatBlock', false, '<h2>');
    },

    _h3: function () {
        this._executeCommand('formatBlock', false, '<h3>');
    },

    _h4: function () {
        this._executeCommand('formatBlock', false, '<h4>');
    },

    _paragraph: function () {
        this._executeCommand('formatBlock', false, 'p');
    },

    _orderedList: function () {
        this._executeCommand('insertOrderedList');
    },

    _unorderedList: function () {
        this._executeCommand('insertUnorderedList');
    },

    _executeCommand: function () {
        document.designMode = 'on';
        document.execCommand.apply(document, arguments);
        document.designMode = 'off';
    }
});

module.exports = Editor;