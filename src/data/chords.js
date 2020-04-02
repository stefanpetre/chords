const chords = {
    major: {
        name: 'Major',
        steps: [4, 3]
    },
    major7: {
        name: 'Major seventh',
        steps: [4, 3, 4]
    },
    major9: {
        name: 'Major ninth',
        steps: [4, 3, 4, 3]
    },
    major6: {
        name: 'Major sixth',
        steps: [4, 3, 2]
    },
    minor: {
        name: 'Minor',
        steps: [3, 4]
    },
    minor7: {
        name: 'Minor seventh',
        steps: [3, 4, 3]
    },
    minor9: {
        name: 'Minor ninth',
        steps: [3, 4, 3, 4]
    },
    minor6: {
        name: 'Minor sixth',
        steps: [3, 4, 2]
    },
    sus4: {
        name: 'Suspended  four',
        steps: [5, 2]
    },
    sus2: {
        name: 'Suspended two',
        steps: [2, 5]
    },
    dim: {
        name: 'Diminshed',
        steps: [3, 3]
    },
    dim7: {
        name: 'Diminshed seventh',
        steps: [3, 3, 3]
    },
    halfdim7: {
        name: 'Half-diminished seventh',
        steps: [3, 3, 4]
    },
    aug: {
        name: 'Augmented',
        steps: [4, 4]
    },
    aug7: {
        name: 'Augmented seventh',
        steps: [4, 4, 3]
    }
};

for (let type in chords) {
    chords[type].type = type;
}

export default chords;