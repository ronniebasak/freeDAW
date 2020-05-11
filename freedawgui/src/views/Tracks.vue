<template>
  <div class="home" @click="toneInit" style="text-align: left">
    <template v-for="(track,i) in tracks">
      <TimeTrack :key="'track_'+i" :notes="track.notes"/>
    </template>

    <button @click="startPlaying()">Play</button>
    <button @click="pausePlaying()">Pause</button>
    <button @click="stopPlaying()">Stop</button>
    <div>
      Current time: {{timeTicks}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Piano from '@/components/Piano';
import * as Tone from 'tone';
import {Midi} from '@tonejs/midi';
import TimeTrack from '../components/Track'
import turkish from '../assets/turkish.json'

let myTransport = Tone.Transport;

export default {
  name: 'Home',
  data(){
    return {
      tracks: turkish.tracks,
      timeTicks: 0,
      toneStarted: false
    }
  },
  components: {
    TimeTrack
  },
  methods: {
    playTurkish(){
    },

    toneInit(){
      Tone.start();
    },

    handleTicks(time){
      this.timeTicks+=1
    },

    startPlaying(){
      if(!this.toneStarted){
        Tone.start();
        this.toneStarted = true;
      }
      myTransport.start();
      myTransport.scheduleRepeat(this.handleTicks, '1i')
    },

    pausePlaying(){
      myTransport.pause()
    },
    stopPlaying(){
      myTransport.stop();
      this.$nextTick(() =>{ 
        this.timeTicks = 0;
      })
    }
  },
  mounted(){
    console.log(Tone)
    this.piano = new Tone.Synth().toDestination()
  }
}
</script>
