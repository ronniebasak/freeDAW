class PitchDetector extends AudioWorkletProcessor {
  constructor(){
      super();
      this.loudness = 0
  }
  process (inputs, outputs, parameters) {
      for (var channel = 0; channel < outputs[0].length; channel++) {
          let inputData = inputs[0][channel];
          let outputData = outputs[0][channel];
          let loudness = 0;
          for(let sample=0; sample<inputData.length; sample++){
              loudness += 20 * Math.log(Math.abs(inputData[sample] )/ 1.0);
              outputData[sample] = inputData[sample]; // silence
          }
          loudness /= inputData.length;
          this.loudness = loudness;
          
          this.port.postMessage(this.loudness);
      }
      return true;
    }
  }
  
  
  registerProcessor('audioWorker', PitchDetector)
  