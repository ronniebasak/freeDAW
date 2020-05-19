<template>
  <div class="home">
    <div class="leftpanel">
      <div class="volumeknob lg">
        <div class="bachha" :style="{
          height: `${300-Math.abs(decibels)}px`,
          'margin-top': `${Math.abs(decibels)}px`
        }"></div>
        <div class="meter"> {{Math.round(decibels*100, 2)/100}} <br/> dBFS </div>
        <div class="meterKaBhai" :style="{top: `${60+Math.abs(thresh)}px`}"></div>
      </div> 
      <div style="color: white; margin-top: 15px" class="lg">
        Adjust Threshold for Detection <br>
        <input type="range" min="-300" max="0" v-model="thresh">
      </div>

    </div>
    <div class="centerpanel">
      <canvas
        id="tuner"
        @click="coolcul"
        width="640"
        height="480"
        ref="tuner"
      ></canvas>
      <div style="color: white; font-size: 25pt">
        {{Math.round(freq*100)/100}} Hz
      </div>
      <div style="color: white; font-size: 20pt">
        {{note.note}}{{note.octave}}
      </div>

      <div v-if="!init" style="color: #00adff; font-size: 25pt">Click/Tap on the dial to begin</div>
    </div>
    <div class="rightpanel">
      
      <div class="volumeknob sm">
        <div class="bachha" :style="{
          width: `${360 - Math.abs(decibels)}px`,
          'margin-right': `${Math.abs(decibels)}px`
        }"></div>
        <div class="meterKaBhai" :style="{left: `${360 - Math.abs(thresh)*1.2}px`}"></div>
        <div class="meter"> {{Math.round(decibels*100, 2)/100}} <br/> dBFS </div>
      </div> 

      <div style="color: white; margin-top: 15px" class="sm">
        Adjust Threshold for Detection <br>
        <input type="range" min="-300" max="0" v-model="thresh">
      </div>

<!-- 
      <div style="height: 360px; width: 400px; padding: 20px">
      <select v-model="selectedTuning" style="width: 100%">
        <option v-for="(tuning,i) in tunings" :key="'tuning'+i" :value="tuning.label"> {{tuning.label}} </option>
      </select>
      </div> -->
    </div>
  </div>
</template>

<script>
import Audio from "../modules/Audio";
import AudioLib from "../modules/Audio.lib";

function rotate(x, y, ox=0,oy=0, angle){
  x-=ox, y-=oy;
  let c = Math.cos(angle), s = Math.sin(angle);
  return [x*c - y*s +ox, x*s+y*c+oy];
}


export default {
  name: "Home",
  data() {
    return {
      dataArray: undefined,
      freq: 0,
      note: {
        note: "A",
        octave: "4",
        cents: 0
      },
      canvas: undefined,
      ctx: undefined,
      decibels: 0,
      init: false,
      thresh: -75,
      selectedTuning: "free",
      tunings: [
        {
          label: "free",
          modes: []
        },
        {
          label: "Guitar Standard",
          modes: ["E2", "A2", "D3", "G3", "B3", "E4"]
        }
      ]
    };
  },
  components: {},
  methods: {
    coolcul() {
      this.init = !this.init
      Audio.init();
      this.updater();
    },

    drawDial(){
      // Create gradient
      let canvas = this.canvas;
      let ctx = this.ctx;
      var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.3, "rgba(255,100,100,0.2)");
      grd.addColorStop(0.5, `rgba(100,${155+this.note.cents},100,0.7)`)
      grd.addColorStop(0.7, "rgba(255,100,100,0.2)");
      grd.addColorStop(1, "transparent");0
      ctx.strokeStyle = grd;
      ctx.lineWidth = 40;
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height-50, 250, Math.PI,0);
      ctx.stroke();
    },

    drawHand(){
      let canvas = this.canvas;
      let ctx = this.ctx;
      
      let pivotX = canvas.width/2
      let pivotY = canvas.height-50;

      var grd = ctx.createRadialGradient(pivotX, pivotY, 0, pivotX, pivotY, 200)
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.3, "transparent")
      grd.addColorStop(1, "white");
      ctx.strokeStyle = grd;


    let rotatePoint = rotatePoint || {x:canvas.width/2,y:canvas.height-50};
     ctx.fillStyle = grd;
      ctx.beginPath();// ctx.arc(pivotX, pivotY, 20, 0, 2*Math.PI);
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(...rotate(pivotX+20, pivotY, pivotX, pivotY, this.handAngle));
      ctx.lineTo(...rotate(pivotX+12, pivotY-200, pivotX, pivotY, this.handAngle));
      ctx.lineTo(...rotate(pivotX-12, pivotY-200, pivotX, pivotY, this.handAngle));
      ctx.lineTo(...rotate(pivotX-20, pivotY, pivotX, pivotY, this.handAngle));
      ctx.closePath();
      ctx.fill();
    },

    updater() {
      this.freq = Audio.analyzer();
      this.decibels = Audio.getloudNess();
      // console.log("****F ****", this.freq);
      this.note = AudioLib.calculateNearestNote(this.freq);
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)

      this.drawHand();
      this.drawDial();
      requestAnimationFrame(this.updater);
    }
  },
  computed:{
    handAngle(){
      return (this.note.cents/100)*Math.PI
    }
  },
  watch: {
    thresh(val){
      Audio.setLoudnessThreshold(val);
    }
  },
  mounted(){
    this.canvas = this.$refs.tuner;
    this.ctx = this.canvas.getContext("2d")
    this.updater();
  }
};
</script>

<style lang="scss" scoped>
.volumeknob {
  display: inline-block;
  text-align: left; flex-direction: column; width: 100px; height: 360px; background: rgba(255, 255, 255, 0.1);

  .bachha  {
    background: rgba(255, 255, 255, 0.2); margin: 5px;
    height: 100%;
  }

  .meter {
    height: 30px; color: white; font-size: 12px; text-align: center; font-weight: bold
  }

  .meterKaBhai {
    height: 5px; width: 100px; background: white; position: absolute;
  }
}

@media screen and (min-width: 480px) {
  .sm { display: none;}

   .home {
   display: flex;
   flex-direction: row;
   justify-content: space-around;

   .leftpanel, .rightpanel {
     width: 100%;
   };

   .leftpanel, .rightpanel {
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
   }
}
}

@media screen and (max-width: 479px) {
  
canvas {
  max-width: 100%;
}


  .lg {display: none;}
  .volumeknob {
    width: 360px;
    height: 100px;
    flex-direction: row;

    .bachha {
      margin: 0px;
    }

    
  .meter {
    width: 30px; color: white; font-size: 12px; text-align: center; font-weight: bold;
    transform: translate(2em, -13em);
  }

  .meterKaBhai {
    width: 5px; height: 100px; background: white; position: relative;
    top: -100%;
  }

  }
     .home {
   display: flex;
   flex-direction: column;
   justify-content: space-around;

   .leftpanel, .rightpanel {
     width: 100%;
   };

   .leftpanel, .rightpanel {
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
   }
}
}

</style>