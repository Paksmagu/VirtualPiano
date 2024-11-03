class Notes {
    constructor() {
        const note = {
            id: 0,
            displayNote: "c",
            playNote: "c4",
            totalPrice: 200,
            currentPrice: 0,
            keybind: "KeyQ",
            shiftModifier: 0
        }
        throw "Notes is not meant to be instantiated.";
    }

    static noteList = undefined;

    static setNoteList() {
        this.noteList = undefined;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                Notes.noteList = JSON.parse(this.responseText);
            }
        };
        //TODO: Change the static IP Address.
        xhttp.open("GET", "https://resentful.eu/V3.0/api/getAllNotes.php", false);
        xhttp.send();
    }

    static getNoteList() {
        if (Notes.noteList == null) {
            this.setNoteList();
        }
        return Notes.noteList;
    }

    static getFullNote(playNote) {
        let note = undefined;
        this.getNoteList().forEach(dbNote => {
            if (dbNote.playNote === playNote) {
                note = dbNote;
            }
        });
        return note;
    }

    static getKeybind(playNote) {
        const note = this.getFullNote(playNote);
        if (note == null) return undefined;
        else return {keybind: note.keybind, shiftModifier: note.shiftModifier}
    }

    static getPlayNoteFromKeybind(keyEvent) {
        const keybind = keyEvent.code;
        let shiftModifier = undefined;
        if (keyEvent.shiftKey) {
            shiftModifier = 1
        } else {
            shiftModifier = 0;
        }
        let note = undefined;
        this.getNoteList().forEach(dbNote => {
            if (dbNote.keybind === keybind && dbNote.shiftModifier === shiftModifier) {
                note = dbNote;
            }
        });
        if (note != null) return note.playNote;
        else return undefined;
    }

    static getUsersForNote(note) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let json = JSON.parse(this.responseText);
                DonatorCards.createDonatorInfo(json);
            }
        }
        //TODO: Fix static IP
        xhttp.open("GET", "https://resentful.eu/V3.0/api/getNoteOwners.php?id=" + encodeURIComponent(note), true);
        xhttp.send();
    }
}