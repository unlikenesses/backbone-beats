var app = app || {};

app.ControlsView = Backbone.View.extend({

	el: $('.controls'),

	bpmField: $('#bpm'),

	events: {
		'click #togglePlay': 'togglePlay',
		'input #bpm': 'updateBpm',
		'click #clear': 'clearPattern'
	},

	initialize: function() {

		this.bpmField.val(app.bpm);
		$('#bpmOutput').html(app.bpm);

	},

	togglePlay: function(e) {

		e.preventDefault();
		var btnState = $('#togglePlay').html();
		if (btnState == 'Play') {
			$('#togglePlay').html('Stop');
		} else {
			$('#togglePlay').html('Play');
		}
		app._vent.trigger('controls:togglePlay', this);

	},

	updateBpm: function() {

		app.bpm = this.bpmField.val();
		$('#bpmOutput').html(app.bpm);
		clearInterval(app.tempo);	

		app.tempo = setInterval(function(){

	    	app.transporterModel.tick();

	    }, 60000 / app.bpm);

	},

	clearPattern: function(e) {

		e.preventDefault();
		app._vent.trigger('controls:clearPattern', this);

	}

});