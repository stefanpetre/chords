import keys from '../data/keys.js';
import scales from '../data/scales.js';
import Note from './note.js';
import Chord from './chord.js';

class Scale {
    constructor(root, type) {
        this.root = new Note(root);
        this.type = scales[type];
        if (!this.type) {
            throw 'Invalid scale type';
        }
        this.type.type = type;
    }

    get keys(){
        const scaleKeys = [this.root];
        let indx = this.root.indx;
        this.type.steps.forEach(step => {
            indx += step;
            const key = keys[indx % keys.length];
            scaleKeys.push(new Note(key, this.octave));
        });
        return scaleKeys;
    }

    get chords(){
        const scaleChords = {};
        let step = 0;
        for (let chordKey in this.type.chords) {
            const root = this.keys[step];
            const chordType = this.type.chords[chordKey];
            const chord = new Chord(root.key, chordType.type) ;
            chord.scale = chordType;
            scaleChords[chordKey] = chord;
            step +=1;
        }
        return scaleChords;
    }
};

export default Scale;