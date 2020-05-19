const pitchDetection = require('./PitchDetector/ml5');
import CBuffer from './CircularBuffer';
const AudioContext = window.AudioContext || window.webkitAudioContext;
AudioContext.sampleRate = 512; // ~5ms quantization at 256
const audioContext = new AudioContext();
let isPlaying = false;
let pitchDetectionHandler = null;
let audioBuf = new CBuffer(32); // allocate enough memory to store frequency values
let mostRecent = 0.0; // float32
let bufLock = false;

let audioBufCtr = 0;
let threshold = -75; // dBFS
let loudness = 0;
var processor;








// console.log(ml5.tf.getBackend());

const handleSuccess =async function(stream) {
    const source = audioContext.createMediaStreamSource(stream);
    await audioContext.audioWorklet.addModule('/audioWorker.js')
    processor = new AudioWorkletNode(audioContext, 'audioWorker')
    // source.connect(audioContext.destination)
    source.connect(processor);
    processor.connect(audioContext.destination);
   pitchDetectionHandler = pitchDetection.default('./model/', audioContext, stream, handleProcess);

    processor.port.onmessage = function(dBFS){
        loudness = dBFS.data;
    }

}

function handleProcess(){
    if(pitchDetectionHandler){
        pitchDetectionHandler.getPitch((err, frequency) => {
            if(frequency){
                bufLock = true;
                console.log("FREQ",frequency);
                audioBuf.push(frequency); // write to the buffer
                mostRecent = frequency;
                bufLock = false;
            }
        })
    }
}


function cool(){
    audioContext.resume();
    if(!isPlaying){
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(handleSuccess);
        isPlaying = true;
    } else {
        audioContext.suspend();
    }
}

function analiser(){
    // make a exponential moving weighted average 
    handleProcess();
    let freq = 0.0;
    let factor = 0;
    // for(let wt = audioBufCtr; wt>0; wt--){
    //     factor = 2**(wt - audioBufCtr -1);
    //     freq += audioBuf[wt]*factor;
    // }
    for(let i=Math.max(0, audioBuf.length-audioBuf.alloc); i<audioBuf.length; i++){
        freq += audioBuf.get(i);
    }
    
    // freq += audioBuf[0]*factor; // keep the last two values same in order to sum the average to 1
    freq /= Math.min(audioBuf.length, audioBuf.alloc); // keep the last two values same in order to sum the average to 1
    audioBufCtr ; // reset the pointer
    return freq ; // returns the frequency at this point of time
}

function getloudNess(){
    return loudness;
}

function setLoudnessThreshold(val){
    threshold = val;
}

export default {
    init: cool,
    analyzer: analiser,
    setLoudnessThreshold,
    getloudNess
}

