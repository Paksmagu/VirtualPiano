class Canvas {
    constructor() {
        throw "Canvas is not meant to be instantiated.";
    }
    /**
     * TODO: GET THE WIDTH FROM THE MAIN ELEMENT
     */
    static contentBodyElementId = "content_a"
    static maxPianoHeight = 200

    static canvas = undefined;
    static canvasContext = undefined;

    static notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    static blackNotes = {
        higher: ['C#', 'D#', 'F#', 'G#', 'A#'],
        lower: ['Db', 'Eb', 'Gb', 'Ab', 'Bb']
    }

    static numberOfOctaves = 9

    static whiteKeysInOctave = 7
    static whiteKeysInZeroOctave = 2
    static whiteKeysInEighthOctave = 1

    static numberOfWhiteKeys = ((this.numberOfOctaves - 2) * this.whiteKeysInOctave)
        + this.whiteKeysInZeroOctave
        + this.whiteKeysInEighthOctave;

    static blackKeysInOctave = 5
    static blackKeysInZeroOctave = 1

    static borderThickness = 1;
    static halfBorderThickness = Constants.round(this.borderThickness / 2, 2);

    static gain = {nothing: 0, mobile: 2, computer: 6}

    static displayTooltips = false;
    static setDisplayTooltips(displayBoolean) {
        this.displayTooltips = displayBoolean;
    }

    static whiteKeys = {
        list: [],
        width: undefined,
        height: undefined,
        isWhiteKey: true
    }

    static blackKeys = {
        list: [],
        width: undefined,
        height: undefined,
        isWhiteKey: false
    }

    static initialize() {
        try {
            this.canvas = document.getElementById("canvas");
            this.canvasContext = this.canvas.getContext('2d');

            window.addEventListener(Constants.eventTypes.resize, function (event) {
                Canvas.initKeyboard();
            });

            this.initKeyboard();
        } catch (error) {
            console.log(error);
            alert('Ilmnes viga klaviatuuri loomisel. Palun värskendage lehekülg, et uuesti proovida.');
        }
    };


    static initKeyboard() {
        let windowHeight = window.innerHeight / 2;
        if (windowHeight > this.maxPianoHeight) {
            windowHeight = this.maxPianoHeight;
        }
        this.canvas.height = windowHeight;
        const widthElement = window.getComputedStyle(document.getElementById(this.contentBodyElementId));
        this.canvas.width = widthElement.width.replace("px", "")
            - widthElement.paddingLeft.replace("px", "")
            - widthElement.paddingRight.replace("px", "");

        const whiteKeyBorderOffset = this.numberOfWhiteKeys * this.borderThickness;
        this.whiteKeys.width = Constants.round((this.canvas.width - whiteKeyBorderOffset) / this.numberOfWhiteKeys, 2);
        this.whiteKeys.height = Constants.round(this.canvas.height - this.borderThickness, 2);

        this.blackKeys.width = Constants.round(this.whiteKeys.width * 2 / 3, 2);
        this.blackKeys.height = Constants.round(this.whiteKeys.height * 2 / 3, 2);

        this.resetCanvas();

        for (let octaveIndex = 0; octaveIndex < this.numberOfOctaves; octaveIndex++) {
            this.createWhiteKeys(octaveIndex);
            this.createBlackKeys(octaveIndex);
        }

        this.render();
    };

    static resetCanvas() {
        this.whiteKeys.list = [];
        this.blackKeys.list = [];
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    static render() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderLogic(this.whiteKeys.list)
        this.renderLogic(this.blackKeys.list)
        if (this.displayTooltips) {
            this.renderTooltips(this.whiteKeys);
            this.renderTooltips(this.blackKeys);
        }
        document.getElementById("keyboard-tooltip").checked = this.displayTooltips;
    };

    static renderLogic(keyList) {
        for (let i = 0; i < keyList.length; i++) {
            switch (keyList[i].mouse) {
                case Constants.mouseEvent.pressed: {
                    this.canvasContext.fillStyle = keyList[i].pressGradient;
                    break;
                }
                case Constants.mouseEvent.hover: {
                    this.canvasContext.fillStyle = keyList[i].hoverGradient;
                    break;
                }
                default: {
                    this.canvasContext.fillStyle = keyList[i].defaultGradient;
                    break;
                }
            }
            this.canvasContext.lineWidth = this.borderThickness;
            this.canvasContext.stroke(keyList[i]);
            this.canvasContext.fill(keyList[i]);
        }
    }

    static renderTooltips(keys) {
        this.canvasContext.font = keys.width + "px serif";
        if (keys.isWhiteKey) this.canvasContext.fillStyle = "black";
        else this.canvasContext.fillStyle = "white";

        for (let i = 0; i < keys.list.length; i++) {
            if (keys.list[i].keybind != null) {
                let keyBindString = keys.list[i].keybind.replace("Key", "")
                if (keys.isWhiteKey) keyBindString = keyBindString.toLowerCase()
                this.canvasContext.fillText(keyBindString,
                    Constants.round(keys.list[i].x + (keys.width / 2) - (this.canvasContext.measureText(keyBindString).width / 2),2),
                    Constants.round(keys.height * 0.9, 2))
            }
        }
    }

    static createWhiteKeys(octaveIndex) {
        const keysToDrawPerOctave = this.keysToDrawPerOctave(octaveIndex, true);
        const keysPreviouslyDrawn = this.whiteKeys.list.length;

        let whiteKeyBorderOffset = keysPreviouslyDrawn * this.borderThickness; //Take into account the border thickness of the white keys
        const octaveOffset = (keysPreviouslyDrawn * this.whiteKeys.width); //when a new octave starts increase the width
        for (let keyInOctave = 0; keyInOctave < keysToDrawPerOctave; keyInOctave++) {
            let keyIndex = keyInOctave;
            if (octaveIndex === 0) keyIndex = keyIndex + this.whiteKeysInOctave - this.whiteKeysInZeroOctave;

            const totalOffset = Constants.round((keyInOctave * this.whiteKeys.width) + octaveOffset + whiteKeyBorderOffset, 2);
            const whiteKey = this.newKey(totalOffset, this.whiteKeys.width, this.whiteKeys.height,
                (this.notes[keyIndex] + octaveIndex),
                keyInOctave, octaveIndex, true);
            this.whiteKeys.list.push(whiteKey);

            whiteKeyBorderOffset += this.borderThickness;
        }
    };

    static createBlackKeys(octaveIndex) {
        const keysToDrawPerOctave = this.keysToDrawPerOctave(octaveIndex, false);
        if (keysToDrawPerOctave == null) return;

        const whiteKeysToDrawPerOctave = this.keysToDrawPerOctave(octaveIndex, true);
        let whiteKeysPreviouslyDrawn = this.whiteKeys.list.length - whiteKeysToDrawPerOctave

        let blackKeyBorderOffset = 0;
        const blackKeyStartPlace = this.whiteKeys.width + this.halfBorderThickness - (this.blackKeys.width / 2); //Between 2 white notes
        const octaveOffset = whiteKeysPreviouslyDrawn * (this.whiteKeys.width + this.borderThickness); //when a new octave starts increase the width
        for (let keyInOctave = 0; keyInOctave < keysToDrawPerOctave; keyInOctave++) {
            let keyIndex = keyInOctave
            if (octaveIndex === 0) keyIndex = keyIndex + this.blackKeysInOctave - this.blackKeysInZeroOctave

            let blackKeyOffset; // C# D# ?? F# G# A#   - skipib 1 note
            if (keyInOctave < 2) {
                blackKeyOffset = (keyInOctave * (this.whiteKeys.width));
            } else {
                blackKeyOffset = (keyInOctave * (this.whiteKeys.width)) + this.whiteKeys.width + this.borderThickness;
            }
            const totalOffset = Constants.round(blackKeyOffset + blackKeyStartPlace + octaveOffset + blackKeyBorderOffset, 2); //Total offset

            let blackNote = undefined;
            if (octaveIndex < 4) {
                blackNote = this.blackNotes.lower[keyIndex];
            } else {
                blackNote = this.blackNotes.higher[keyIndex];
            }

            const blackKey = this.newKey(totalOffset, this.blackKeys.width, this.blackKeys.height,
                blackNote + octaveIndex, keyInOctave, octaveIndex, false);
            this.blackKeys.list.push(blackKey);

            blackKeyBorderOffset += this.borderThickness;
        }
    };

    static newKey(totalOffset, keyWidth, keyHeight, playNote, keyInOctave, octaveIndex, isWhiteKey) {
        const key = new Path2D();
        key.x = totalOffset + this.halfBorderThickness;
        key.y = this.halfBorderThickness;
        key.rect(key.x, key.y, keyWidth, keyHeight);
        const note = Notes.getFullNote(playNote)
        key.id = note.id;
        key.currentPrice = note.currentPrice;
        key.playNote = note.playNote;
        key.displayNote = note.displayNote;
        key.keybind = Notes.getKeybind(playNote).keybind;
        key.isWhiteKey = isWhiteKey;
        key.mouse = Constants.mouseEvent.released;
        key.octaveIndex = octaveIndex;
        key.keyInOctave = keyInOctave;
        key.options = {}
        key.options.duration = 1.5;

        let gain;
        if (Constants.isMobile.any()) gain = this.gain.mobile;
        else gain = this.gain.computer;

        if (note.currentPrice >= note.totalPrice) {
            key.options.gain = gain;
        } else if (note.currentPrice > 0) {
            key.options.gain = Constants.round((gain / 6), 2);
        } else {
            key.options.gain = this.gain.nothing;
        }

        const gradientColor = this.getGradientColor(note, isWhiteKey);
        const gradientMap = this.initializeGradients(keyHeight, gradientColor, key);
        key.defaultGradient = gradientMap["default"];
        key.pressGradient = gradientMap["press"];
        key.hoverGradient = gradientMap["hover"];

        return key;
    };

    static getGradientColor(note, isWhiteKey) {
        let gradientColor;
        if (note.currentPrice >= note.totalPrice) {
            if (isWhiteKey) {
                gradientColor = "rgb(255,255,255)"
            } else {
                gradientColor = "rgb(0,0,0)"
            }
        } else if (note.currentPrice > 0) {
            if (isWhiteKey) {
                gradientColor = "rgb(255,242,229)"
            } else {
                gradientColor = "rgb(60,60,60)"
            }
        } else {
            if (isWhiteKey) {
                gradientColor = "rgb(249,226,183)"
            } else {
                gradientColor = "rgb(60,60,60)"
            }
        }
        return gradientColor;
    }

    static initializeGradients(keyHeight, gradientColor, key) {
        let defaultGradient, pressGradient, hoverGradient,defaultOptions, pressOptions, hoverOptions;
        if (key.isWhiteKey) {
            defaultOptions = {0: gradientColor};
            pressOptions = {0.1: gradientColor, 0.95: "rgb(177, 177, 177)", 1: "rgb(101, 101, 101)"};
            hoverOptions = {0.1: gradientColor, 1: "rgb(207, 207, 207)"};
        } else {
            if (key.currentPrice > 0 && key.currentPrice < 200) defaultOptions = {0: "rgb(0,0,0)", 0.8:gradientColor};
            else defaultOptions = {0: gradientColor};
            pressOptions = {0.1: gradientColor, 1: "rgb(128,128,128)"};
            hoverOptions = {0.3: "rgb(128,128,128)", 0.9: gradientColor};
        }
        defaultGradient = this.createKeyGradient(keyHeight, defaultOptions);
        pressGradient = this.createKeyGradient(keyHeight, pressOptions);
        hoverGradient = this.createKeyGradient(keyHeight, hoverOptions);

        return {default: defaultGradient, press: pressGradient, hover: hoverGradient};
    }

    static createKeyGradient(keyHeight, gradiantMap) {
        const gradient = this.canvasContext.createLinearGradient(0, 0, 0, keyHeight)
        for (let option in gradiantMap) {
            if (gradiantMap.hasOwnProperty(option)) {
                gradient.addColorStop(parseFloat(option), gradiantMap[option]);
            }
        }
        return gradient;
    }

    static getDrawnKeyByPlayNote(noteString) {
        if (noteString == null) return undefined;
        for (let i = 0; i < this.blackKeys.list.length; i++) {
            if (this.blackKeys.list[i].playNote === noteString) {
                return this.blackKeys.list[i];
            }
        }
        for (let i = 0; i < this.whiteKeys.list.length; i++) {
            if (this.whiteKeys.list[i].playNote === noteString) {
                return this.whiteKeys.list[i];
            }
        }
        return undefined;
    }

    static getDrawnKeyById(noteId) {
        if (noteId == null) return undefined;
        for (let i = 0; i < this.blackKeys.list.length; i++) {
            if (this.blackKeys.list[i].id.toString() === noteId) {
                return this.blackKeys.list[i];
            }
        }
        for (let i = 0; i < this.whiteKeys.list.length; i++) {
            if (this.whiteKeys.list[i].id.toString() === noteId) {
                return this.whiteKeys.list[i];
            }
        }
        return undefined;
    }

    static keysToDrawPerOctave(octaveIndex, isWhiteKeys) {
        if (octaveIndex === 0) {
            if (isWhiteKeys) return this.whiteKeysInZeroOctave;
            else return this.blackKeysInZeroOctave;
        } else if (octaveIndex === 8 && isWhiteKeys) {
            return this.whiteKeysInEighthOctave
        } else if (octaveIndex > 7 && !isWhiteKeys) {
            return undefined;
        } else {
            if (isWhiteKeys) return this.whiteKeysInOctave;
            else return this.blackKeysInOctave;
        }
    }
}

window.addEventListener('load', function (ev) {
    Canvas.initialize();
}, false);