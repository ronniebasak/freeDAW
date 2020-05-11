<template>
    <div class="track">
        <div class="controller">
            Select Synth 
            <select v-model="pickedSynth">
                <option v-for="synth in synths" :key="'synth_'+synth">{{synth}}</option>
            </select>
        </div>
        <div class="timeline">
        </div>
    </div>
</template>

<script>
import * as Tone from 'tone';
import Ticker from '../event-bus/eventBus';

let myTransport = Tone.Transport;

export default {
    props: ["notes"],
    data(){
        return {
            synths: ["Synth", "AMSynth"],
            pickedSynth: "Synth",
            polyphony: 10,
            timeline: undefined,
            nI: 0,
        }
    },
    methods: {
        sync(ticks){
        }
    },

    computed:{
        currentSynth(){
            switch(this.pickedSynth){
                case 'Synth':
                    return new Tone.PolySynth(Tone.Synth, this.polyphony).toDestination();
                    break;
                case 'AMSynth':
                    return new Tone.PolySynth(Tone.AMSynth, this.polyphony).toDestination();
                    break;
                default:
                    return undefined;
            }
        },

        playNote(time){
            let note = this.notes[this.nI];
            this.nI++;
            console.log(note);
            this.currentSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
        }
    },
    created(){
        console.log(this.notes)
        let self = this;
        for(let note of this.notes){
            Tone.Transport.schedule((time) => {
                self.currentSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
            }, note.time);
        }

        Ticker.$on('TICK', this.sync)
    }
}
</script>

<style lang="scss" scoped>
.track {
    background: green;
    width: 100%;
    margin-bottom: 15px;
    height: 100px;
    display: flex;

    .controller {
        width: 100px;
        height: 100%;
        background: gainsboro;
    }

    .timeline {
        height: 100%;
        width: 100%;
        background: pink;
    }

}
</style>