<template>
  <section class="car-list">

    <div class="car-item" v-for="(el, i) in models" :key="i">
      <div class="car-item__title">
        {{ el.nameRus + " / " + el.name }}
      </div>
      <div class="car-item__price">
        от {{ el.minPrice }} ₽
      </div>
      <div class="car-item__img">
        <img :src="el.img" alt="">
      </div>
      <a class="btn-link" href="/model" @click.prevent="$router.push('/auto-v-nalichii-new/model/')">
        {{ el.countCars }} авто в наличии
      </a>
      <div class="wrap-credit">
        <span class="credit__text">В кредит от</span>
        <span class="credit__price">{{ el.creditPrice }} ₽/мес.</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CarList",
  data: () => ({
    models: {
      0: {
        name: "solaris",
        nameRus: "солярис",
        minPrice: "820 000",
        countCars: "12",
        creditPrice: "8 643",
        img: "/images/instock/car-img.jpg"
      },
      1: {
        name: "elantra",
        nameRus: "элантра",
        minPrice: "1 369 000",
        countCars: "10",
        creditPrice: "8 643",
        img: "/images/instock/car-img-2.jpg"
      }
    }
  })
}
</script>

<style scoped>
.car-list {
  margin-top: 32px;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: auto;
  -ms-grid-columns: 1fr 32px 1fr 32px 1fr 32px 1fr;
  grid-template: auto / 1fr 1fr 1fr 1fr;
  grid-column-gap: 32px;

}

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

@media (max-width: 1280px) {
  .car-list {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template: auto / 1fr 1fr 1fr;
  }
}

@media (max-width: 991px) {
  .car-list {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr 1fr;
    grid-template: auto / 1fr 1fr;
  }
}

@media (max-width: 767px) {
  .car-list {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr;
    grid-template: auto / 1fr;
  }
}
</style>
