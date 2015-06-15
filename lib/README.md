# noteTester
This is a component used in Cassette Coach (www.cassettecoach.com).

It consists of a piano keyboard and a score that displays the pressed notes.

The notes can be reset by clicking on the black display above the keyboard. It is all controlled by a JS object called noteTester.

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

You can test it simply by downloading/cloning the repository and opening noteTester.html on your browser.

## License
noteTester.js is licensed under MIT License.