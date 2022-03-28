<template>
    <div class="car-item" itemscope itemtype="https://schema.org/Product" v-if="element['body_type'].toLowerCase() === type || !type" >
      <a :href="'/auto-v-nalichii/' + element['name_en'] + '/'" class="link-clicker"></a>
      <meta itemprop="brand" content="Hyundai">
      <meta itemprop="model" :content="element['name_en']">
      <meta itemprop="url" :content="urlHost + encodeURI(element['name_en']) + '/'">
      <div class="car-item__title"  itemprop="name">
        {{ element["name_ru"] + " / " + element["name_en"] }}
      </div>
      <div class="car-item__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer" v-if="!hidePrice">
        от <span itemprop="price" :content="element['min_price']">{{ formatPrice(element["min_price"]) }}</span> <span itemprop="priceCurrency" content="RUB">₽</span>
        <link itemprop="availability" href="https://schema.org/InStock" />
      </div>
      <div class="car-item__img">
        <img :src="element['img']" :alt="element['name_en']" itemprop="image" >
      </div>
      <a :href="'/auto-v-nalichii/' + element['name_en'] + '/'" class="btn-link" > {{ element["instock_count"] }} авто в наличии</a>
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
  props: {
    element: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: "",
      required: true
    },
    hidePrice: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      urlHost: location.href
    }
  },
  mixins: [mixinFormatPrice]
}
</script>

<style scoped lang="scss">
.link-clicker{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.car-item {
  position: relative;
  padding: 28px 32px;
  border: 1px solid #E4DCD3;
  margin-bottom: 32px;
  cursor: pointer;

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
  position: relative;
  text-decoration: none;
  display: block;
  text-align: center;
  color: #ffffff;
  background-color: #003469;
  padding: 12px 0;
  transition-duration: .15s;
  z-index: 1;
  
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
