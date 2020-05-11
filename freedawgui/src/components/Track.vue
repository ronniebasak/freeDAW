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
import {Timeline} from 'tone';

export default {
    props: ["notes"],
    data(){
        return {
            synths: ["Synth", "AMSynth"],
            pickedSynth: "Synth",
            timeline: new Timeline()
        }
    },
    created(){
        console.log(this.notes)
        for(let note of this.notes){
            this.timeline.add(note)
        }
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