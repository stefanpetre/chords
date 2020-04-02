export default {
    major: {
        name: 'Major',
        steps: [2, 2, 1, 2, 2, 2, 1],
        chords: {
            I: {
                name: 'I',
                type: 'major'
            },
            ii: {
                name: 'ii',
                type: 'minor'
            },
            iii: {
                name: 'iii',
                type: 'minor'
            },
            IV: {
                name: 'IV',
                type: 'major'
            },
            V: {
                name: 'V',
                type: 'major'
            },
            vi: {
                name: 'vi',
                type: 'minor'
            },
            vii: {
                name: 'vii°',
                type: 'dim'
            }
        }
    },
    minor: {
        name: 'Natural minor',
        steps: [2, 1, 2, 2, 1, 2, 2],
        chords: {
            i: {
                name: 'i',
                type: 'minor'
            },
            ii: {
                name: 'ii°',
                type: 'dim'
            },
            III: {
                name: 'III',
                type: 'major'
            },
            iv: {
                name: 'iv',
                type: 'minor'
            },
            v: {
                name: 'v',
                type: 'minor'
            },
            VI: {
                name: 'VI',
                type: 'major'
            },
            VII: {
                name: 'ViI',
                type: 'major'
            }
        }
    },
    minor_harmonic: {
        name: 'Harmonic minor',
        steps: [2, 1, 2, 2, 1, 3, 1],
        chords: {
            i: {
                name: 'i',
                type: 'minor'
            },
            ii: {
                name: 'ii°',
                type: 'dim'
            },
            III: {
                name: 'IIIaug',
                type: 'aug'
            },
            iv: {
                name: 'iv',
                type: 'minor'
            },
            V: {
                name: 'V',
                type: 'major'
            },
            VI: {
                name: 'VI',
                type: 'major'
            },
            VII: {
                name: 'ViI',
                type: 'major'
            }
        }
    },
    minor_melodic: {
        name: 'Melodic minor',
        steps: [2, 1, 2, 2, 2, 2, 1],
        chords: {
            i: {
                name: 'i',
                type: 'minor'
            },
            ii: {
                name: 'ii',
                type: 'minor'
            },
            III: {
                name: 'IIIaug',
                type: 'aug'
            },
            IV: {
                name: 'IV',
                type: 'major'
            },
            V: {
                name: 'V',
                type: 'major'
            },
            vi: {
                name: 'vi°',
                type: 'dim'
            },
            vii: {
                name: 'iviii°',
                type: 'dim'
            }
        }
    },
    pentatonic: {
        name: 'Pentatonic',
        steps: [2, 2, 3, 2, 3]
    },
    dorian: {
        name: 'Dorian',
        steps: [2, 1, 2, 2, 1, 2, 2]
    }
};