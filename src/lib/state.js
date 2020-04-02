const State = {};

let tracks = localStorage.getItem('tracks');
if (tracks) {
    State.tracks = JSON.parse(tracks);
} else {
    State.tracks = [];
}

let chords = localStorage.getItem('chords');
if (chords) {
    State.chords = JSON.parse(chords);
} else {
    State.chords = [];
}

function saveStorage(type) {
    switch (type) {
        case 'tracks':
            localStorage.setItem('tracks', JSON.stringify(State.tracks));
            break;
        case 'chords':
            localStorage.setItem('chords', JSON.stringify(State.chords));
            break;
    }
}

const Setters = {
    addTrack(track) {
        State.tracks.push(track);
        saveStorage('tracks');
    },
    removeTrack(indx) {
        State.tracks.splice(indx, 1);
        saveStorage('tracks');
    },
    addChord(chord) {
        State.chords.push(chord.state);
        saveStorage('chords');
    },
    removeChord(indx) {
        State.chords.splice(indx, 1);
        saveStorage('chords');
    }
};


const Getters = {
    tracks() {
        return State.tracks;
    },
    chords(){
        return State.chords;
    }
};

export { State, Setters, Getters };