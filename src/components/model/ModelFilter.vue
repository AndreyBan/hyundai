<template>
  <section class="model-filter" v-if="carList">
    <div class="mf__title">Выбрать автомобиль</div>
    <div class="mf-selects">
      <div class="select-wrap">
        <v-select placeholder="Не выбрана" v-model="changed.configuration" :options="filters.configuration">
          <template #header>
            <div class="select-title">Комплектация</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
      <div class="select-wrap">
        <v-select placeholder="Не выбран" v-model="changed.engine_volume" :options="filters.engine_volume">
          <template #header>
            <div class="select-title">Объем двигателя</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
      <div class="select-wrap">
        <v-select placeholder="Не выбран" v-model="changed.transmission" :options="filters.transmission">
          <template #header>
            <div class="select-title">Тип КПП</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
    </div>
    <filterColors :colors="filters.colors"/>

    <div class="mf-bottom">
      <div class="block-left">
        <div class="extra-options__toggle" :class="{'open': extraOptions}" @click="extraOptions = !extraOptions">
          Дополниетльные параметры
        </div>
        <div class="extra-options-content">
          <div class="extra-options-fields">
            <div class="block-years">
              <div class="extra-options__title">Год выпуска</div>
              <div class="check-wrap">
                <div class="check-group" v-for="(el, i) in filters.year_of_manufacture" :key="i">
                  <input type="checkbox" name="year" :id="'year-' + i">
                  <label :for="'year-' + i">{{ el }}</label>
                </div>
              </div>
            </div>
            <div class="select-wrap">
              <v-select placeholder="Не выбран" v-model="changed.engine_power" :options="filters.engine_power">
                <template #header>
                  <div class="select-title">Мощность двигателя</div>
                </template>
                <template #no-options>
                  Ничего не найдено
                </template>
              </v-select>
            </div>
            <div class="select-wrap">
              <v-select placeholder="Не выбран" v-model="changed.gear_type" :options="filters.gear_type">
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
        <a href="#" class="btn btn--blue-dark">найдено {{ count }} авто</a>
        <div class="btn btn--blue-dark btn-icon btn-icon-reset">сбросить фильтр</div>
      </div>
    </div>
  </section>
</template>

<script>
import filterColors from "./filter/filterColors";

