class Sound {
    constructor() {
        throw "Sound is not meant to be instantiated.";
    }

    static audioContext;
    static instrument;
    
    static instrumentName = "acoustic_grand_piano"

    static initialize() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            document.onclick = function (ev) {
                Sound.audioContext.resume();
            };

            this.instrument = Soundfont.instrument(this.audioContext, this.instrumentName, undefined);

            this.instrument.then(function (value) {
                document.getElementById("status").hidden = true;
            });
        } catch (error) {
            console.log(error);
            alert('Teie veebilehitseia ei toeta virtuaalset klaveri helisüsteemi.');
        }
    }

    static play(key) {
        if (this.audioContext == null || this.instrument == null)  {
            this.initialize()
        }
        if (key.mouse === Constants.mouseEvent.pressed) {
            Notes.getUsersForNote(key.playNote);
        }
        const audioContextTime = this.audioContext.currentTime;
        this.instrument.then(function (piano) {
            piano.play(key.playNote, audioContextTime, key.options);
        });
    };
}

window.addEventListener('load', function (ev) {
    Sound.initialize();
}, false);
