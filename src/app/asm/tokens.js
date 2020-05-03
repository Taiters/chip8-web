import instructions from './instructions'; 


const TokenTypes = {
    INSTRUCTION: 'INSTRUCTION',
    SECTION_DEFINITION: 'SECTION_DEFINITION',
    SECTION_IDENTIFIER: 'SECTION_IDENTIFIER',
    REGISTER: 'REGISTER',
    HEX: 'HEX',
    BIN: 'BIN',
    DEC: 'DEC',
    DELAY_TIMER: 'DELAY_TIMER',
    SOUND_TIMER: 'SOUND_TIMER',
    K: 'K',
    I: 'I',
    F: 'F',
    B: 'B',
    COMMA: 'COMMA',
    WS: 'WS',
    EOL: 'EOL',
    EOF: 'EOF',
    COMMENT: 'COMMENT',
};

const Tokens = [
    {
        type: TokenTypes.INSTRUCTION,
        match: new RegExp(`(${Object.values(instructions).join('|')})`, 'i'),
        value: (match) => instructions[match.toUpperCase()],
    },
    {
        type: TokenTypes.SECTION_DEFINITION,
        match: /:[A-Z]+/i,
        value: (match) => match.slice(1),
    },
    {
        type: TokenTypes.SECTION_IDENTIFIER,
        match: /\$[A-Z]+/i,
        value: (match) => match.slice(1),
    },
    {
        type: TokenTypes.REGISTER,
        match: /v[0-9A-F]/i,
        value: (match) => parseInt(match.slice(1), 16),
    },
    {
        type: TokenTypes.HEX,
        match: /0x[0-9A-F]+/i,
        value: (match) => parseInt(match.slice(2), 16),
    },
    {
        type: TokenTypes.BIN,
        match: /0b[0-9A-F]+/i,
        value: (match) => parseInt(match.slice(2), 2),
    },
    {
        type: TokenTypes.DEC,
        match: /[0-9]+/i,
        value: (match) => parseInt(match),
    },
    {
        type: TokenTypes.DELAY_TIMER,
        match: /DT/i,
    },
    {
        type: TokenTypes.SOUND_TIMER,
        match: /ST/i,
    },
    {
        type: TokenTypes.K,
        match: /K/i,
    },
    {
        type: TokenTypes.I,
        match: /I/i,
    },
    {
        type: TokenTypes.F,
        match: /F/i,
    },
    {
        type: TokenTypes.B,
        match: /B/i,
    },
    {
        type: TokenTypes.COMMA,
        match: /,/,
    },
    {
        type: TokenTypes.WS,
        match: /[\t ]+/,
    },
    {
        type: TokenTypes.EOL,
        match: /(?:\r?\n)/,
    },
    {
        type: TokenTypes.COMMENT,
        match: /\/\/.*/,
        value: (match) => match.slice(2).trim(),
    },
];

const tokenLookup = Tokens.reduce((t, current) => {
    t[current.type] = current;
    return t;
}, {});

const getToken = (type) => tokenLookup[type];


export {
    TokenTypes,
    Tokens,
    getToken,
};