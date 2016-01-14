var app = app || {};

app.StaveView = Backbone.View.extend({

	tagName: 'div',
	className: 'stave',
	template: _.template($('#staveTemplate').html()),

	initialize: function(details, initialNotes) {
		this.sample = details.sample;
		this.staveName = details.name;
		this.collection = new app.Stave(initialNotes);
		this.$el.html(this.template({'staveName':this.staveName}));
		this.render();
		app._vent.on('transporter:tick', this.checkNotes, this);
		app._vent.on('controls:clearPattern', this.clearPattern, this);
		app._vent.on('controls:exportPattern', this.exportPattern, this);
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderNote(item);
		}, this);
	},

	renderNote: function(item){
		var noteView = new app.NoteView({
			model: item
		});
		this.$el.append(noteView.render().el);
	},

	checkNotes: function(tr) {
		var transporterPos = tr.get('position');
		var currentNote = this.collection.where({ position: transporterPos });
		if (currentNote[0].get('active'))
		{
			this.sample.play();
		}
	},

	clearPattern: function() {
		$('.note').removeClass('active');
		this.collection.each(function(note) {
			note.set('active', false);
		});
	}

});