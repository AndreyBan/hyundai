<template>
  <section class="model-filter">
    <div class="mf__title">Выбрать автомобиль</div>

    <div class="mf-selects">
      <div class="select-wrap">
        <v-select placeholder="Не выбрана">
          <template #header>
            <div class="select-title">Комплектация</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
      <div class="select-wrap">
        <v-select placeholder="Не выбран">
          <template #header>
            <div class="select-title">Объем двигателя</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
      <div class="select-wrap">
        <v-select placeholder="Не выбран">
          <template #header>
            <div class="select-title">Тип КПП</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
    </div>
    <div class="mf-colors">
      <div class="select-title">Цвет</div>
      <div class="colors-wrap">
        <div class="colors-item" :class="{'dark' : getShade('#000000')}">
          <input type="checkbox" name="color" id="color-1">
          <label for="color-1">
            <span class="colors-item__color" style="background-color: #000000"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
        <div class="colors-item" :class="{'dark' : getShade('#d1ff06')}">
          <input type="checkbox" name="color" id="color-2">
          <label for="color-2">
            <span class="colors-item__color" style="background-color: #d1ff06"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
        <div class="colors-item" :class="{'dark' : getShade('#000000')}">
          <input type="checkbox" name="color" id="color-1">
          <label for="color-1">
            <span class="colors-item__color" style="background-color: #000000"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
        <div class="colors-item" :class="{'dark' : getShade('#d1ff06')}">
          <input type="checkbox" name="color" id="color-2">
          <label for="color-2">
            <span class="colors-item__color" style="background-color: #d1ff06"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
        <div class="colors-item" :class="{'dark' : getShade('#000000')}">
          <input type="checkbox" name="color" id="color-1">
          <label for="color-1">
            <span class="colors-item__color" style="background-color: #000000"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
        <div class="colors-item" :class="{'dark' : getShade('#d1ff06')}">
          <input type="checkbox" name="color" id="color-2">
          <label for="color-2">
            <span class="colors-item__color" style="background-color: #d1ff06"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
        <div class="colors-item" :class="{'dark' : getShade('#000000')}">
          <input type="checkbox" name="color" id="color-1">
          <label for="color-1">
            <span class="colors-item__color" style="background-color: #000000"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
        <div class="colors-item" :class="{'dark' : getShade('#d1ff06')}">
          <input type="checkbox" name="color" id="color-2">
          <label for="color-2">
            <span class="colors-item__color" style="background-color: #d1ff06"></span>
            <span class="colors-item__name">Серый</span>
          </label>
        </div>
      </div>
    </div>

    <div class="mf-bottom">
      <div class="block-left">
        <div class="extra-options__toggle" :class="{'open': extraOptions}" @click="extraOptions = !extraOptions">Дополниетльные параметры</div>
        <div class="extra-options-content">
          <div class="extra-options-fields">
            <div class="block-years">
              <div class="extra-options__title">Год выпуска</div>
              <div class="check-wrap">
                <div class="check-group">
                  <input type="checkbox" name="year" id="year-1">
                  <label for="year-1">2020</label>
                </div>
                <div class="check-group">
                  <input type="checkbox" name="year" id="year-2">
                  <label for="year-2">2021</label>
                </div>
              </div>
            </div>
            <div class="select-wrap">
              <v-select placeholder="Не выбран">
                <template #header>
                  <div class="select-title">Мощность двигателя</div>
                </template>
                <template #no-options>
                  Ничего не найдено
                </template>
              </v-select>
            </div>
            <div class="select-wrap">
              <v-select placeholder="Не выбран">
                <template #header>
                  <div class="select-title">Тип привода</div>
                </template>
                <template #no-options>
                  Ничего не найдено
                </template>
              </v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="block-right">
        <a href="#" class="btn btn--blue-dark">найдено 10 авто</a>
        <div class="btn btn--blue-dark btn-icon btn-icon-reset">сбросить фильтр</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ModelFilter",
  data() {
    return {
      extraOptions: false
    }
  },
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
<style>

.btn.btn--blue-dark {
  background-color: #003469;
}

.btn--blue-dark:hover {
  background-color: #0C4F94;
}
.model-filter .vs--searchable .vs__dropdown-toggle {
  background-color: transparent;
}

.model-filter .vs__dropdown-menu {
  background-color: transparent;
}

.model-filter .vs__actions:before {
  content: "";
  position: absolute;
  width: 9px;
  height: 5px;
  right: 16px;
  background: url("/images/instock/select-arrow.svg") 50% 50% no-repeat;
  background-size: 9px;
  -webkit-transition-duration: .35s;
  -o-transition-duration: .35s;
  transition-duration: .35s;
}

.model-filter .v-select {
  width: 100%;
}

.model-filter .select-wrap {
  width: 100%;
  max-width: 229px;
}

</style>

<style scoped>

.btn.btn-icon{
  padding-left: 32px;
  position: relative;
}
.btn-icon-reset:before{
  content: '';
  position: absolute;
  background: url("/images/instock/reset-icon.svg") 0 0 no-repeat;
  left: 29px;
  top: 20px;
  width: 15px;
  height: 18px;
  background-size: 15px;
}
.extra-options-content{
  display: none;
}
.extra-options__toggle.open + .extra-options-content{
  display: block;
}
.model-filter {
  background-color: #EBEBEB;
  padding: 28px 100px 56px;
}

