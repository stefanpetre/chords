const heightBase = 100;
export default {
    1: {
        name: 'whole',
        height: heightBase,
        tone: '1n',
        midi: 64
    },
    2: {
        name: 'half',
        height: heightBase / 2,
        tone: '2n',
        midi:36
    },
    4: {
        name: 'quarter',
        height: heightBase / 4,
        tone: '4n',
        midi: 24
    },
    8: {
        name: 'eighth',
        height: heightBase / 8,
        tone: '8n',
        midi: 12
    },
    128: {
        name: '1 measure',
        height: heightBase / 8,
        tone: '1m',
        midi: 128
    }
};