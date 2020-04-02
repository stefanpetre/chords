
import chords from '../data/chords.js';
import keys from '../data/keys.js';
import Note from './note.js';
import inversions from '../data/inversions';

class Chord {
    constructor(root, type, octave = 4, inversion = 0, len = 1, voicing = [0, 0, 0]) {
        if (typeof root === 'object') {
            ({ root, type, octave, inversion, len , voicing} = root);
        }
        this.root = new Note(root, octave, len);
        this.type = chords[type];
        if (!this.type) {
            throw 'Invalid chord type';
        }
        this.octave = octave;
        this.inversion = inversion;
        if (this.inversion > this.type.steps.length) {
            throw 'Invalid inversion';
        }
        this.len = len;
        this.voicing = voicing;
    }

    set octave(value) {
        value = parseInt(value, 10);
        this.root.octave = value;
        this.toctave = value;
    }

    get octave() {
        return this.toctave;
    }

    clone() {
        const newChord = new Chord(this.root.key, this.type.type, this.octave, this.inversion, this.len, this.voicing.slice(0));
        if (this.scale) {
            newChord.scale = this.scale;
        }
        return newChord;
    }

    get maxInvertions() {
        return this.type.steps.length;
    }

    get possibleInversions() {
        const possible = [];
        for (let i = 0; i <= this.maxInvertions; i++) {
            possible.push(inversions[i]);
        }
        return possible;
    }

    get keys() {
        const chordKeys = [
            this.inversion ? new Note(this.root.key, this.root.octave + 1, this.root.len): this.root.clone()
        ];
        let indx = this.root.indx;
        this.type.steps.forEach((step,stepIndx) => {
            indx += step;
            const key = keys[indx % keys.length];
            chordKeys.push(new Note(key, this.octave + Math.floor(indx/keys.length) + (chordKeys.length < this.inversion ? 1: 0), this.len));
        });
        this.voicing.forEach((octave, indx) => {
            octave = parseInt(octave);
            if (octave) {
                const note = chordKeys[indx];
                chordKeys.push(new Note(note.key, note.octave + octave, note.len));
            }
        });
        return chordKeys;
    }
    get name() {
        let name = this.root.name;
        if (this.inversion) {
            name += '/' + this.keys[this.inversion].name;
        }
        name += ' ' + this.type.name;
        return name;
    }

    get state() {
        const state = {
            root: this.root.key,
            type: this.type.type,
            octave: this.octave,
            inversion: this.inversion,
            len: this.len,
            voicing: this.voicing.slice(0),
            name: this.name
        };
        return state;
    }
};

export default Chord;