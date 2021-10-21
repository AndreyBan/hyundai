<template>
  <div class="ml-car">
    <div class="ml-car__title">
      10 авто Hyundai СОЛЯРИС/ SOLARIS в наличии
    </div>
    <div class="ml-car-wrap">
      <div class="ml-car-item" v-for="i in 10" :key="i">
        <div class="ml-car-item__title" @click="$router.push('/auto-v-nalichii-new/detail/')">Solaris HCR</div>
        <div class="ml-car-item__subtitle">Hyundai Solaris HCR Active Plus</div>
        <div class="ml-car-item__img" @click="$router.push('/auto-v-nalichii-new/detail/')">
          <img src="/images/instock/car-img.jpg" alt="">
        </div>
        <div class="ml-car-price">
          <div class="ml-car-price__new">2 755 000 ₽*</div>
          <div class="ml-car-price__old">от 3 929 000 ₽</div>
        </div>
        <hr class="ml-separate">
        <div class="ml-car-options">
          <div class="ml-car-options-row">
            <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--volume">Объем двигателя, л</div>
            <div class="ml-car-options__value">2</div>

            <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--power">Мощность двигателя, л.с.
            </div>
            <div class="ml-car-options__value">150</div>

            <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--transmission">Тип трансмиссии
            </div>
            <div class="ml-car-options__value">АКПП</div>

            <div class="ml-car-options__name ml-car-options-icon ml-car-options-icon--drive">Тип привода</div>
            <div class="ml-car-options__value">Передний</div>
          </div>
        </div>
        <div class="btn btn--blue-dark">хочу скидку</div>
        <div class="btn btn--dark">обратный звонок</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelCarList"
}
</script>

<style>
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
.clicker{
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
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: auto;
  -ms-grid-columns: 1fr 32px 1fr 32px 1fr 32px 1fr;
  grid-template: auto / 1fr 1fr 1fr 1fr;
  -webkit-column-gap: 32px;
  -moz-column-gap: 32px;
  gap: 32px;
}

.ml-separate {
  margin: 20px 0 16px;
}

.ml-car-item {
  background: #FFFFFF;
  -webkit-box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  padding: 32px;
  transition-duration: .2s;
}
.ml-car-item:hover{
  -webkit-box-shadow: 0 0 14px rgba(0, 52, 105, 0.2);
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
  -ms-grid-rows: 1fr;
  -ms-grid-columns: 70% 8px 30%;
  grid-template: 1fr / 70% 30%;
  -webkit-column-gap: 8px;
  -moz-column-gap: 8px;
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
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
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
    -webkit-column-gap: 1%;
    -moz-column-gap: 1%;
    column-gap: 1%;
  }
}

@media (max-width: 1365px) {
  .ml-car-wrap {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr 32px 1fr 32px 1fr;
    grid-template: auto / 1fr 1fr 1fr;
    -webkit-column-gap: 32px;
    -moz-column-gap: 32px;
    column-gap: 32px;
  }
}

@media (max-width: 1200px) {
  .ml-car-wrap {
    -webkit-column-gap: 1%;
    -moz-column-gap: 1%;
    column-gap: 1%;
  }
  .ml-car-options-row{
    row-gap: 20px;
  }

}

@media (max-width: 1090px) {
  .ml-car-wrap {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr 1fr;
    grid-template: auto / 1fr 1fr;
  }

  .ml-car-options-row {
    -ms-grid-rows: 1fr;
    -ms-grid-columns: 75% 15%;
    grid-template: 1fr / 75% 15%;
  }

  .ml-car-options__value {
    text-align: right;
  }
}

@media (max-width: 767px) {
  .ml-car-wrap {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr;
    grid-template: auto / 1fr;
    row-gap: 20px;
  }

  .ml-car-item {
    padding: 16px 18px 20px;
  }

  .ml-car-price__new {
    font-size: 16px;
  }

  .ml-car-price__old {
    font-size: 14px;
  }
  .ml-car-item__title{
    font-size: 16px;
  }
  .ml-car__title {
    margin: 26px 0 15px;
  }
}
</style>
