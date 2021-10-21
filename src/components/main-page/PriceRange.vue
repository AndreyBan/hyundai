<template>
  <div class="range-slider-wrap">
    <div class="range-slider__title">Цена</div>
    <div class="track-container">
      <input type="text" class="range-value min" @change="setTrackButtons" v-model="minValue">
      <input type="text" class="range-value max" @change="setTrackButtons" v-model="maxValue">
      <div class="track" ref="_vpcTrack"></div>
      <div class="track-highlight" ref="trackHighlight"></div>
      <button class="track-btn track1" ref="track1"></button>
      <button class="track-btn track2" ref="track2"></button>
    </div>
  </div>
</template>

<script>

export default {
  name: "PriceRange",

  props: {
    trackHeight: {
      type: Number,
      deafult: 1
    }
  },

  data: () => ({
      min: 0,
      max: 100000,
      minValue: 1000,
      maxValue: 100000,
      step: 1000,
      totalSteps: 0,
      percentPerStep: 1,
      trackWidth: null,
      isDragging: false,
      pos: {
        curTrack: null
      }

  }),
  methods: {
    moveTrack(track, ev) {

      let percentInPx = this.getPercentInPx();

      let trackX = Math.round(this.$refs._vpcTrack.getBoundingClientRect().left);
      let clientX = ev.clientX;
      let moveDiff = clientX - trackX;

      let moveInPct = moveDiff / percentInPx
      // console.log(moveInPct)

      if (moveInPct < 1 || moveInPct > 100) return;
      let value = (Math.round(moveInPct / this.percentPerStep) * this.step) + this.min;
      if (track === 'track1') {
        if (value >= (this.maxValue - this.step)) return;
        this.minValue = value;
      }

      if (track === 'track2') {
        if (value <= (this.minValue + this.step)) return;
        this.maxValue = value;
      }

      this.$refs[track].style.left = moveInPct + '%';
      this.setTrackHightlight()

    },
    mousedown(ev, track) {

      if (this.isDragging) return;
      this.isDragging = true;
      this.pos.curTrack = track;
    },

    touchstart(ev, track) {
      this.mousedown(ev, track)
    },

    mouseup(ev, track) {
      if (!this.isDragging) return;
      this.isDragging = false
    },

    touchend(ev, track) {
      this.mouseup(ev, track)
    },

    mousemove(ev, track) {
      if (!this.isDragging) return;
      this.moveTrack(track, ev)
    },

    touchmove(ev, track) {
      this.mousemove(ev.changedTouches[0], track)
    },

    valueToPercent(value) {
      return ((value - this.min) / this.step) * this.percentPerStep
    },

    setTrackHightlight() {
      this.$refs.trackHighlight.style.left = this.valueToPercent(this.minValue) + '%'
      this.$refs.trackHighlight.style.width = (this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue)) + '%'
    },

    getPercentInPx() {
      let trackWidth = this.$refs._vpcTrack.offsetWidth;
      let oneStepInPx = trackWidth / this.totalSteps;
      // 1 percent in px
      return oneStepInPx / this.percentPerStep;
    },

    setClickMove(ev) {
      let track1Left = this.$refs.track1.getBoundingClientRect().left;
      let track2Left = this.$refs.track2.getBoundingClientRect().left;
      // console.log('track1Left', track1Left)
      if (ev.clientX < track1Left) {
        this.moveTrack('track1', ev)
      } else if ((ev.clientX - track1Left) < (track2Left - ev.clientX)) {
        this.moveTrack('track1', ev)
      } else {
        this.moveTrack('track2', ev)
      }
    },
    setTrackButtons(){
      if (this.maxValue > this.max || this.minValue < this.min){
        this.maxValue = this.max;
        this.minValue = this.min;

        return false;
      }
      document.querySelector('.track1').style.left = this.valueToPercent(this.minValue) + '%'
      document.querySelector('.track2').style.left = this.valueToPercent(this.maxValue) + '%'
      this.setTrackHightlight()
    }
  },

  mounted() {
    // calc per step value
    this.totalSteps = (this.max - this.min) / this.step;

    // percent the track button to be moved on each step
    this.percentPerStep = 100 / this.totalSteps;
    // console.log('percentPerStep', this.percentPerStep)

    this.setTrackButtons()

    var self = this;

    ['mouseup', 'mousemove'].forEach(type => {
      document.body.addEventListener(type, (ev) => {
        // ev.preventDefault();
        if (self.isDragging && self.pos.curTrack) {
          self[type](ev, self.pos.curTrack)
        }
      })
    });

    ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach(type => {
      document.querySelector('.track1').addEventListener(type, (ev) => {
        ev.stopPropagation();
        self[type](ev, 'track1')
      })

      document.querySelector('.track2').addEventListener(type, (ev) => {
        ev.stopPropagation();
        self[type](ev, 'track2')
      })
    })

    // on track clik
    // determine direction based on click proximity
    // determine percent to move based on track.clientX - click.clientX
    document.querySelector('.track').addEventListener('click', function (ev) {
      ev.stopPropagation();
      self.setClickMove(ev)

    })

    document.querySelector('.track-highlight').addEventListener('click', function (ev) {
      ev.stopPropagation();
      self.setClickMove(ev)

    })
  }
};
</script>

<style>
.range-value {
  position: absolute;
  bottom: 12px;
  border: none;
  font-size: 16px;
}
.range-value:focus,
.range-value:active,
.range-value:focus-visible{
  border: none;
  outline: none;
}
.range-slider__title{
  margin-bottom: 14px;
}
.range-value.min {
  left: 17px;
}

.range-value.max {
  right: 17px;
  text-align: right;
}
.range-slider-wrap{
  margin-top: -28px;
  max-width: 391px;
  width: 100%;
}
.track-container {
  width: 100%;
  position: relative;
  cursor: pointer;
  border: 1px solid #B7B7B7;
  height: 42px;

}

.track,
.track-highlight {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -1px;
}


.track-highlight {
  background-color: #003469;
  z-index: 2;
}

.track-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  cursor: pointer;
  display: block;
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  bottom: -10px;
  border: none;
  background-color: #ffffff;
  -ms-touch-action: pan-x;
  touch-action: pan-x;
  -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}
.track1{
  margin-left: -6px;
}
.track2{
  margin-left: -22px;
}
.track-btn:before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #003469;
  border-radius: 50%;
  left: 6px;
  top: 6px;
}
@media (max-width: 991px) {
  .range-value{
    width: 50%;
  }
  .range-slider-wrap{
    margin-top: 12px;
    max-width: 100%;
  }
}
</style>
