<template>
  <div class="mf-colors">
    <div class="select-title">Цвет</div>
    <div class="colors-wrap">
      <div class="colors-item" v-for="(el, i) in colors"
           :key="i"
           :class="{'dark' : getShade(el.value)}">
        <input type="checkbox" name="color" :id="'color-' + i">
        <label :for="'color-' + i">
          <span class="colors-item__color" :style="{backgroundColor: el.value}"></span>
          <span class="colors-item__name">{{ el.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterColors",
  props: ["colors"],
  methods: {
    convertColor(color) {
      if (color.substring(0, 1) === '#') {
        color = color.substring(1);
      }

      let rgbColor = {};

      rgbColor.r = parseInt(color.substring(0, 2), 16);
      rgbColor.g = parseInt(color.substring(2, 4), 16);
      rgbColor.b = parseInt(color.substring(4), 16);

      return rgbColor;
    },
    getShade(color) {
      let rgb = this.convertColor(color);
      let hsp = Math.sqrt(0.205 * (rgb.r * rgb.r) + 0.587 * (rgb.g * rgb.g) + 0.114 * (rgb.b * rgb.b))

      return hsp <= 127.5;
    }
  }
}
</script>

<style scoped>

.mf-colors {
  margin-top: 28px;
  max-width: 77%;
}

.colors-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.colors-item {
  border: 1px solid #B7B7B7;
  padding: 16px;
  margin-bottom: 30px;
}

.colors-item:not(:last-child) {
  margin-right: 30px;
}

.colors-item__color {
  display: inline-block;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  margin-right: 7px;
  position: relative;
  font-size: 14px;
  color: #666666;
}

.colors-item__name {
  color: #666666;
  font-size: 14px;
}

.colors-item input[name=color] {
  display: none;
}

.colors-item input + label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.colors-item input:checked + label:before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 16px;
  height: 12px;
  z-index: 1;
  background: url("/images/instock/black-check.svg") 0 0 no-repeat;

}

.colors-item.dark input:checked + label:before {
  background: url("/images/instock/white-check.svg") 0 0 no-repeat;
}

</style>
