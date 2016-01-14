var app = app || {};

app.TransporterView = Backbone.View.extend({

	el: $('.transporter'),

	transporterContainer: $('.transporterContainer'),

	offLight: '<div class="transporterOff"><div class="transportLight"><div class="hilight"></div></div></div>',

	initialize: function() {

		this.model.on('change', _.bind(this.render, this));
		// Draw "off" lights:
		for(i = 0; i < app.bars; i++) {
			this.transporterContainer.append(this.offLight);
		}	

	},

	render: function() {

		var left = (this.model.get('position') - 1) * 100;
		this.$el.css('left', left);
		return this;

	}

});