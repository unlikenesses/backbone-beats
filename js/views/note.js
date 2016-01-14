var app = app || {};

app.NoteView = Backbone.View.extend({

	tagName: 'div',
	className: 'noteContainer',
	template: _.template($('#noteTemplate').html()),

	events: {
		'click .note': 'toggleNote'
	},

	render: function(){

		this.$el.html(this.template(this.model.attributes));
		return this;

	},

	toggleNote: function() {

		var active = this.model.get('active');
		active = ! active;
		this.model.set('active', active);
		if (this.model.get('active')) {
			this.$el.find('.note').addClass('active');
		} else {
			this.$el.find('.note').removeClass('active');
		}

	}

});