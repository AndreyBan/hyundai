<template>
  <div class="detail-form-page" v-if="thisCar" :class="{'form-popup': isPopup}">
    <div class="detail-form__main-title" v-if="isPopup">забронировать автомобиль</div>
    <div class="detail-form__title">{{ thisCar["model_name"] }}</div>
    <div class="detail-form__subtitle">{{ thisCar["name"] }}</div>
    <div class="detail-form-price-image">
      <div class="detail-form__price">
        Стоимость: <span>{{ formatPrice(thisCar["price"]) }} ₽*</span>
        <div class="detail-form__price-old" v-if="isPopup && (thisCar['price_full4specials'] && thisCar['price_full4specials'] > 0)">от {{ formatPrice(thisCar['price_full4specials']) }} ₽</div>
      </div>
      <div class="detail-form__image">
        <img :src="thisCar['model_picture']" :alt="thisCar.name" :style="{backgroundColor: thisCar['color']['real_color']['value']}" v-if="thisCar['color']">
        <img :src="thisCar['model_picture']" :alt="thisCar.name"  v-else>
      </div>
    </div>

    <form action="" class="detail-form" @submit.prevent="checkForm">
      <div class="form-group">
        <input type="text" placeholder="Имя и Фамилия*" v-model.lazy.trim="fields.name">
        <p v-if="$v.fields.name.$error" class="error-text">*Обязательное поле</p>
      </div>
      <div class="form-group">
        <input type="text" placeholder="Телефон*" v-model.lazy="fields.phone"
               v-mask="{mask: '+7(999)999-99-99', showMaskOnHover: false}">
        <p v-if="$v.fields.phone.$error" class="error-text">*Обязательное поле</p>
      </div>
      <div class="form-group">
        <v-select placeholder="Дилерский центр*" :options="options" v-model.lazy="fields.dealer">
          <template #no-options>
            Ничего не найдено
          </template>
        </v-select>
        <p v-if="$v.fields.dealer.$error" class="error-text">*Обязательное поле</p>
      </div>
      <div class="policy-agreement">
        <input type="checkbox" name="agreement" id="policy-agreement" v-model="fields.agree">
        <label for="policy-agreement">
          Я согласен на обработку данных
          <br><a href="#">Смотреть правила</a>
        </label>
      </div>
      <button type="submit" class="btn btn--blue-dark">забронировать авто</button>
    </form>

  </div>
  <AppError v-else>
    Ошибка загрузки формы!
  </AppError>
</template>

<script>
import {validationMixin} from 'vuelidate'
import AppError from '../AppError';
import {required} from 'vuelidate/lib/validators';
import {mixinFormatPrice} from "../mixins/AppMixins";

export default {
  name: "AppForm",
  components: {
    AppError
  },
  props: {
    isPopup: {
      type: Boolean
    },
    car: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [
        "test 1",
        "test 2"
      ],
      fields: {
        name: "",
        phone: "",
        comment: "",
        dealer: "",
        agree: false
      },
      thisCar: this.car
    }
  },
  mixins: [validationMixin, mixinFormatPrice],
  validations: {
    fields: {
      name: {required},
      phone: {required},
      dealer: {required},
    }
  },
  methods: {
    checkForm() {
      this.$v.fields.$touch();

      if (!this.$v.fields.$error && this.fields.agree) {
        console.log("validate")
      }
    }
  }
}
</script>
<style>
.form-group {
  position: relative;
}

.detail-form .vs__actions:before {
  content: "";
  position: absolute;
  width: 9px;
  height: 5px;
  right: 16px;
  background: url("/images/instock/select-arrow.svg") 50% 50% no-repeat;
  background-size: 9px;
  -webkit-transition-duration: .35s;
  -o-transition-duration: .35s;
  transition-duration: .35s;
}
</style>
<style scoped>
.detail-form__main-title {
  text-align: center;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 500;
  position: relative;
  margin-bottom: 44px;
  z-index: 1;
}

.error-text {
  position: absolute;
  bottom: -18px;
  color: #ee0505;
  margin: 0;
  font-size: 12px;
}

.detail-form {
  display: grid;
  grid-template: auto / 1fr 1fr;
  gap: 26px 29px;
}

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
  width: 100%;
  grid-column: 2/3;
  justify-self: end;
}

.form-group input {
  border: 1px solid #B7B7B7;
  font-size: 14px;
  height: 41px;
  padding-left: 14px;
  width: 100%;
}

.form-group input::placeholder {
  font-size: 14px;
}


.detail-form-page {
  padding: 48px 32px 56px;
  border: 1px solid #B7B7B7;
}

.form-popup .detail-form__title {
  font-size: 16px;
}

.detail-form__title {
  font-size: 36px;
  font-weight: 500;
}

.detail-form__subtitle {
  position: relative;
  font-size: 14px;
  color: #003469;
  max-width: 260px;
  z-index: 1;
}

.detail-form__price {
  margin-top: 22px;
  white-space: nowrap;
}

.detail-form__price span {
  font-size: 24px;
  color: #003469;
  font-weight: 500;
}

.form-popup .detail-form__price {
  font-size: 14px;
}

.form-popup .detail-form__price span {
  font-size: 16px;
}

.detail-form-price-image {
  display: flex;
  justify-content: space-between;
}

.form-popup .detail-form__image {
  max-width: 348px;
  width: 100%;
  position: relative;
  height: 217px;
  margin-top: -70px;
  z-index: 0;
}

.form-popup .detail-form__image img {
  width: 100%;
  position: absolute;
}

.detail-form__image {
  max-width: 348px;
  width: 100%;
}

.detail-form__image img {
  width: 100%;
}
</style>
<style scoped>
.policy-agreement input {
  display: none;
}

#policy-agreement + label {
  position: relative;
  cursor: pointer;
  padding-left: 32px;
  display: inline-block;
  line-height: 20px;
}

#policy-agreement + label:before {
  content: '';
  position: absolute;
  border: 1px solid #000000;
  width: 16px;
  height: 16px;
  left: 0;
  top: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#policy-agreement:checked + label:after {
  content: '';
  background: url("/images/instock/black-check.svg") 50% 50% no-repeat;
  width: 10px;
  height: 10px;
  background-size: 10px;
  position: absolute;
  left: 3px;
  top: 6px;
}

.policy-agreement label {
  position: relative;
  font-size: 14px;
}

.detail-form__price-old {
  font-size: 14px;
  text-decoration: line-through;
}

@media (max-width: 1279px) {
  .detail-form__image {
    max-width: 600px;
  }
}

@media (max-width: 767px) {
  .detail-form-page {
    padding: 18px;
    margin-top: 30px;
  }

  .detail-form-price-image {
    flex-direction: column;
  }

  .detail-form {
    display: block;
  }

  .form-group,
  .policy-agreement {
    margin-bottom: 26px;
  }

  .form-popup .detail-form__image {
    margin-top: 0;
  }

  .detail-form-page.form-popup {
    overflow: auto;
  }
}
</style>
