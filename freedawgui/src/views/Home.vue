<template>
  <div class="home" @click="toneInit">
    <button @click="playTurkish">
      Play turkish
    </button>
    <Piano @noteon="notePressed" @noteoff="noteReleased"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Piano from '@/components/Piano';
import * as Tone from 'tone';
import {Midi} from '@tonejs/midi';
import turkish from '../assets/turkish.json'

export default {
  name: 'Home',
  data(){
    return {
      piano: undefined
    }
  },
  components: {
    Piano
  },
  methods: {
    notePressed(note){
      console.log("NOTE::: ", note.note, note.octave);
      this.piano.triggerAttack(`${note.note}${+note.octave+2}`, "8n")
    },
    noteReleased(note){
      console.log("NOTE::: ", note.note, note.octave);
      this.piano.triggerRelease()
    },

    playTurkish(){
      console.log(turkish.tracks[0])
      const now = Tone.now() + 0.5;
      const synths = [];
      turkish.tracks.forEach(track => {
      const synth = new Tone.PolySynth(Tone.AMSynth, 10, {
            envelope: {
								attack: 0.02,
								decay: 0.1,
								sustain: 0.3,
								release: 1
            }
        }).toDestination();

        synths.push(synth);

        track.notes.forEach(note => {
            synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
        })
      })
    },

    toneInit(){
      Tone.start();
    }
  },
  mounted(){
    console.log(Tone)
    this.piano = new Tone.Synth().toDestination()
  }
}
</script>
