var app = app || {};

app.Transporter = Backbone.Model.extend({

	defaults: {
		position: 1,
		playing: false
	},

	initialize: function() {

		app._vent.on('controls:togglePlay', this.togglePlay, this);

	},

	tick: function() {

		if (this.get('playing')) {
			var pos = this.get('position');
			pos++;
			if (pos > app.bars) pos = 1;
			this.set('position', pos);
			app._vent.trigger('transporter:tick', this);
		}
	},

	togglePlay: function() {

		this.set('playing', ! this.get('playing'));

	}

});