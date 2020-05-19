let A = 440;
const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const oct4map = {}

for(let i=0; i<12; i++){
    oct4map[notes[i]] = A*(2**i);
}


/**
 * Calculate semitones from A
 */
function calculateSemitonesFromA(freq){
    let dist = notes.length*Math.log2(freq/A);
    return dist;
}

/**
 * Semis should be the nearest semitone
 * Cents should be positive for over, negative for under
 */
function getSemisAndCents(distance){
    let semis = Math.round(distance);
    let cents = distance - semis;
    cents = cents*100|0;
    return {semis, cents}
}

function getNoteFromSemis({semis, cents}){
    let note = semis<0 ? notes[notes.length - (-semis%notes.length)] : notes[semis % notes.length];
    let octave = 4+(semis/notes.length)|0;
    return {note, octave, cents};
}


function calculateNearestNote(freq){
    let dist = calculateSemitonesFromA(freq);
    let semcents = getSemisAndCents(dist);
    let note = getNoteFromSemis(semcents);
    return note
}

function setAFreq(val){
    A = val;
}

function findNearestNote(noteList){
    
}

export default {
    calculateNearestNote, setAFreq
}