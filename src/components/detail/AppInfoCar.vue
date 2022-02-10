<template>
  <section class="car-info">
    <div class="car-info-top-row">
      <div class="car-info-title-wrap">
        <div class="car-info__title">
          Solaris HCR
        </div>
        <div class="car-info__subtitle">
          Hyundai Solaris HCR Active Plus
        </div>
      </div>
      <div class="car-info-price">
        <div class="car-info-price-row">
          <span class="car-info-price__new">755 000 ₽*</span>
          <span class="car-info-price__old">от  929 000 ₽</span>
        </div>
        <div class="car-info-price__credit">В кредит от <span>8 643 ₽/мес.</span></div>
      </div>
    </div>
    <div class="car-info-grid">
      <div class="car-info__img">
        <img src="/images/instock/car-full.jpg" alt="">
      </div>
      <div class="car-info-options-wrap">
        <div class="car-info-options">
          <div class="car-info-options__title">Технические характеристики</div>
          <div class="car-info-options__row">
            <div class="car-info-options__name car-info-options-icon car-info-options-icon--time">Год выпуска, г</div>
            <div class="car-info-options__value">2021</div>
            <div class="car-info-options__name car-info-options-icon ml-car-options-icon--volume">Объем двигателя, л
            </div>
            <div class="car-info-options__value">2</div>
            <div class="car-info-options__name car-info-options-icon ml-car-options-icon--power">Мощность двигателя,
              л.с.
            </div>
            <div class="car-info-options__value">150</div>
            <div class="car-info-options__name car-info-options-icon ml-car-options-icon--transmission">Тип
              трансмиссии
            </div>
            <div class="car-info-options__value">АКПП</div>
            <div class="car-info-options__name car-info-options-icon ml-car-options-icon--drive">Тип привода</div>
            <div class="car-info-options__value">Передний</div>
          </div>
        </div>
      </div>
      <div class="car-info-address-wrap">
        <div class="car-info-address">
          <div>
            <div class="car-info-address__title">Автомобиль в наличии в ДЦ АГАТ</div>
            <div class="car-info-address__name">
              Московское шоссе, 294б
              <br>
              +7 (831) 266-47-08
            </div>
          </div>
          <a href="#hidden-form" class="btn btn--blue-dark" data-fancybox @click="modalShow = true">забронировать
            авто</a>
        </div>
      </div>
      <div class="car-info-buttons-wrap">
        <div class="car-info-buttons">
          <a href="#" class="btn btn--dark icon-btn icon-btn--calc">расчет кредита</a>
          <a href="#" class="btn btn--dark icon-btn icon-btn--test-drive">тест-драйв</a>
          <a href="#" class="btn btn--dark icon-btn icon-btn--refresh">трейд-ин</a>
        </div>
      </div>
      <AppModalWindow v-if="modalShow" @close-modal="modalShow = false">
        <AppForm :is-popup="true"/>
      </AppModalWindow>
    </div>
  </section>
</template>

<script>
import AppModalWindow from "./AppModalWindow";
import AppForm from "./AppForm";

