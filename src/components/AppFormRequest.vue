<template>
  <form action=""
        class="form-request"
        @submit.prevent="checkForm"
  >

    <div class="container">
      <h3 class="form-title">Не нашли то, что искали?</h3>
      <p class="form-subtitle">Оставьте, пожалуйста, свои контактные данные. Мы свяжемся с Вами в ближайшее время и
        поможем подобрыть нужное
        авто.</p>
      <div class="block-fields" :class="{'show-error': $v.fields.$error}">
        <div class="form-group">

          <input type="text"
                 placeholder="Имя и Фамилия*"
                 v-model.lazy.trim="fields.name"
          >

          <p v-if="!$v.fields.name.required" class="error-text"> *Обязательное поле </p>
          <p v-if="!$v.fields.name.cyrillic" class="error-text"> *Используйте русские буквы </p>
        </div>
        <div class="form-group">

          <v-select placeholder="Выберите дилерский центр*"
                    :options="dealers"
                    v-model="fields.dealer"
          >

            <template #no-options>
              Ничего не найдено
            </template>
          </v-select>

          <p v-if="$v.fields.dealer.$error" class="error-text">*Обязательное поле</p>
        </div>
        <div class="form-group">

          <input type="text"
                 placeholder="Телефон*"
                 v-model="fields.phone"
                 v-mask="{mask: '+7(999)999-99-99', showMaskOnHover: false}"
                 @input="maskCheck"
          >

          <p v-if="$v.fields.phone.$error" class="error-text">*Обязательное поле</p>
        </div>
        <div class="form-group">

          <input type="text"
                 placeholder="Добавить комментарий"
                 v-model.lazy.trim="fields.comment"
          >

        </div>
        <div class="form-bottom-left">
          <div class="policy-agreement">
            <input type="checkbox"
                   name="agreement"
                   id="policy-agreement"
                   v-model="fields.agree"
            >

            <label for="policy-agreement"
                   :class="{'no-check': !fields.agree}">
              Я согласен на обработку данных
              <br><a href="#">Смотреть правила</a>
            </label>

          </div>
          <div class="require-text">*Поля, обязательные для заполнения</div>
        </div>
        <input type="submit"
               class="btn btn--dark"
               value="Отправить заявку"
        >
      </div>
    </div>
  </form>
</template>

<script>
import Vue from "vue";
import {validationMixin} from 'vuelidate'
import {required, minLength} from 'vuelidate/lib/validators';
import {mixinValidates} from "./mixins/AppMixins";

const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask);

const cyrillic = value => !/[^а-яё\s]/i.test(value);

export default {
  name: "AppFormRequest",
  mixins: [validationMixin, mixinValidates],
  validations: {
    fields: {
      name: {required, cyrillic},
      phone: {required, minLength: minLength(10)},
      dealer: {required},
      agree: {required}
    }
  },
  data: () => ({
    dataDealers: {},
    fields: {
      name: "",
      phone: "",
      comment: "",
      dealer: "",
      agree: false
    }
  }),
  methods: {
    setFieldDealer(value) {
      this.fields.dealer = value;
    },
  },
  computed: {
    dealers() {
      let dealerNames = [];

      for (const i in this.dataDealers) {
        dealerNames.push(this.dataDealers[i]["UF_NAME"]);
      }
      if (dealerNames.length === 1) {
        this.setFieldDealer(dealerNames[0]);
      }
      return dealerNames;
    }
  },
  mounted() {
    fetch('https://agat-hyundai.ru/ajax/api_instock.php?data=dealers', {method: "POST"})
        .then(res => res.json())
        .then(res => {
          if (res["dealers"]) {
            this.dataDealers = res["dealers"];
          }
        })
        .catch(e => {
          console.log("Error message: " + e.message)
        })

    if (this.get_cookie('_ym_uid')) {
      this.fields['_ym_uid'] = this.get_cookie('_ym_uid');
    }
    if (this.get_cookie('_ga')) {
      this.fields['_ga'] = this.getGa();
    }
  }
}
</script>
<style>

.form-request .vs__actions:before {
  content: "";
  position: absolute;
  width: 14px;
  height: 10px;
  right: 16px;
  background: url("/images/instock/select-arrow.svg") 50% 50% no-repeat;
  transition-duration: .35s;
}

.vs--open .vs__actions:before {
  transform: rotate(180deg);
}


.form-request .vs--searchable .vs__dropdown-toggle {
  background-color: #CFD0D0;
}

.form-request .vs__dropdown-menu {
  background-color: #CFD0D0;
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
  border: 1px solid #fff;
  width: 16px;
  height: 16px;
  left: 0;
  top: 3px;
  box-sizing: border-box;
}

.show-error #policy-agreement + label.no-check:before {
  border: 1px solid #ee0505;
}

#policy-agreement:checked + label:after {
  content: '';
  background: url("/images/instock/checked.svg") 50% 50% no-repeat;
  width: 10px;
  height: 10px;
  background-size: 10px;
  position: absolute;
  left: 3px;
  top: 5px;
}

.btn.btn--dark {
  transition-duration: .2s;
  background-color: #00AAD2;
}

.btn--dark:hover {
  background-color: #20C6ED;
}
</style>

<style scoped>
.form-group {
  position: relative;
}

.error-text {
  position: absolute;
  bottom: -18px;
  color: #ee0505;
  margin: 0;
  font-size: 12px;
  display: none;
}

.show-error .error-text {
  display: block;
}

.policy-agreement {
  color: #ffffff;
  font-size: 14px;
}

.has-error #policy-agreement + label:before {
  border: 1px solid #ee0505;
}

.policy-agreement a {
  color: #ffffff;
  text-decoration: underline;
  font-size: 14px;
}

.require-text {
  color: #B7B7B7;
  margin-top: 10px;
  font-size: 14px;
}

.btn {
  padding: 17px 40px;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  border: none;
  justify-self: end;
  align-self: start;
  border-radius: 0;
  font-size: 16px;
}

.form-request {
  margin-top: 56px;
  padding: 52px 0;
  background: url("/images/instock/bg-form.jpg") 0 0 no-repeat;
  background-size: cover;
}

#policy-agreement {
  display: none;
}

.form-title {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 24px;
  color: #fff;
}

.form-subtitle {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 30px;
  color: #fff;
}

.block-fields {
  display: grid;
  grid-template: auto / 360px 360px;
  gap: 26px 32px;
}

.form-group {
  margin-bottom: 0;
}

.form-group input {
  width: 100%;
  background-color: #CFD0D0;
  height: 41px;
  border: none;
  font-size: 14px;
  padding-left: 16px;
  color: #666666;
}

.form-group input::placeholder {
  font-size: 14px;
}

@media (max-width: 1024px) {
  .block-fields {
    grid-template: auto / 1fr 1fr;
    gap: 26px 8px;
  }
}

@media (max-width: 767px) {
  .block-fields {
    grid-template: auto / 1fr;
    gap: 26px 0;
  }

  .form-title {
    font-size: 16px;
  }

  .form-request {
    margin-top: 30px;
    padding: 14px 0 27px;
    background-color: #000000;
  }

  .btn {
    width: 100%;
  }
}
</style>
