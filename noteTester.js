/*global $, jQuery, alert*/
var noteTester = {
    useSharps: true,
    currentNotes: [],
    allowEverything: false, // If false, a note and its sharped or flatted version cannot be pressed at the same time
    // Note: if allowEverything is set to true, the score may not show all the pressed notes.
    addListeners: function () {
        'use strict';
        this.removeListeners();
        $('#noteTesterPiano .note').click(function () {
            noteTester.pushKey($(this));
        });
    },
    removeListeners: function () {
        'use strict';
        $('#noteTesterPiano .note').off();
    },
    pushKey: function (keyObject) {
        'use strict';
        var note,
            extraClass = '',
            noteNat;
        if (keyObject.length === 0) {
            console.log('Non existing note pressed');
            return;
        }
        note = keyObject.data('note');
        if (!this.useSharps) {
            note = this.sharpToFlat(note);
        }
        if (!this.allowEverything) {
            // The complementary note cannot be pressed at the same time 
            this.pullKey(this.findComplementary(note));
        }
        noteNat = note.substr(0, 2);
        if (note.indexOf('b') > -1) {
            extraClass = '.flat';
        } else if (note.indexOf('#') > -1) {
            extraClass = '.sharp';
        }
        this.showNote(note);
        // The note object is selected/unselected
        if (keyObject.hasClass('selected')) {
            keyObject.removeClass('selected');
            this.removeNote(note);
            $('#noteTesterScore .note.' + noteNat + extraClass).hide();
        } else {
            keyObject.addClass('selected');
            this.addNote(note);
            $('#noteTesterScore .note.' + noteNat).addClass(extraClass.slice(1));
            $('#noteTesterScore .note.' + noteNat).show();
        }
    },
    pullKey: function (note) {
        'use strict';
        var cssClass,
            noteNat = note.substr(0, 2),
            noteSharp = this.flatToSharp(note).replace('#', 'Sharp');
        if (note.indexOf('b') > -1) {
            cssClass = 'flat';
        } else if (note.indexOf('#') > -1) {
            cssClass = 'sharp';
        }
        // Only if the note is really pressed, it will be removed.
        if($.inArray(note, this.currentNotes)>-1){
            this.removeNote(note);
            // On the piano only sharp notes are represented (thus the conversion to sharp)
            $('#noteTesterPiano .note.' + noteSharp).removeClass('selected');
            $('#noteTesterScore .note.' + noteNat).removeClass(cssClass);
        }
    },
    // A complementary note should not be pressed at the same time (e.g.: C# and C, etc.)
    findComplementary: function (note) {
        'use strict';
        if (note === undefined) {
            console.log('Non existing note pressed');
            return;
        }
        if (note.indexOf('b') > -1) {
            return note.replace('b', '');
        }
        if (note.indexOf('#') > -1) {
            return note.replace('#', '');
        }
        if (this.useSharps) {
            return note + '#';
        }
        return note + 'b';
    },
    sharpToFlat: function (note) {
        'use strict';
        switch (note) {
            case 'C4#':
                return 'D4b';
            case 'D4#':
                return 'E4b';
            case 'F4#':
                return 'G4b';
            case 'G4#':
                return 'A4b';
            case 'A4#':
                return 'B4b';
            case 'C5#':
                return 'D5b';
            case 'D5#':
                return 'E5b';
            case 'F5#':
                return 'G5b';
            case 'G5#':
                return 'A5b';
            case 'A5#':
                return 'B5b';
        }
        // If it is not sharp, the same note is returned.
        return note;
    },
    flatToSharp: function (note) {
        'use strict';
        switch (note) {
            case 'D4b':
                return 'C4#';
            case 'E4b':
                return 'D4#';
            case 'G4b':
                return 'F4#';
            case 'A4b':
                return 'G4#';
            case 'B4b':
                return 'A4#';
            case 'D5b':
                return 'C5#';
            case 'E5b':
                return 'D5#';
            case 'G5b':
                return 'F5#';
            case 'A5b':
                return 'G5#';
            case 'B5b':
                return 'A5#';
            case 'C4b':
                return 'B4';
            case 'C5b':
                return 'B5';
            case 'F4b':
                return 'E4';
            case 'F5b':
                return 'E5';
        }
        // If it is not sharp, the same note is returned.
        return note;
    },
    addNote: function (note) {
        'use strict';
        this.currentNotes.push(note);
    },
    removeNote: function (note) {
        'use strict';
        var index = this.currentNotes.indexOf(note);
        if (index > -1) {
            this.currentNotes.splice(index, 1);
        }
    },
    // It shows a note on the display panel
    showNote: function (note) {
        'use strict';
        $('#noteTesterFeedback').empty();
        $('#noteTesterFeedback').append('<div class="feedbackNote" style="display:none">' + note + '</div>');
        $('.feedbackNote').fadeIn(500);
        setTimeout(function () {
            $('.feedbackNote').fadeOut(300);
        }, 800);
    },
    // Used to simulate pressing a key on the keyboard for a specific note.
    pushNote: function (note) {
        'use strict';
        var cssClass = (this.flatToSharp(note)).replace('#', 'Sharp');
        this.pushKey($('#noteTesterPiano .note.' + cssClass));
    },
    // Used to simulate pressing a key on the keyboard for an array of notes.
    pushNotes: function (notes) {
        'use strict';
        var octNotes = this.notesIntoOctaves(notes),
            numNotes = notes.length,
            i;
        for (i = 0; i < numNotes; i += 1) {
            this.pushNote(octNotes[i]);
        }
    },
    resetNotes: function () {
        'use strict';
        this.currentNotes = [];
        $('.note.selected').each(function () {
            $(this).removeClass('selected');
        });
        $('#noteTesterScore .note').hide();
        $('#noteTesterScore .note').removeClass('flat');
        $('#noteTesterScore .note').removeClass('sharp');
    },
    // It returns the current notes without information about the octaves.
    getNotesNoOctaves: function () {
        'use strict';
        var notes = [],
            i;
        for (i = 0; i < this.currentNotes.length; i += 1) {
            notes[i] = this.currentNotes[i].replace(/\d+/g, '');
        }
        return notes;
    },
    // It tells if the note1 is smaller than the note2 (C is smaller than D, etc.)
    smallerNote: function (note1, note2) {
        'use strict';
        var notes = 'CDEFGAB'; // Notes order
        note1 = note1.substr(0, 1),
            note2 = note2.substr(0, 1);
        return notes.indexOf(note1) < notes.indexOf(note2);

    },
    // It translates non existing notes such as Cb and G## into existing notes on the keyboard.
    normalizeNote: function (note) {
        'use strict';
        var note = note.trim();
        switch (note) {
            case 'B#':
                return 'C';
            case 'E#':
                return 'F';
            case 'Cb':
                return 'B';
            case 'Fb':
                return 'E';
            case 'C##':
                return 'D';
            case 'D##':
                return 'E';
            case 'E##':
                return 'F#';
            case 'F##':
                return 'G';
            case 'G##':
                return 'A';
            case 'A##':
                return 'B';
            case 'B##':
                return 'C#';
            case 'Cbb':
                return 'Bb';
            case 'Dbb':
                return 'C';
            case 'Ebb':
                return 'D';
            case 'Fbb':
                return 'Eb';
            case 'Gbb':
                return 'F';
            case 'Abb':
                return 'G';
            case 'Bbb':
                return 'A';
            default:
                return note;
        }
    },
    // It normalizes an array of notes (it translates non existing notes into currently available notes on the keyboard, such as Cb and E##)
    normalizeNotes: function (notes) {
        'use strict';
        var numNotes = notes.length,
            i;
        for (i = 0; i < numNotes; i += 1) {
            notes[i] = this.normalizeNote(notes[i]);
        }
        return notes;
    },
    // It returns the given array of notes with information added about octaves
    notesIntoOctaves: function (notes) {
        'use strict';
        var octave = 4,
            previousNote,
            notesOct = [],
            numNotes = notes.length,
            i;
        notes = this.normalizeNotes(notes);
        previousNote = notes[0];
        notesOct[0] = previousNote.substr(0, 1) + octave.toString() + previousNote.substr(1);
        if (numNotes === 1) {
            return notesOct;
        }
        for (i = 1; i < numNotes; i += 1) {
            if (this.smallerNote(notes[i], previousNote)) {
                octave += 1;
            }
            previousNote = notes[i];
            notesOct[i] = previousNote.substr(0, 1) + octave.toString() + previousNote.substr(1);
        }
        return notesOct;
    }
};