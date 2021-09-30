<template>
  <form action="" class="form-request" @submit.prevent="checkForm">
    <div class="container">
      <h3 class="form-title">Не нашли то, что искали?</h3>
      <p class="form-subtitle">Оставьте, пожалуйста, свои контактные данные. Мы свяжемся с Вами в ближайшее время и
        поможем подобрыть нужное
        авто.</p>
      <div class="block-fields">
        <div class="form-group">
          <input type="text" placeholder="Имя и Фамилия*" v-model.lazy.trim="fields.name">
          <p v-if="$v.fields.name.$error" class="error-text">*Обязательное поле</p>
        </div>
        <div class="form-group">
          <v-select placeholder="Выберите дилерский центр*" :options="options" v-model.lazy="fields.dealer"></v-select>
          <p v-if="$v.fields.dealer.$error" class="error-text">*Обязательное поле</p>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Телефон*" v-model.lazy="fields.phone" v-mask="{mask: '+7(999)999-99-99', showMaskOnHover: false}">
          <p v-if="$v.fields.phone.$error" class="error-text">*Обязательное поле</p>
        </div>
        <div class="form-group" >
          <input type="text" placeholder="Добавить комментарий" v-model.lazy.trim="fields.comment">
        </div>
        <div class="form-bottom-left">
          <div class="policy-agreement">
            <input type="checkbox" name="agreement" id="policy-agreement" v-model="fields.agree">
            <label for="policy-agreement">
              Я согласен на обработку данных
              <br><a href="#">Смотреть правила</a>
            </label>
          </div>
          <div class="require-text">*Поля, обязательные для заполнения</div>
        </div>
        <input type="submit" class="btn btn--dark" value="Отправить заявку">
      </div>
    </div>
  </form>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators';
const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)
Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

export default {
  name: "FormRequest",
  mixins: [validationMixin],
  validations: {
    fields: {
      name: {required},
      phone: {required},
      dealer: {required},
    }
  },
  data() {
    return {
      options: [
        "test 1",
        "test 2"
      ],
      fields:{
        name: "",
        phone: "",
        comment: "",
        dealer: "",
        agree: false
      }
    }
  },
  methods: {
    checkForm() {
      this.$v.fields.$touch();

      if (!this.$v.fields.$error && this.fields.agree){
        console.log("validate")
      }

    }
  }
}
</script>
<style>
.vs__open-indicator {
  display: none;
}

.vs__actions {
  width: 56px;
  position: relative;
}

.vs__actions:before {
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

.v-select {
  color: #666666;
}
.vs--searchable .vs__dropdown-toggle {
  background-color: #CFD0D0;
}
.vs__dropdown-menu {
  background-color: #CFD0D0;
}

.vs__clear {
  margin-right: 30px;
}

.vs__search, .vs__search:focus {
  padding-left: 16px;
  padding-right: 0;
  color: #666666;
}

.vs__search::placeholder {
  color: #666666;
  font-size: 14px;
}

.vs__dropdown-toggle {
  height: 41px;
  border-radius: 0;
}

.vs__selected-options {
  font-size: 14px;
  color: #CFD0D0;
}
</style>

<style scoped>
.form-group{
  position: relative;
}

.error-text{
  position: absolute;
  bottom: -17px;
  color: #ee0505;
  margin: 0;
  font-size: 12px;
}
.policy-agreement {
  color: #ffffff;
  font-size: 14px;
}

#policy-agreement + label{
  position: relative;
  cursor: pointer;
  padding-left: 32px;
  display: inline-block;
}

#policy-agreement + label:before{
  content: '';
  position: absolute;
  border: 1px solid #fff;
  width: 16px;
  height: 16px;
  left: 0;
  box-sizing: border-box;
}

#policy-agreement:checked + label:after{
  content: '';
  background: url("/images/instock/checked.svg") 50% 50% no-repeat;
  width: 10px;
  height: 10px;
  background-size: 10px;
  position: absolute;
  left: 3px;
  top: 2px;
}
.has-error #policy-agreement + label:before{
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

.btn--dark {
  transition-duration: .2s;
  background-color: #00AAD2;
}

.btn--dark:hover {
  background-color: #20C6ED;
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
.form-group{
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
  .form-title{
    font-size: 16px;
  }
  .form-request {
    margin-top: 30px;
    padding: 14px 0 27px;
    background-color: #000000;
  }
  .btn{
    width: 100%;
  }
}
</style>
