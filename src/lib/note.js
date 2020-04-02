import keys from '../data/keys.js';

class Note {
    constructor(key, octave = 4, len = 1) {
        this.key = key;
        this.indx = keys.indexOf(key);
        if (this.indx === -1) {
            throw 'Invalid note';
        }
        this.octave = octave;
        this.len = len;
    }
    
    get name() {
        return this.key + this.octave;
    }

    clone(){
        return new Note(this.key, this.octave, this.len);
    }
}

export default Note;