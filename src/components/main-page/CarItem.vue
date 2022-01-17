<template>
    <div class="car-item" v-if="element['body_type'].toLowerCase() === type || !type" >
      <div class="car-item__title">
        {{ element["name_ru"] + " / " + element["name_en"] }}
      </div>
      <div class="car-item__price">
        от {{ element["min_price"] | formatPrice }} ₽
      </div>
      <div class="car-item__img">
        <img :src="element['img']" alt="">
      </div>
      <a class="btn-link" :href="'/auto-v-nalichii-new/' + element['name_en'] + '/'" @click.prevent="$router.push(`/auto-v-nalichii-new/${element['name_en']}/`)">
        {{ element["instock_count"] }} авто в наличии
      </a>
      <div class="wrap-credit" v-if="element['credit']">
        <span class="credit__text">В кредит от</span>
        <span class="credit__price">{{ element["credit"] | formatPrice }} ₽/мес.</span>
      </div>
    </div>
</template>

<script>
export default {
  name: "CarItem",
  props: ["element", "type"],
  filters: {
    formatPrice: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
}
</script>

<style scoped>
.car-item {
  padding: 28px 32px;
  border: 1px solid #E4DCD3;
  margin-bottom: 32px;
}

.car-item__title {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 5px;
}

.car-item__price {
  font-weight: 500;
}

.car-item__img {
  width: 100%;
  text-align: center;
  margin: 16px 0;
}

.car-item__img img {
  max-width: 100%;
}

.btn-link {
  text-decoration: none;
  display: block;
  text-align: center;
  color: #ffffff;
  background-color: #003469;
  padding: 12px 0;
  -webkit-transition-duration: .15s;
  -o-transition-duration: .15s;
  transition-duration: .15s;
}

.btn-link:hover {
  background-color: #0C4F94;
}

.credit__price {
  font-weight: 500;
  color: #003469;
  margin-left: 16px;
}

.wrap-credit {
  margin-top: 12px;
}
</style>
