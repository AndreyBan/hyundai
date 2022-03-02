<template>
    <div class="container" v-if="loaded && !error">
      <AppBreadcrumbs
          :prop-chain-item="[{name: $route.params.model, path: $route.params.model}, {name: car['model_name'] + ' ' + car['configuration_name'], path: ''}]"/>
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
        офертой, определяемой положениями ст. 437 (2) ГК РФ. Окончательную стоимость а/м с учётом всех действующих акций
        и
        установленного дополнительного оборудования уточняйте в отделах продаж Hyundai АГАТ и по телефону +7 (831)
        266-47-08.</p>
    </div>
  <div class="loader-wrap" v-else-if="!loaded">
    <div class="loader"></div>
  </div>
  <AppError v-else-if="error" >Произошла ошибка загрузки данных, пожалуйста повторите позже.</AppError>
</template>

<script>
import AppInfoCar from "./detail/AppInfoCar";
import AppExtraOptions from "./detail/AppExtraOptions";
import AppForm from "./detail/AppForm";
import AppBreadcrumbs from "./AppBreadcrumbs";
import AppError from "./AppError";

export default {
  name: "CarDetail",
  components: {
    AppInfoCar,
    AppExtraOptions,
    AppForm,
    AppError,
    AppBreadcrumbs
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
    let errorTimeout = setTimeout(() => this.error = true, 5000);

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
            clearTimeout(errorTimeout);

          } else if (res["status"] == 'not-found'){
            this.$router.push({name: '404'});

          }  else this.error = true;

        })
        .catch(e => {
          console.log("Error message: " + e.message)
          this.error = true;
        })
  }
}
</script>

<style scoped>
.loader-wrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader,
.loader:after {
  overflow:hidden;
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(101,171,248, 0.2);
  border-right: 1.1em solid rgba(101,171,248, 0.2);
  border-bottom: 1.1em solid rgba(101,171,248, 0.2);
  border-left: 1.1em solid #65abf8;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
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
