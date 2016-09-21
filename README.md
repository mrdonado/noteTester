# noteTester
This is a jQuery component used in [Cassette Coach](http://ccoach.jdonado.com).

It consists of a responsive piano keyboard and a score that displays the pressed notes.

The notes can be reset by clicking on the black display above the keyboard. It is all controlled by a JS object called noteTester.

Try it out on the demo page: http://fjrd84.github.io/noteTester/ 

Here are the main examples for using the javascript component:

If noteTester.useSharps is true, sharp notes will be displayed. Otherwise, flat notes will be used:

```javascript
noteTester.useSharps = true; // Sharps are used.

noteTester.addListeners(); // Listens when the user presses a key, to mark it as pressed and display it on the score.

noteTester.removeListeners(); // Removes the listeners so that the user cannot press keys anymore.

noteTester.resetNotes(); // Resets the pressed notes.

noteTester.pushNote('C5'); // Will push the C5 note.

noteTester.pullNote('C5'); // Will pull the C5 note.

noteTester.currentNotes; // It stores an array with the currently pressed notes.
```

The recognized notes are:

'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'
'C#5', 'D#5', 'E#5', 'F#5', 'G#5', 'A#5', 'B#5'
'Cb5', 'Db5', 'Eb5', 'Fb5', 'Gb5', 'Ab5', 'Bb5'

In order to integrate it in your page, you need to copy the contents of the div with noteWrapper class in your DOM.

```html
<div class="noteTesterWrapper">
    <div id="noteTester">
        <div id="noteTesterScore">
            <div class="note C4" style="display:none"></div>
            <div class="note D4" style="display:none"></div>
            <div class="note E4" style="display:none"></div>
            <div class="note F4" style="display:none"></div>
            <div class="note G4" style="display:none"></div>
            <div class="note A4" style="display:none"></div>
            <div class="note B4" style="display:none"></div>
            <div class="note C5" style="display:none"></div>
            <div class="note D5" style="display:none"></div>
            <div class="note E5" style="display:none"></div>
            <div class="note F5" style="display:none"></div>
            <div class="note G5" style="display:none"></div>
            <div class="note A5" style="display:none"></div>
            <div class="note B5" style="display:none"></div>
        </div>
        <div id="noteTesterPiano">
            <div class="note C4" data-note="C4"></div>
            <div class="note C4Sharp" data-note="C4#"></div>
            <div class="note D4" data-note="D4"></div>
            <div class="note D4Sharp" data-note="D4#"></div>
            <div class="note E4" data-note="E4"></div>
            <div class="note F4" data-note="F4"></div>
            <div class="note F4Sharp" data-note="F4#"></div>
            <div class="note G4" data-note="G4"></div>
            <div class="note G4Sharp" data-note="G4#"></div>
            <div class="note A4" data-note="A4"></div>
            <div class="note A4Sharp" data-note="A4#"></div>
            <div class="note B4" data-note="B4"></div>
            <div class="note C5" data-note="C5"></div>
            <div class="note C5Sharp" data-note="C5#"></div>
            <div class="note D5" data-note="D5"></div>
            <div class="note D5Sharp" data-note="D5#"></div>
            <div class="note E5" data-note="E5"></div>
            <div class="note F5" data-note="F5"></div>
            <div class="note F5Sharp" data-note="F5#"></div>
            <div class="note G5" data-note="G5"></div>
            <div class="note G5Sharp" data-note="G5#"></div>
            <div class="note A5" data-note="A5"></div>
            <div class="note A5Sharp" data-note="A5#"></div>
            <div class="note B5" data-note="B5"></div>
        </div>
        <div class="pianoControllers">
            <div onclick="noteTester.resetNotes()" id="noteTesterFeedback"></div>
        </div>
    </div>
</div>
```

Then, include noteTester.css and noteTester.js:

```html
<script src="noteTester.js"></script>
<link rel="stylesheet" type="text/css" href="noteTester.css">
``` 

Eventually, you will need to modify the css definition of the noteWrapper component, to make it fit in well in your page. E.g.:

```css
.noteTesterWrapper{
  width: 75%;
  padding-top: 22%;
  margin-left: 5%;
  position: relative;
  background-repeat: no-repeat;
}
```

jQuery is also required! (at least version 1.11.1).

You can test it on the demo page http://fjrd84.github.io/noteTester/ or simply by downloading/cloning the repository and opening noteTester.html on your browser.

## License
noteTester.js is licensed under MIT License.
