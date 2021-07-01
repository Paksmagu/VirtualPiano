class InputLogic {
    constructor() {
        throw "InputLogic is not meant to be instantiated.";
    }

    static previousKey = undefined;
    static pressedDownKey = undefined;
    static mousePressed = false;
    static pressedKeyList = {};

    static initEvents() {
        Canvas.canvas.onselectstart = function () {
            return false;
        };
        let touchEventTypes;
        if (Constants.isMobile.any()) {
            touchEventTypes = Constants.eventTypes.mobile;
        } else {
            touchEventTypes = Constants.eventTypes.computer;
        }
        Canvas.canvas.addEventListener(touchEventTypes.pressEvent, function (event) {
            InputLogic.mousePressLogic(event);
        });
        Canvas.canvas.addEventListener(touchEventTypes.releaseEvent, function (event) {
            InputLogic.mouseReleaseLogic(event);
        });
        Canvas.canvas.addEventListener(touchEventTypes.moveEvent, function (event) {
            InputLogic.moveEventLogic(event);
        });
        Canvas.canvas.addEventListener(touchEventTypes.cancelEvent, function (event) {
            InputLogic.mouseReleaseLogic(event);
        });

        document.addEventListener(Constants.eventTypes.keyDown, function (event) {
            InputLogic.keyDownLogic(event);
        });
        document.addEventListener(Constants.eventTypes.keyUp, function (event) {
            InputLogic.keyUpLogic(event);
        });
    };

    static keyDownLogic(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;
        if (!this.pressedKeyList[event.code]) {
            const noteFromMapping = Notes.getPlayNoteFromKeybind(event);
            if (noteFromMapping == null) {
                this.pressedKeyList[event.code] = event.code;
                return;
            }
            this.pressedKeyList[event.code] = noteFromMapping;
            this.keyboardLogic(noteFromMapping, event, true);
        }
    }

    static keyUpLogic(event) {
        const noteFromMapping = this.pressedKeyList[event.code];
        delete this.pressedKeyList[event.code];
        this.keyboardLogic(noteFromMapping, event, false);
    }

    static resetPreviousValues() {
        this.mousePressed = false;
        if (this.previousKey != null) {
            this.previousKey.mouse = Constants.mouseEvent.released;
        }
        this.previousKey = undefined;
        if (this.pressedDownKey != null) {
            this.pressedDownKey.mouse = Constants.mouseEvent.released;
        }
        this.pressedDownKey = undefined;
    };

    static keyboardLogic(noteFromMapping, keyEvent, keyPressed) {
        const key = Canvas.getDrawnKeyByPlayNote(noteFromMapping)
        if (key == null) return;
        else {
            if (keyPressed) {
                key.mouse = Constants.mouseEvent.pressed;
                ModalLogic.setBuyNote(key);
                Sound.play(key);
            } else {
                key.mouse = Constants.mouseEvent.released;
            }
        }
        Canvas.render();
    }

    static mousePressLogic(event) {
        event.preventDefault();
        this.mousePressed = true;
        const key = this.getCollidingKey(event);
        if (key == null) return false;
        this.pressedDownKey = key;
        ModalLogic.setBuyNote(key);
        key.mouse = Constants.mouseEvent.pressed;
        Sound.play(key);
        Canvas.render();
        return false;
    };

    static mouseReleaseLogic(event) {
        event.preventDefault();
        this.resetPreviousValues();
        this.moveEventLogic(event);
        if (Constants.isMobile.any()) {
            const key = this.getCollidingKey(event);
            key.mouse = Constants.mouseEvent.released;
            Canvas.render();
        }
        return false;
    };

    static moveEventLogic(event) {
        event.preventDefault();
        const key = this.getCollidingKey(event);
        if (key == null) {
            Canvas.render();
            return false;
        }
        if (key.mouse !== Constants.mouseEvent.pressed) {
            key.mouse = Constants.mouseEvent.hover;
        }
        if (this.previousKey === key) return false;
        if (this.previousKey != null && this.previousKey.mouse !== Constants.mouseEvent.pressed) {
            this.previousKey.mouse = Constants.mouseEvent.released;
        }
        if (this.mousePressed) {
            Sound.play(key);
        }
        Canvas.render();
        this.previousKey = key;
        return false;
    };


    static getCollidingKey(event) {
        const mouseLocation = this.getMouseLocation(event);
        const blackKey = this.checkCollision(mouseLocation, Canvas.blackKeys);
        if (blackKey) {
            return blackKey;
        }
        const whiteKey = this.checkCollision(mouseLocation, Canvas.whiteKeys);
        if (whiteKey) {
            return whiteKey;
        }
        return undefined;
    };

    static checkCollision(mouseLocation, keys) {
        const x = mouseLocation.x;
        const y = mouseLocation.y;
        let key = undefined;
        for (let i = 0; i < keys.list.length; i++) {
            const left = keys.list[i].x;
            const right = keys.list[i].x + keys.width;
            const top = keys.list[i].y;
            const bot = keys.list[i].y + keys.height;
            if (right >= x && left <= x && bot >= y && top <= y) {
                key = keys.list[i];
            }
        }
        return key;
    };

    static getMouseLocation(event) {
        let x, y;
        const rect = Canvas.canvas.getBoundingClientRect();
        if (Constants.isMobile.any()) {
            x = event.changedTouches[0].clientX - rect.left;
            y = event.changedTouches[0].clientY - rect.top;
        } else {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        }
        return {x: x, y: y};
    };
}

window.addEventListener('load', function (event) {
    InputLogic.initEvents();
}, false);