export default {
  name: "ModelFilter",
  props: ["cars", "count"],
  components: {
    filterColors,
  },
  data() {
    return {
      carList: this.cars,
      extraOptions: false,
      changed: {},
      filters: {},
    }
  },
  methods: {
    getProperty(filter, car, prop) {
      if (!filter[prop].includes(car["property_values"][prop][0])) {
        filter[prop].push(car["property_values"][prop][0]);
      }

      return filter;
    },
    getUniqueColors(colors) {
      return colors.reduce((acc, elem) => {
        if (acc.values[elem.value]) return acc;

        acc.values[elem.value] = true;
        acc.colors.push(
            {
              name: elem.name,
              value: elem.value
            }
        )

        return acc;
      }, {values: [], colors: []}).colors
    }
  },
  computed: {
    getFilterData() {
      let cars = this.carList;
      let filter = {
        configuration: [],
        engine_volume: [],
        transmission: [],
        year_of_manufacture: [],
        engine_power: [],
        gear_type: [],
        colors: []
      };

      if (cars) {
        for (let i in cars) {
          if (!filter["configuration"].includes(cars[i]["configuration_name"])) {
            filter["configuration"].push(cars[i]["configuration_name"]);
          }

          // Заполняем свойства
          for (let j in filter) {
            if (!["colors", "configuration"].includes(j)) {
              filter = this.getProperty(filter, cars[i], j);
            }
          }

          // Заполняем массив объектами цветов (весь набор цветов)
          filter["colors"].push(
              {
                name: cars[i]["color"]["name"],
                value: cars[i]["color"]["value"]
              }
          );
        }

        // Получаем уникальные значения цветов
        filter.colors = this.getUniqueColors(filter.colors);

        // Сортируем свойства с числовым значением по возрастанию
        for (let j in filter) {
          if (["engine_volume", "year_of_manufacture", "engine_power"].includes(j)) {
            filter[j].sort(function (a, b) {
              return a - b;
            });
          }
        }
      }

      return filter;
    },

  },
  watch: {
    cars: function () {
      this.carList = this.cars;
      this.filters = this.getFilterData;
    },
    changed: function () {
      console.log(this.changed)
    }

  },
  mounted() {
    if (this.carList) {
      this.filters = this.getFilterData;
      // console.log(this.filters)
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
  background-color: #e7e7e7;
  font-size: 14px;
}

.vs__dropdown-option {
  height: auto;
  line-height: 18px;
  word-wrap: break-word;
  white-space: normal;
  border-top: 1px solid #dadada;
  padding: 6px 8px;

}

.vs__actions {
  cursor: pointer;
}

.model-filter .vs__actions:before {
  content: "";
  position: absolute;
  width: 9px;
  height: 5px;
  right: 16px;
  background: url("/images/instock/select-arrow.svg") 50% 50% no-repeat;
  background-size: 9px;
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

<style scoped lang="scss">

.btn.btn-icon {
  padding-left: 32px;
  position: relative;
}

.btn-icon-reset:before {
  content: '';
  position: absolute;
  background: url("/images/instock/reset-icon.svg") 0 0 no-repeat;
  left: 29px;
  top: 20px;
  width: 15px;
  height: 18px;
  background-size: 15px;
}

.extra-options-content {
  display: none;
}

.extra-options__toggle.open + .extra-options-content {
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
  display: flex;
  max-width: 751px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.select-title {
  font-size: 14px;
  margin-bottom: 14px;
  color: #000000;
}

.extra-options {
  &__title{
  font-size: 14px;
  margin-bottom: 16px;
  color: #666666;
  }

  &-fields{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__toggle{
    color: #003469;
    margin-bottom: 30px;
    position: relative;
    font-weight: 500;
    padding-right: 16px;
    line-height: 1.17;
    display: inline-block;
    cursor: pointer;

    &:before{
      content: '';
      position: absolute;
      background: url("/images/instock/arrow-down.svg") 0 0 no-repeat;
      width: 9px;
      height: 5px;
      background-size: 9px;
      right: 0;
      top: 7px;
      transition-duration: .2s;
    }

    .open:before{
      transform: rotate(180deg);
    }
  }
}

.check-wrap {
  display: flex;
  flex-wrap: wrap;
}

.block-years {
  width: 229px;
}

.mf-bottom {
  display: flex;
}
.check-group{
  input {
    display: none;

    & + label{
      display: inline;
      position: relative;
      padding-left: 28px;
      padding-top: 2px;
      cursor: pointer;

      &:before{
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 1px solid #B7B4B4;
        left: 0;
        top: 0;
      }
    }

    &:checked + label:after{
      content: '';
      position: absolute;
      width: 16px;
      height: 12px;
      background: url("/images/instock/blue-check.svg") 0 0 no-repeat;
      left: 3px;
      top: 4px;
    }
  }

  &:not(:last-child){
    margin-right: 20px;
  }
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
  justify-self: end;
  border-radius: 0;
  font-size: 16px;
  text-decoration: none;

  &:not(:last-child){
    margin-right: 32px;
  }
}

.block-right {
  display: flex;
  align-self: end;
  margin-left: 65px;
}

.model-filter {
  position: relative;
  background: url("/images/instock/filter-bg.jpg") 0 0 no-repeat;
  background-size: cover;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    background: url("/images/instock/filter-car-img.png") 50% 50% no-repeat;
    width: 604px;
    height: 260px;
  }
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
    flex-direction: column;
  }

  .block-right {
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

  .model-filter {
    padding: 28px 50px;

    .select-wrap {
      width: 100%;
      max-width: 233px;
      margin-right: 8px;
      margin-bottom: 32px;
    }

    &:after {
      background: url('/images/instock/filter-car-img-tablet.png') 0 50% no-repeat;
      background-size: cover;
      width: 278px;
      height: 236px;
      top: 48px;
    }
  }

  .mf-selects {
    justify-content: start;
    max-width: 75%;
  }

  .extra-options-fields {
    justify-content: start;
  }

  .block-years {
    width: auto;
    margin-right: 28px;
  }
}

@media (max-width: 991px) {

  .mf-selects {
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
  .colors-wrap {
    margin-left: -10px;
    margin-right: -10px;
  }

  .model-filter {
    padding: 26px 10px;
    margin-left: -16px;
    margin-right: -16px;

    background: url("/images/instock/filter-bg-mobile.jpg") 0 0 no-repeat;
    background-size: cover;

    &:after {
      display: none;
    }
  }

  .mf-selects,
  .mf-colors,
  .model-filter .select-wrap {
    max-width: 100%;
  }

  .model-filter .select-wrap {
    margin-bottom: 24px;
  }

  .colors-item:not(:last-child) {
    margin-right: 10px;
  }

  .colors-item {
    margin: 0 10px 26px;
  }

  .block-right {
    flex-direction: column;
    width: 100%;
  }

  .btn--blue-dark {
    width: 100%;
    text-align: center;

    &:not(:last-child){
      margin-bottom: 26px;
    }
  }

  .extra-options-fields {
    flex-direction: column;
  }

  .block-years {
    margin-right: 0;
    margin-bottom: 24px;
  }
}
</style>
