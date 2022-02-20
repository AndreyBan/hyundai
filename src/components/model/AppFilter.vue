<template>
  <section class="model-filter">
    <div class="mf__title">Выбрать автомобиль</div>
    <AppPriceRange />
    <div class="mf-selects">
      <div class="select-wrap">
        <v-select placeholder="Не выбрана"
                  v-model.lazy="changedFilterList.configuration_name"
                  :options="filterList.configuration_name"
                  @input="sendFilter"
                  :selectable="option => getVisibleValues(option, 'configuration_name')"
        >
          <template #header>
            <div class="select-title">Комплектация</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
      <div class="select-wrap">
        <v-select placeholder="Не выбран"
                  v-model.lazy="changedFilterList.engine_volume"
                  :options="filterList.engine_volume"
                  @input="sendFilter"
                  :selectable="option => getVisibleValues(option, 'engine_volume')"
        >
          <template #header>
            <div class="select-title">Объем двигателя</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
      <div class="select-wrap">
        <v-select placeholder="Не выбран"
                  v-model.lazy="changedFilterList.transmission"
                  :options="filterList.transmission"
                  @input="sendFilter"
                  :selectable="option => getVisibleValues(option, 'transmission')"
        >
          <template #header>
            <div class="select-title">Тип КПП</div>
          </template>
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
      </div>
    </div>
    <AppFilterColors :colors="filterList.colors"
                     @reset-color="reset = false"
                     :reset="reset"
                     @send-color="getColors"
    />

    <div class="mf-bottom">
      <div class="block-left">
        <div class="extra-options__toggle"
             :class="{'open': extraOptions}"
             @click="extraOptions = !extraOptions"
        >
          Дополниетльные параметры
        </div>
        <div class="extra-options-content">
          <div class="extra-options-fields">
            <div class="block-years">
              <div class="extra-options__title">Год выпуска</div>
              <div class="check-wrap">
                <div class="check-group"
                     v-for="(el, i) in filterList.year_of_manufacture"
                     :key="i"
                     :class="{'not-access': !el.visible}"
                >
                  <input type="checkbox"
                         name="year"
                         :id="'year-' + i"
                         v-model.lazy="changedFilterList['year_of_manufacture']"
                         :value="el.value"
                         @change="sendFilter">
                  <label :for="'year-' + i">{{ el.value }}</label>
                </div>
              </div>
            </div>
            <div class="select-wrap">
              <v-select placeholder="Не выбран"
                        v-model.lazy="changedFilterList.engine_power"
                        :options="filterList.engine_power"
                        @input="sendFilter"
                        :selectable="option => getVisibleValues(option, 'engine_power')"
              >
                <template #header>
                  <div class="select-title">Мощность двигателя</div>
                </template>
                <template #no-options>
                  Ничего не найдено
                </template>
              </v-select>
            </div>
            <div class="select-wrap">
              <v-select placeholder="Не выбран"
                        v-model.lazy="changedFilterList.gear_type"
                        :options="filterList.gear_type"
                        @input="sendFilter"
                        :selectable="option => getVisibleValues(option, 'gear_type')"
              >
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
        <div class="btn btn--blue-dark btn-icon btn-icon-reset" @click="resetFilter">сбросить фильтр</div>
      </div>
    </div>
  </section>
</template>

<script>
import AppFilterColors from "./filter/AppFilterColors";
import AppPriceRange from "./filter/AppPriceRange";
import {mixinFilterProp} from "../mixins/AppMixins";

