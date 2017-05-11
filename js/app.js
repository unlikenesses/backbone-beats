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

    var stavesSrc = [
        {id: 1, name: 'Bass', sample: bass},
        {id: 2, name: 'Snare', sample: snare},
        {id: 3, name: 'Hihat', sample: hihat}
    ];

    app.staves = [];

    for (var i = 0; i < stavesSrc.length; i++) {
        var sv = new app.StaveView(stavesSrc[i], notes);
        app.staves.push(sv);
        this.checkLocalStorage(sv);
        container.append(sv.el);
    }

    app._vent.on('note:click', this.savePattern, this);

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

app.savePattern = function() {
    for (var stave of app.staves) {
        console.log(stave.id, stave.collection.toJSON());
        localStorage.setItem('bb-pattern-' + stave.id, JSON.stringify(stave.collection.toJSON()));
    }
} 

app.checkLocalStorage = function(stave) {
    // console.log(stave);
    // console.log('checking for existence of ' + stave.cid);
    var localStorageRef = localStorage.getItem('bb-pattern-' + stave.id);
    if (localStorageRef) {
        // console.log('found');
        stave.collection.reset(JSON.parse(localStorageRef));
        // console.log(stave);
    }
}