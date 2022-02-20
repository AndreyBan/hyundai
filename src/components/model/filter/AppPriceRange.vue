<template>
  <div class="price-range" ref="range">
    <div class="price-input">
      <input type="number" class="input-min" v-model="minValue" @change="priceInput($event)">
      <input type="number" class="input-max" v-model="maxValue" @change="priceInput($event)">
    </div>
    <div class="slider">
      <div class="progress" ref="progress">
        <div class="range-btn" ></div>
        <div class="range-btn"></div>
      </div>
    </div>
    <div class="range-input">
      <input type="range" class="range-min" :min="min" :max="max" v-model="minValue" :step="step"
             @input="rangeInput($event)">
      <input type="range" class="range-max" :min="min" :max="max" v-model="maxValue" :step="step"
             @input="rangeInput($event)">
    </div>
  </div>
</template>

<script>


export default {
  name: "AppPriceRange",
  data() {
    return {
      min: 131000,
      max: 12300000,
      minValue: 500000,
      maxValue: 5000000,
      step: 1000000,
      priceGap: 10000,
    }
  },
  methods: {
    rangeInput(e) {
      let priceGap = this.priceGap,
          progress = this.$refs.progress,
          minVal = Number(this.minValue),
          maxVal = Number(this.maxValue);

      if ((maxVal - minVal) < priceGap) {
        if (e.target.className === "range-min") {
          this.minValue = maxVal - priceGap
        } else {
          this.maxValue = minVal + priceGap;
        }
      } else {
        progress.style.left = this.posLeft;
        progress.style.right = this.posRight;
      }
    },

    priceInput(e) {
      let max = this.max,
          priceGap = this.priceGap,
          classInput = e.target.className,
          progress = this.$refs.progress,
          minPrice = Number(this.minValue),
          maxPrice = Number(this.maxValue);

      if ((maxPrice - minPrice >= priceGap) && maxPrice <= max) {
        if (classInput === "input-min") {
          progress.style.left = this.posLeft;
        } else {
          progress.style.right = this.posRight;
        }
      } else if (maxPrice - minPrice < priceGap) {

        if (classInput === "input-min") {
          this.minValue = maxPrice - priceGap;
          progress.style.left = this.posLeft;
        } else {
          this.maxValue = minPrice + priceGap;
          progress.style.right = this.posRight;
        }
      }

      this.checkRange(minPrice, maxPrice, progress);

    },

    checkRange(minPrice, maxPrice, progress){
      if (minPrice < this.min) {
        this.minValue = this.min;
        progress.style.left = this.posLeft;
      }
      if (maxPrice > this.max) {
        this.maxValue = this.max;
        progress.style.right = this.posRight;
      }
    },
  },
  computed: {
    posLeft() {
      let minVal = Number(this.minValue),
          max = Number(this.max),
          min = Number(this.min),
          range = max - min,
          rangeWidth = this.$refs.range.offsetWidth,
          differentMin = minVal - min,
          res = 0;

        res = ((differentMin / range) * 100) - (2400 * differentMin) / (range * rangeWidth);
      // if ((range / this.step) > rangeWidth){
      // } else {
      //   res = ((differentMin / range) * 100);
      // }
      return res + "%";
    },
    posRight() {
      let maxVal = Number(this.maxValue),
          max = Number(this.max),
          min = Number(this.min),
          range = max - min,
          rangeWidth = this.$refs.range.offsetWidth,
          differentMin = max - maxVal,
          res = 0;
        res = ((differentMin / range) * 100) - (2400 * differentMin) / (range * rangeWidth);
      // if ((range / this.step) > rangeWidth){
      // } else {
      //   res = ((differentMin / range) * 100);
      // }
      return res + "%";

      // return ((max - maxVal) / (max - min)) * 100 + "%";
    }
  },
  mounted() {
    let progress = this.$refs.progress;

    progress.style.left = this.posLeft;
    progress.style.right = this.posRight;
  }
}
</script>

<style scoped>
.price-range {
  max-width: 391px;
  margin-bottom: 40px;
  position: relative;
  z-index: 3;
}

.price-input {
  width: 100%;
  display: flex;
  margin: 30px 0 0;
}

.price-input input {
  width: 50%;
  height: 42px;
  background: transparent;
  border: 1px solid #B7B7B7;
  font-size: 16px;
  padding: 0 16px;
  outline: none;

}
.price-input input:nth-child(1){
  border-right: none;
}
.price-input input:nth-child(2){
  border-left: none;
}


input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.price-input .separator {
  width: 130px;
  display: flex;
  font-size: 19px;
  align-items: center;
  justify-content: center;
}

.slider {
  height: 1px;
  position: relative;
  background: #B7B7B7;
  z-index: 2;
  margin-top: -1px;
}

.slider .progress {
  height: 2px;
  left: 25%;
  right: 25%;
  position: absolute;
  border-radius: 5px;
  background: #003469;
}

.range-input {
  position: relative;
}

.range-input input {
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  z-index: 5;
  /*opacity: 0;*/
}

.range-btn {
  /*pointer-events: none;*/
  position: absolute;
  appearance: none;
  outline: none;
  /*cursor: pointer;*/
  display: block;
  z-index: 2;
  border-radius: 50%;
  margin-top: -9px;
  width: 24px;
  height: 24px;
  border: none;
  background: #ffffff;
  touch-action: pan-x;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  /*opacity: 0;*/
}

.range-btn:nth-child(1) {
  left: 0;
}

.range-btn:nth-child(2) {
  right: 0;
}
.input-max{
  text-align: right;
}
.range-btn:before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #003469;
  border-radius: 50%;
  left: 6px;
  top: 6px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  appearance: none;
  outline: none;
  cursor: pointer;
  display: block;
  z-index: 5;
  width: 24px;
  height: 24px;
  background: #0C4F94;
  opacity: .5;
}

input[type="range"]::-moz-range-thumb {
  pointer-events: auto;
  appearance: none;
  -moz-appearance: none;
  outline: none;
  cursor: pointer;
  display: block;
  z-index: 5;
  width: 24px;
  height: 24px;
  background: #0C4F94;
  opacity: .5;

}
</style>