export default {
  name: "ModelFilter",
  props: ["cars", "count"],
  mixins: [mixinFilterProp],
  components: {
    AppFilterColors,
    AppPriceRange
  },
  data() {
    return {
      allCars: this.cars,
      extraOptions: false,
      filterList: {},
      changedFilterList: this.getEmptyFilterList(),
      reset: false,
      excludeProperty: ""
    }
  },
  methods: {
    getProperty(filter, car, prop) {
      if (!filter[prop].includes(car[prop])) {
        filter[prop].push(car[prop]);
      }

      return filter;
    },

    // Получаем список видимых значений свойства
    getVisibleValues(option, property) {
      let updateList = this.updateFilterList[property];

      return updateList ? updateList.includes(option) : true
    },

    // Сброс фильтра
    resetFilter() {
      this.changedFilterList = this.getEmptyFilterList();
      this.reset = true;
      this.setVisibility(this.filterList);
    },

    // Пустой список значений свойств
    getEmptyFilterList() {
      return {
        configuration_name: "",
        engine_volume: "",
        transmission: "",
        colors: [],
        year_of_manufacture: [],
        engine_power: "",
        gear_type: "",
        priceMin: 0,
        priceMax: 0
      }
    },

    // Получение уникальных значений цвета автомобилей
    getUniqueColors(colors) {
      return colors.reduce((acc, elem) => {
        if (acc.values[elem.value]) return acc;

        acc.values[elem.value] = true;
        acc.colors.push(
            {
              name: elem.name,
              value: elem.value,
              visible: true
            }
        )

        return acc;
      }, {values: [], colors: []}).colors
    },

    // Получяем выбранные в фильтре цвета
    getColors(filterColors) {
      this.$set(this.changedFilterList, "colors", filterColors)
      this.sendFilter();
    },

    /**
     * Сортировка значений фильтра по возрастанию
     *
     * @param filter
     * @returns {*}
     */
    sortFilter(filter) {
      for (let j in filter) {
        if (["engine_volume", "year_of_manufacture", "engine_power"].includes(j)) {
          filter[j].sort((a, b) => a - b);
        }
      }

      return filter;
    },

    /**
     *  Получаем уникальные значения свойств для фильтра
     *
     * @param cars
     * @returns {{engine_power: *[], transmission: *[], engine_volume: *[], year_of_manufacture: *[], colors: *[], configuration_name: *[], gear_type: *[]}}
     */
    getUniqueProperties(cars) {
      let filter = this.fillProperties(cars);

      // Добавляем годам признак активности (видимости)
      for (let k in filter.year_of_manufacture) {
        filter.year_of_manufacture[k] = {
          value: filter.year_of_manufacture[k],
          visible: true
        }
      }

      return filter;
    },

    // Заполнение свойств значениями
    fillProperties(cars) {
      let filter = {
        configuration_name: [],
        engine_volume: [],
        transmission: [],
        year_of_manufacture: [],
        engine_power: [],
        gear_type: [],
        colors: []
      };

      for (let i in cars) {
        let car = cars[i];
        // Заполняем свойства кроме цвета
        for (let j in filter) {
          if (j !== 'colors') {
            filter = this.getProperty(filter, car, j);
          }
        }

        // Заполняем цвета
        if (car["color"]) {
          filter["colors"].push(
              {
                name: car["color"]["name"],
                value: car["color"]["value"],
              }
          );
        }
      }

      return filter;
    },

    // Отправка фильтра в родительский компонент
    sendFilter() {
      this.$emit('get-cars', this.changedFilterList);
      this.setVisibility(this.updateFilterList);
      this.excludeProperty = "";
    },

    // Установка видимости свойствам цвета и года
    setVisibility(filterList) {
      let colors = filterList.colors.map(el => el.name);
      let years = filterList.year_of_manufacture.map(el => el.value);

      this.filterList.colors.forEach(el => {
        el.visible = !(colors && !colors.includes(el.name));
      })

      this.filterList.year_of_manufacture.forEach(el => {
        el.visible = !(years && !years.includes(el.value));
      })
    },

    setExcludeProperty(value) {
      this.excludeProperty = value;
    },
    getPrice(cars) {
      let minPrice = cars[0]["price"];
      let maxPrice = cars[cars.length - 1]["price"];

      this.changedFilterList.priceMin = minPrice;
      // if (!this.changedFilterList.priceMin || minPrice < this.changedFilterList.priceMin ){
      // }
      //
      // if (!this.changedFilterList.priceMax || maxPrice > this.changedFilterList.priceMax ){
      // }
      this.changedFilterList.priceMax = maxPrice;
    }


  },
  computed: {
    minPrice() {
      return this.carList[0]["price"]
    },
    maxPrice() {
      let cars = this.carList;

      return cars[cars.length - 1]["price"];
    },
    getFilterData() {
      let cars = this.carList;
      let filter = null;

      if (cars) {
        filter = this.getUniqueProperties(cars);

        if (filter) {
          filter["colors"] = this.getUniqueColors(filter["colors"]);
          filter = this.sortFilter(filter);
        }
      }

      return filter;
    },

    // Получение обновленного списка значений свойтсв
    updateFilterList() {
      let updateFilterList = this.getFilterData;
      let filter = this.changedFilterList;

      for (let i in filter) {
        if (filter[i]) {
          this.setExcludeProperty(i);
          updateFilterList[i] = this.getFilterData[i];
        }
      }

      return updateFilterList;
    },

    carList() {
      let cars = this.allCars;
      let filter = this.changedFilterList;
      let excludeProp = this.excludeProperty;
      let {colors, year_of_manufacture} = filter;

      return cars.filter(el => {
        for (let i in filter) {
          if (!["colors", "year_of_manufacture", "priceMin", "priceMax", excludeProp].includes(i)) {
            if (filter[i] && !filter[i].includes(el[i])) return false;
          }
        }

        if (excludeProp === "colors") {
          return this.filterProp(el["year_of_manufacture"], year_of_manufacture);

        } else if (excludeProp === "year_of_manufacture") {
          return this.filterProp(el["color"], colors);

        } else {
          return !(!this.filterProp(el["year_of_manufacture"], year_of_manufacture)
              || !this.filterProp(el["color"], colors));
        }

      })
    },
  },

  mounted() {
    this.filterList = this.getFilterData;
    console.log(this.minPrice)
    console.log(this.maxPrice)
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
  &__title {
    font-size: 14px;
    margin-bottom: 16px;
    color: #666666;
  }

  &-fields {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__toggle {
    color: #003469;
    margin-bottom: 30px;
    position: relative;
    font-weight: 500;
    padding-right: 16px;
    line-height: 1.17;
    display: inline-block;
    cursor: pointer;

    &:before {
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

    .open:before {
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

.check-group {
  &.not-access {
    opacity: .3;
    pointer-events: none;
  }

  input {
    display: none;

    & + label {
      display: inline;
      position: relative;
      padding-left: 28px;
      padding-top: 2px;
      cursor: pointer;

      &:before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 1px solid #B7B4B4;
        left: 0;
        top: 0;
      }
    }

    &:checked + label:after {
      content: '';
      position: absolute;
      width: 16px;
      height: 12px;
      background: url("/images/instock/blue-check.svg") 0 0 no-repeat;
      left: 3px;
      top: 4px;
    }
  }

  &:not(:last-child) {
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

  &:not(:last-child) {
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

    &:not(:last-child) {
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