.mf__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 24px;
}

.mf-selects {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  max-width: 751px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.select-title {
  font-size: 14px;
  margin-bottom: 14px;
  color: #000000;
}

.extra-options__title {
  font-size: 14px;
  margin-bottom: 16px;
  color: #666666;
}

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

.extra-options-fields {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
}

.check-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.block-years {
  width: 229px;
}

.extra-options__toggle {
  color: #003469;
  margin-bottom: 30px;
  position: relative;
  font-weight: 500;
  padding-right: 16px;
  line-height: 1.17;
  display: inline-block;
  cursor: pointer;
}

.mf-bottom {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.extra-options__toggle:before {
  content: '';
  position: absolute;
  background: url("/images/instock/arrow-down.svg") 0 0 no-repeat;
  width: 9px;
  height: 5px;
  background-size: 9px;
  right: 0;
  top: 7px;
  -webkit-transition-duration: .2s;
  -o-transition-duration: .2s;
  transition-duration: .2s;
}
.extra-options__toggle.open:before{
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.check-group:not(:last-child) {
  margin-right: 20px;
}

.check-group input {
  display: none;
}

.check-group input + label {
  display: inline;
  position: relative;
  padding-left: 28px;
  padding-top: 2px;
  cursor: pointer;
}

.check-group input + label:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #B7B4B4;
  left: 0;
  top: 0;
}

.check-group input:checked + label:after {
  content: '';
  position: absolute;
  width: 16px;
  height: 12px;
  background: url("/images/instock/blue-check.svg") 0 0 no-repeat;
  left: 3px;
  top: 4px;
}

.block-left {
  max-width: 751px;
  width: 100%;
  padding-bottom: 5px;
}

.btn {
  display: block;
  padding: 17px 0;
  width: 229px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  border: none;
  -ms-grid-column-align: end;
  justify-self: end;
  border-radius: 0;
  font-size: 16px;
  text-decoration: none;
}

.btn:not(:last-child) {
  margin-right: 32px;
}

.block-right {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-item-align: end;
  -ms-grid-row-align: end;
  align-self: end;
  margin-left: 65px;
}

.model-filter {
  position: relative;
  background: url("/images/instock/filter-bg.jpg") 0 0 no-repeat;
  background-size: cover;
}

.model-filter:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  background: url("/images/instock/filter-car-img.png") 50% 50% no-repeat;
  width: 604px;
  height: 260px;
}

@media (max-width: 1560px) {
  .model-filter:after {
    top: 100px;
    background: url('/images/instock/filter-car-img.png') 50% 50% no-repeat;
    background-size: 404px;
    width: 404px;
    height: 140px;
  }

  .mf-bottom {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .block-right {
    -ms-flex-item-align: start;
    -ms-grid-row-align: start;
    align-self: start;
    margin-left: 0;
  }
  .extra-options-fields .select-wrap {
    margin-bottom: 32px;
  }

}

@media (max-width: 1279px) {
  .model-filter:after {
    top: 160px;
  }
}

@media (max-width: 1024px) {
  .block-left {
    padding-bottom: 0;
  }

  .model-filter:after {
    background: url('/images/instock/filter-car-img-tablet.png') 0 50% no-repeat;
    background-size: cover;
    width: 278px;
    height: 236px;
    top: 48px;
  }

  .model-filter .select-wrap {
    width: 100%;
    max-width: 233px;
    margin-right: 8px;
    margin-bottom: 32px;
  }

  .model-filter {
    padding: 28px 50px;
  }

  .mf-selects {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
    max-width: 75%;
  }

  .extra-options-fields {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
  }

  .block-years {
    width: auto;
    margin-right: 28px;
  }
}

@media (max-width: 991px) {

  .mf-selects {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
    max-width: 82%;
  }

  .mf-colors {
    margin-top: 0;
  }

  .extra-options-fields .select-wrap {
    max-width: 166px;
  }

  .model-filter .extra-options-fields .select-wrap {
    margin-right: 20px;
  }
}

@media (max-width: 767px) {
  .model-filter:after {
    display: none;
  }
  .colors-wrap{
    margin-left: -10px;
    margin-right: -10px;
  }
  .model-filter {
    padding: 26px 10px;
    margin-left: -16px;
    margin-right: -16px;
  }
  .mf-selects,
  .mf-colors,
  .model-filter .select-wrap {
    max-width: 100%;
  }
  .model-filter .select-wrap{
    margin-bottom: 24px;
  }
  .colors-item:not(:last-child){
    margin-right: 10px;
  }

  .colors-item{
    margin: 0 10px 26px;
  }
  .block-right {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
  }
  .btn--blue-dark:not(:last-child){
    margin-bottom: 26px;
  }
  .btn--blue-dark {
    width: 100%;
    text-align: center;
  }
  .extra-options-fields {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .block-years {
    margin-right: 0;
    margin-bottom: 24px;
  }
  .model-filter {
    background: url("/images/instock/filter-bg-mobile.jpg") 0 0 no-repeat;
    background-size: cover;
  }

}
</style>
