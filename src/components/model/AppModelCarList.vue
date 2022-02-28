<template>
  <div>
    <div class="ml-car" v-if="filteredCars.length">
      <div class="ml-car__title">
        {{ filteredCars.length }} авто Hyundai {{ model }} в наличии
      </div>
      <div class="ml-car-wrap">
        <div class="ml-car-item" v-for="el in showCars" :key="el.id">
          <div class="ml-car-item__title"
               @click="$router.push({ name: 'DetailPage', params: {model: model, id: el.id} })">
            {{ el["model_name"] }}
          </div>
          <div class="ml-car-item__subtitle"
               @click="$router.push({ name: 'DetailPage', params: {model: model, id: el.id} })">{{ el["name"] }}
          </div>
          <div class="ml-car-item__img"
               @click="$router.push({ name: 'DetailPage', params: {model: model, id: el.id} })">
            <img :src="el['model_picture']" alt="" :style="{backgroundColor: el['color']['real_color']['value']}"
                 v-if="el['color']">
            <img :src="el['model_picture']" alt="" v-else>
          </div>
          <div class="ml-car-price">
            <div class="ml-car-price__new">{{ formatPrice(el["price"]) }} ₽*</div>
            <div class="ml-car-price__old" v-if="(el['price_full4specials'] && el['price_full4specials'] > 0)">от
              {{ formatPrice(el['price_full4specials']) }} ₽
            </div>
          </div>
          <hr class="ml-separate">
          <div class="ml-car-options">
            <div class="ml-car-options-row">
              <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--volume">
                Объем двигателя, л
              </div>
              <div class="ml-car-options__value">{{ el['engine_volume'] }}</div>

              <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--power">
                Мощность двигателя, л.с.
              </div>
              <div class="ml-car-options__value">{{ el['engine_power'] }}</div>

              <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--transmission">
                Тип трансмиссии
              </div>
              <div class="ml-car-options__value">{{ el['transmission'] }}</div>

              <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--drive">
                Тип привода
              </div>
              <div class="ml-car-options__value">{{ el['gear_type'] }}</div>
            </div>
          </div>
          <div class="btn btn--blue-dark" data-fancybox @click="getCarForModal(el)">хочу скидку</div>
          <div class="btn btn--dark" data-fancybox @click="getCarForModal(el)">обратный звонок</div>
        </div>
      </div>
      <div class="show-more" v-if="filteredCars.length > showCount && showMore" @click="showMoreCars">Показать еще</div>
      <paginate v-if="filteredCars.length > showCount * 2 && !showMore"
                :click-handler="clickCallback"
                :page-count="getCount"
                :page-range="3"
                :margin-pages="2"
                :prev-text="'<'"
                :next-text="'>'"
                :container-class="'pagination'"
                :page-class="'page-item'">
      </paginate>

      <AppModalWindow v-if="modalShow" @close-modal="modalShow = false">
        <AppForm :is-popup="true" :car="carsModal"/>
      </AppModalWindow>
    </div>
    <div class="not-find-cars" v-else>По заданным параметрам автомобилей в наличии нет</div>
  </div>
</template>

<script>
import Paginate from '/node_modules/vuejs-paginate';
import AppModalWindow from "../detail/AppModalWindow";
import AppForm from "../detail/AppForm";
import {mixinFormatPrice, mixinScrollToCars} from "../mixins/AppMixins";

