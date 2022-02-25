<template>
  <div class="container" v-if="loaded">
    <AppInfoCar :car="car"/>
    <div class="bottom-block">
      <AppExtraOptions :car="car"/>
      <div>
        <div class="sticky-form">
          <AppForm :car="car"/>
        </div>
      </div>
    </div>
    <p class="bottom-text">Указанная цена достигается суммированием всех специальных условий, действующих на данную
      модель автомобиля, не
      включает стоимость установленного дополнительного оборудования и может отличаться от цен других дилеров. Ценовое
      предложение действует на ограниченную партию автомобилей, носит информационный характер и не является публичной
      офертой, определяемой положениями ст. 437 (2) ГК РФ. Окончательную стоимость а/м с учётом всех действующих акций и
      установленного дополнительного оборудования уточняйте в отделах продаж Hyundai АГАТ и по телефону +7 (831)
      266-47-08.</p>
  </div>
</template>

<script>
import AppInfoCar from "./detail/AppInfoCar";
import AppExtraOptions from "./detail/AppExtraOptions";
import AppForm from "./detail/AppForm";

export default {
  name: "CarDetail",
  components: {
    AppInfoCar,
    AppExtraOptions,
    AppForm
  },
  data() {
    return {
      car: {},
      modalShow: false,
      loaded: false,
      error: false,
      metaData: {
        title: 'Hyundai в наличии',
        description: 'Hyundai в наличии - характеристики, цена, скидки.',
      },
    }
  },
  metaInfo() {
    return {
      title: this.metaData.title,
      meta: [
        {vmid: 'description', property: 'description', content: this.metaData.description},
        {vmid: 'og:title', property: 'og:title', content: this.metaData.title},
        {vmid: 'og:description', property: 'og:description', content: this.metaData.description},
      ],
    }
  },
  mounted() {
    fetch('https://agat-hyundai.ru/ajax/api_instock.php?data=car-detail&id=' + this.$route.params.id, {method: 'POST'})
        .then(res => res.json())
        .then(res => {
          if (res["status"] == "success") {
            this.car = res["data"];

            if (res["city"]["in"]) {
              let cityIn = res["city"]["in"];

              this.metaData.title = `${this.car["name"]} ${this.car["color"]["name"]}  в наличии – купить в ${cityIn}`;
              this.metaData.description = `Купить новый ${this.car["name"]} ${this.car["engine_volume"]} ${this.car["color"]["name"]} ${this.car["transmission"]} по цене ${this.car["price"]}  руб. в ${cityIn}. Автокредит, лизинг, спецпредложения. ${this.car["name"]} в наличии у официального дилера АГАТ.`;
            }

            this.loaded = true;

          } else this.error = true;

        })
        .catch(e => {
          console.log("Error message: " + e.errorText)
          this.error = true;
        })
  }
}
</script>

<style scoped>
.bottom-block {
  margin-top: 32px;
  display: grid;
  grid-template: auto / 1.4fr 1fr;
  column-gap: 32px;
}

.sticky-form {
  position: sticky;
  position: -webkit-sticky;
  top: 120px;
}

.bottom-text {
  margin: 50px 0;
  color: #666666;
  font-size: 14px;
}

@media (max-width: 1279px) {
  .bottom-block {
    grid-template: auto / 1fr;
  }
}
</style>
