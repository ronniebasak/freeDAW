import yin from './yin.js'
import ringBuffer from './ringBuffer.js';
const yinp = yin();
var dataInBuf = [
  new Float32Array(2048),
  new Float32Array(2048)
]

class PitchDetector extends AudioWorkletProcessor {
    constructor(context){
        super();
        this._ringBuffer = new ringBuffer(2048, 2);
    }
    process (inputs, outputs, parameters) {
        this._ringBuffer.push(inputs[0]);
        this._ringBuffer.pull(dataInBuf);

        for(let channel of dataInBuf){
          console.log(yinp(channel, sampleRate));
        }

        for(let channel in outputs){
          for(let sample in inputs[0][channel]){
            outputs[0][channel][sample] = inputs[0][channel][sample];
          }
        }
        return true;
    }

}
  
registerProcessor('pitchDetectionProcessor', PitchDetector)
  