export default {
  name: "ModelCarList",
  props: {
    cars: {
      type: Array,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  mixins: [mixinFormatPrice, mixinScrollToCars],
  components: {
    Paginate,
    AppModalWindow,
    AppForm
  },
  data() {
    return {
      loading: false,
      showCars: [],
      showCount: 12,
      filteredCars: this.cars,
      page: 1,
      showMore: true,
      modalShow: false,
      carsModal: {}
    }
  },
  methods: {
    getShowCars(start = 0, end = this.showCount) {
      this.showCars = [];

      for (let i in this.filteredCars) {
        if (i >= start && i < end) {
          this.showCars.push(this.filteredCars[i]);
        }
      }
    },
    getCarForModal(cars) {
      this.modalShow = true;
      this.carsModal = cars;

    },
    showMoreCars() {
      this.showMore = false;
      this.showCount = this.showCount * 2;
      this.getShowCars();
    },
    clickCallback: function (pageNum) {
      let start = 0;
      let end = this.showCount * pageNum;

      if (pageNum > 1) {
        start = this.showCount * (pageNum - 1);
      }
      this.getShowCars(start, end);
      this.scrollToCars();
    }
  },
  computed: {
    getCount() {
      return Math.ceil(this.filteredCars.length / this.showCount);
    },
  },

  watch: {
    cars() {
      this.filteredCars = this.cars;
      this.getShowCars();
    }
  },
  mounted() {
    this.getShowCars();
  }
}
</script>

<style>
.pagination {
  display: flex;
  list-style: none;
  padding-left: 0;
  margin-top: 48px;
  justify-content: center;
}

.pagination li a {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #00AAD2;
}

.pagination li.active a {
  color: #fff;
  background-color: #00AAD2;
}

.pagination li:not(:last-child) a {
  border-right: none;
}

.pagination li.disabled a {
  cursor: not-allowed;
}

.pagination li.disabled {
  opacity: .5;
}

.ml-car-options-icon--volume:before {
  background: url("/images/instock/icon-volume.svg") 0 0 no-repeat;
  width: 20px;
  height: 16px;
  background-size: 20px;
}

.ml-car-options-icon--power:before {
  background: url("/images/instock/icon-power.svg") 0 0 no-repeat;
  width: 13px;
  height: 21px;
  background-size: 13px;
  top: -2px;
}

.ml-car-options-icon--transmission:before {
  background: url("/images/instock/icon-transmission.svg") 0 0 no-repeat;
  width: 16px;
  height: 21px;
  background-size: 16px;
  top: -2px;
}

.ml-car-options-icon--drive:before {
  background: url("/images/instock/icon-drive.svg") 0 0 no-repeat;
  width: 16px;
  height: 21px;
  background-size: 16px;
  top: -2px;
}
</style>

<style scoped>
.show-more {
  max-width: 200px;
  padding: 12px 32px;
  border: 1px solid #00AAD2;
  margin: 48px auto 0;
  text-align: center;
  transition-duration: .2s;
  cursor: pointer;
}
.not-find-cars{
  margin: 80px 0 40px;
  font-size: 24px;
  text-align: center;
}
.show-more:hover {
  transition-duration: .2s;
  color: #FFFFFF;
  background-color: #00AAD2;
}

.clicker {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.ml-car-options-icon {
  position: relative;
}

.ml-car-options-icon:before {
  content: '';
  position: absolute;
  left: 0;
}

.ml-car-options-row:not(:last-child) {
  margin-bottom: 26px;
}

.ml-car__title {
  margin: 30px 0;
  font-size: 18px;
  font-weight: 500;
}

.ml-car-wrap {
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr;
  gap: 32px;
}

.ml-separate {
  margin: 20px 0 16px;
}

.ml-car-item {
  background: #FFFFFF;
  box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  padding: 32px;
  transition-duration: .2s;
}

.ml-car-item:hover {
  box-shadow: 0 0 14px rgba(0, 52, 105, 0.2);
}

.ml-car-options {
  font-size: 14px;
}

.btn {
  display: block;
  padding: 14px 0;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 0;
  font-size: 16px;
  text-align: center;
  margin-top: 32px;
  z-index: 1;
}

.ml-car-options-row {
  display: -ms-grid;
  display: grid;
  grid-template: 1fr / 70% 30%;
  column-gap: 8px;
  row-gap: 32px;
}

.ml-car-options__name {
  padding-left: 32px;
}

.ml-car-price {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
}

.ml-car-price__new {
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 500;
  color: #003469;
}

.ml-car-price__old {
  text-decoration: line-through;
  font-weight: 400;
  font-size: 18px;
}

.ml-car-item__title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 4px;
  cursor: pointer;
}

.ml-car-item__subtitle {
  font-size: 14px;
  color: #003469;
  height: 38px;
}

.ml-car-item__img {
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
}

.ml-car-item__img img {
  width: 100%;
}

@media (max-width: 1440px) {
  .ml-car-wrap {
    column-gap: 1%;
  }
}

@media (max-width: 1365px) {
  .ml-car-wrap {
    grid-template: auto / 1fr 1fr 1fr;
    column-gap: 32px;
  }
}

@media (max-width: 1200px) {
  .ml-car-wrap {
    column-gap: 1%;
  }

  .ml-car-options-row {
    row-gap: 20px;
  }

}

@media (max-width: 1090px) {
  .ml-car-wrap {
    grid-template: auto / 1fr 1fr;
  }

  .ml-car-options-row {
    grid-template: 1fr / 75% 15%;
  }

  .ml-car-options__value {
    text-align: right;
  }
}

@media (max-width: 767px) {
  .ml-car-wrap {
    grid-template: auto / 1fr;
    row-gap: 20px;
  }

  .ml-car-item {
    padding: 16px 18px 20px;
  }

  .ml-car-price__old {
    font-size: 14px;
  }

  .ml-car-item__title,
  .ml-car-price__new {
    font-size: 16px;
  }

  .ml-car__title {
    margin: 26px 0 15px;
  }
}
</style>