export default {
  name: "CarInfo",
  components: {
    AppModalWindow,
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
.btn {
  display: block;
  position: relative;
  padding: 14px 0;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 0;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  z-index: 1;
  width: 229px;
}

.btn.icon-btn {
  padding-left: 32px;
}

.car-info-address {
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
  grid-area: 2 / 2 / 3 / 3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.car-info-address-wrap {
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
  grid-column: 2 / 3;
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  grid-row: 3 / 4;
}

.car-info-address__title {
  font-size: 14px;
  color: #666666;
  margin-bottom: 12px;
}

.car-info-address__name {
  font-size: 14px;
  padding-left: 32px;
  position: relative;
}

.car-info-address__name:before {
  content: '';
  position: absolute;
  left: 0;
  background: url("/images/instock/icon-loacation.svg") 0 0 no-repeat;
  width: 20px;
  height: 27px;
}

.car-info-buttons-wrap {
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  grid-row: 3 / 4;
  -ms-grid-row-align: center;
  align-self: center;
}

.icon-btn:before {
  content: '';
  position: absolute;
  left: auto;
  margin-left: -36px;
}

.icon-btn--calc:before {
  background: url("/images/instock/icon-calc.svg") 0 0 no-repeat;
  top: 9px;
  width: 23px;
  height: 28px;
}

.icon-btn--test-drive:before {
  background: url("/images/instock/icon-test-drive.svg") 0 0 no-repeat;
  top: 9px;
  width: 27px;
  height: 27px;
}

.icon-btn--refresh:before {
  background: url("/images/instock/icon-refresh.svg") 0 0 no-repeat;
  top: 10px;
  width: 30px;
  height: 25px;
}

.car-info-buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.car-info-options__name {
  padding-left: 32px;
  position: relative;
}

.car-info-options__value,
.car-info-options__name {
  font-size: 14px;
}

.car-info-options-icon:before {
  content: '';
  position: absolute;
  left: 0;
}

.car-info-options-icon--time:before {
  background: url("/images/instock/icon-time.svg") 0 0 no-repeat;
  background-size: 16px;
  width: 16px;
  height: 16px;
  top: 0;
}

.car-info-options__row {
  margin-top: 26px;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 1fr;
  -ms-grid-columns: 1fr 1fr;
  grid-template: 1fr / 1fr 1fr;
  row-gap: 26px;
}

.car-info-options__title {
  font-size: 18px;
  font-weight: 500;
}

.car-info-options,
.car-info-address {
  padding: 32px;
  background-color: #EFEFED;
}

.car-info-options {
  margin-top: 32px;
}

.car-info-top-row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.car-info__title {
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 4px;
}

.car-info__subtitle {
  font-size: 14px;
  color: #003469;
}

.car-info-price__new {
  font-size: 36px;
  font-weight: 500;
  color: #003469;
  margin-right: 25px;
}

.car-info-price__old {
  font-size: 20px;
  text-decoration: line-through;
}

.car-info-price__credit {
  font-size: 16px;
  text-align: right;
}

.car-info-price__credit span {
  color: #003469;
  margin-left: 16px;
  font-weight: 500;
}

.car-info-grid {
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 328px 32px 124px;
  -ms-grid-columns: 1.4fr 32px 1fr;
  grid-template: 328px 32px 124px/ 1.4fr 1fr;
  -webkit-column-gap: 32px;
  -moz-column-gap: 32px;
  column-gap: 32px;
}

.car-info__img {
  text-align: center;
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  grid-area: 1 / 1 / 2 / 2;
}

.car-info__img img {
  max-width: 643px;
}

@media (max-width: 1279px) {
  .car-info-grid {
    -ms-grid-rows: auto;
    -ms-grid-columns: 60% auto;
    grid-template: auto/ 60% auto;
  }

  .car-info__img {
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-column: 1/3;
  }

  .car-info-options-wrap {
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
    grid-column: 1 / 2;
  }

  .car-info-options {
    margin-top: 0;
  }

  .car-info-address-wrap {
    -ms-grid-column: 2;
    -ms-grid-column-span: 1;
    grid-column: 2 / 3;
    grid-row: auto;
  }

  .car-info-buttons-wrap {
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-column: 1 / 3;
    margin-top: 32px;
  }

  .car-info-address {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100%;
  }
}

@media (max-width: 991px) {
  .car-info__title,
  .car-info-price__new {
    font-size: 24px;
  }

  .car-info-price__old {
    font-size: 16px;
  }

  .car-info-options__row {
    -ms-grid-rows: 1fr;
    -ms-grid-columns: 70% auto;
    grid-template: 1fr / 70% auto;
  }
}

@media (max-width: 768px) {
  .car-info-grid {
    -ms-grid-rows: auto;
    -ms-grid-columns: 55% 8px auto;
    grid-template: auto/ 55% auto;
    -webkit-column-gap: 8px;
    -moz-column-gap: 8px;
    column-gap: 8px;
  }

  .car-info-address .btn {
    display: block;
    width: 100%;
  }

  .btn {
    width: 224px;
  }
}

@media (max-width: 767px) {
  .car-info-grid {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr;
    grid-template: auto / 1fr;
  }

  .car-info__img {
    grid-area: unset;
  }

  .car-info__img img {
    max-width: 100%;
  }

  .car-info-options-wrap,
  .car-info-address-wrap,
  .car-info-buttons-wrap {

    grid-column: unset;
  }

  .car-info-buttons {
    display: block;
    margin-bottom: 30px;
  }

  .btn {
    width: 100%;
  }

  .car-info-options,
  .car-info-address {
    padding: 20px;
  }

  .car-info-buttons .btn:not(:last-child) {
    margin-bottom: 26px;
  }

  .car-info__title,
  .car-info-price__new {
    font-size: 18px;
  }

  .car-info__subtitle {
    margin-bottom: 16px;
  }

  .car-info-price-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .car-info-price__old,
  .car-info-price__credit {
    font-size: 14px;
  }

  .car-info-top-row {
    display: block;
  }

  .car-info-price__credit {
    text-align: left;
  }

  .car-info-address__name {
    margin-bottom: 18px;
  }
}
</style>
