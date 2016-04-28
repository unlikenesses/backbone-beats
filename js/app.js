var app = app || {};

app.boot = function(container, bpm) {

    app.bars = 8;

    app.bpm = bpm;

    app.delay = 60000 / bpm;

    app.width = (app.bars * 100) + 110;

    $('#machine').css('width', app.width + 'px');

    // Notes:

	var notes = [];

    for (var i = 1; i <= app.bars; i++) {
        notes.push({position: i, active: false});
    }

    app._vent = _.extend({}, Backbone.Events);

    // Staves:

    // (Samples from freewavesamples.com)
    var bass = new Howl({src:['audio/Bass-Drum-1.mp3']});
    var snare = new Howl({src:['audio/Hip-Hop-Snare-1.mp3']});
    var hihat = new Howl({src:['audio/Closed-Hi-Hat-1.mp3']});

    var staves = [
        {name: 'Bass', sample: bass},
        {name: 'Snare', sample: snare},
        {name: 'Hihat', sample: hihat}
    ];

    for (var i = 0; i < staves.length; i++) {
        container.append(new app.StaveView(staves[i], notes).el);
    }

    // Transporter: 
    app.transporterModel = new app.Transporter();
    app.transporterView = new app.TransporterView({model: app.transporterModel });

    // Controls:
    new app.ControlsView();

    // Set the timer:
    app.tempo = setInterval(function(){

    	app.transporterModel.tick();

    }, app.delay);

}   