const ml5 = require('./PitchDetector/ml5');
const AudioContext = window.AudioContext || window.webkitAudioContext;
AudioContext.sampleRate = 2048;
const audioContext = new AudioContext();
let isPlaying = false;
var analyzer;
const myBuffer = new Float64Array(AudioContext.sampleRate);
const myArray = new Uint8ClampedArray(AudioContext.sampleRate);
let pitchDetectionHandler = {};


const handleSuccess = function(stream) {
   pitchDetectionHandler = ml5.pitchDetection('./model/', audioContext, stream, handleProcess);
    // const source = audioContext.createMediaStreamSource(stream);
    // var oscillator = audioContext.createOscillator();

    // // oscillator.type = 'square';
    // oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // value in hertz
    // // oscillator.connect(audioCtx.destination);
    // oscillator.start();

    // const processor = audioContext.createScriptProcessor(2048, 1, 1);
    // // const compressor = audioContext.createDynamicsCompressor();
    // // oscillator.connect(audioContext.destination);
    // oscillator.connect(processor)
    // processor.connect(audioContext.destination)
    // // compressor.connect(audioContext.destination)
    // processor.onaudioprocess = handleProcess
}

function handleProcess(){
    pitchDetectionHandler.getPitch((err, frequency) => {
        if(frequency){
            console.log("FREQ",frequency);
        }
        handleProcess();
    })
}

// function handleProcess(e){
//     let inputBuffer = e.inputBuffer;
//     let outputBuffer = e.outputBuffer;
//     for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
//         var inputData = inputBuffer.getChannelData(channel);
//         var outputData = outputBuffer.getChannelData(channel);
    
//         // Loop through the 4096 samples
//         for (var sample = 0; sample < inputBuffer.length; sample++) {
//           // make output equal to the same as the input
//           outputData[sample] = 0;
//         }

//         for(var sample =0; sample < inputData.length; sample++){
//             // sample is also the n
//             myBuffer[sample] = 0
//             for(let j = sample; j<inputData.length; j++){
//                 myBuffer[sample] += inputData[sample]*inputData[j]
//             }
//         }

//         console.log(myBuffer)


//         for(var sample =1; sample < inputData.length -1; sample++){
//             myArray[sample] = myBuffer[sample] > 20 ? ( myBuffer[sample-1] < myBuffer[sample] && myBuffer[sample] > myBuffer[sample + 1] ? myBuffer[sample] : 0 ) : 0;
//         }
//         myArray[0] = 0
//         myArray[myArray.length - 1] = 0
//       }
//     }




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
    return analyzer;
}

export default {
    init: cool,
    analyzer: analiser
}

