<template>
    <div class="car-item" v-if="element['body_type'].toLowerCase() === type || !type" >
      <div class="car-item__title">
        {{ element["name_ru"] + " / " + element["name_en"] }}
      </div>
      <div class="car-item__price">
        от {{ formatPrice(element["min_price"]) }} ₽
      </div>
      <div class="car-item__img">
        <img :src="element['img']" alt="">
      </div>
      <router-link class="btn-link" :to="`/auto-v-nalichii-new/${element['name_en']}/`"> {{ element["instock_count"] }} авто в наличии</router-link>
      <div class="wrap-credit" v-if="element['credit']">
        <span class="credit__text">В кредит от</span>
        <span class="credit__price">{{ formatPrice(element["credit"]) }} ₽/мес.</span>
      </div>
    </div>
</template>

<script>
import {mixinFormatPrice} from "../mixins/AppMixins";

export default {
  name: "AppCarItem",
  props: ["element", "type"],
  mixins: [mixinFormatPrice]
}
</script>

<style scoped lang="scss">
.car-item {
  padding: 28px 32px;
  border: 1px solid #E4DCD3;
  margin-bottom: 32px;

  &__title {
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 5px;
  }

  &__price {
    font-weight: 500;
  }

  &__img {
    width: 100%;
    text-align: center;
    margin: 16px 0;

    img {
      max-width: 100%;
    }
  }
}

.btn-link {
  text-decoration: none;
  display: block;
  text-align: center;
  color: #ffffff;
  background-color: #003469;
  padding: 12px 0;
  transition-duration: .15s;

  &:hover {
    background-color: #0C4F94;
  }
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
