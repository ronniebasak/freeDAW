<template>
    <div class="track">
    </div>
</template>

<script>
import * as Tone from 'tone';
import Ticker from '../event-bus/eventBus';

let myTransport = Tone.Transport;

export default {
    props: ["notes"],
    data(){
    },
    methods: {
    },

    computed:{
    },
    created(){
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