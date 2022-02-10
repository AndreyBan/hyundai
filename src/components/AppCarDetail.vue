<template>
  <div class="container">
    <AppInfoCar/>
    <div class="bottom-block">
      <AppExtraOptions/>
      <div>
        <AppForm/>
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
      modalShow: false
    }
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
