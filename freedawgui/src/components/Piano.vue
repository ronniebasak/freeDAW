<template>
    <div class="piano">
        <div class="octave" v-for="i in id" :key="i">
            <div class="majorkeys">
                <div class="pianokey c" data-note="c"  :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease" ></div>
                <div class="pianokey d" data-note="d"  :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease" ></div>
                <div class="pianokey e" data-note="e"  :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease" ></div>
                <div class="pianokey f" data-note="f"  :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease" ></div>
                <div class="pianokey g" data-note="g"  :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease" ></div>
                <div class="pianokey a" data-note="a"  :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease" ></div>
                <div class="pianokey b" data-note="b"  :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease" ></div>
            </div>

            <div class="minorkeys">
                <div class="pianominorkey c" data-note="c#" :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease"></div>
                <div class="pianominorkey d" data-note="d#" :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease"></div>
                <div class="pianominorkey f" data-note="f#" :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease"></div>
                <div class="pianominorkey g" data-note="g#" :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease"></div>
                <div class="pianominorkey a" data-note="a#" :data-octave="i" @mousedown="keyPress" @mouseup="keyRelease"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Piano',
    data: () => {
        return {
            id: [1,2]
        }
    },
    methods: {
        keyPress(ev){
            this.$emit('noteon', {note: ev.target.dataset.note, octave: ev.target.dataset.octave})
        },
        keyRelease(ev){
            this.$emit('noteoff', {note: ev.target.dataset.note, octave: ev.target.dataset.octave})
        }
    }
}
</script>


<style lang="scss" scoped>
.piano {
    width: 728px;
    height: 100px;
    border: 2px solid black;
    display: flex;

    .octave {
        display: flex;
        width: 364px;
        height: 100px;
        .majorkeys {
            display: flex;
            position: absolute;
            height: 100px;

            .pianokey {
                height: 100%;
                width: 50px;
                border: 1px solid blue;
                background: white;
                position: relative;
                z-index: 1;
            }
        }

        .minorkeys {
            display: flex;
            position: absolute;
            height: 100px;
            .pianominorkey {
                height: 70%;
                width: 35px;
                // border: 1px solid blue;
                background: black;
                position: relative;
                z-index: 2;
                margin-right: 1px;

                &.c {
                    left: 35px;
                }

                &.d {
                    left: 50px;
                }

                &.f {
                    left: 120px;
                }
                &.g {
                    left: 135px;
                }
                &.a  {
                    left: 150px;
                }
            }
        }
    }
}
</style>