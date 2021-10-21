<template>
  <div class="extra-options">
    <div class="extra-options__title">
      Особенности
    </div>
    <div class="extra-options__list">
      <OptionItem v-for="(opt, i) in TestOptions"
                  :key="i"
                  :name="opt.name"
                  :list="opt.optionList"/>
    </div>
  </div>
</template>

<script>
import OptionItem from "./OptionItem";
export default {
  name: "ExtraOptions",
  components: {
    OptionItem
  },
  data(){
    return {
      TestOptions: [
        {
          name: "Интерьер",
          optionList: [
              "1",
              "2"
          ],
        },
        {
          name: "Экстерьер",
          optionList: [
            "1",
            "2"
          ],
        },
        {
          name: "Безопасность",
          optionList: [
            "1",
            "2"
          ],
        },
        {
          name: "Комфорт",
          optionList: [
            "Стальные диски 15\" с шинами 185/65 R15",
            "Карман в спинке кресла переднего пассажира",
            "Воздуховоды к ногам задних пассажиров",
            "Датчик наружной температуры",
            "Карманы в задних дверях",
            "Внутренняя обшивка крышки багажника",
            "Лампы салонного освещения"
          ],
        },
      ]
    }
  }
}
</script>
<style>
.extra-options__title{
  display: inline-block;
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 6px;
  border-bottom: 1px solid #00AAD2;
  margin-bottom: 30px;
}
.extra-options__list{
  margin: 0;
  padding: 0;
  list-style: none;
}
.extra-options__list ul{
  list-style: none;
}
.extra-options__list > ul{
  margin-top: 10px;
}
.extra-options__list > li:not(:first-child){
  margin-top: 12px;
}
.extra-options__list > li{
  font-size: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E5E5;
  font-weight: 500;
  padding-left: 32px;
  position: relative;
  cursor: pointer;
}
.extra-options__list > li:after{
  content: "";
  position: absolute;
  right: 0;
  top: 3px;
  background: url("/images/instock/select-arrow.svg") 0 0 no-repeat;
  width: 15px;
  height: 9px;
  transition-duration: .2s;
}


.extra-options__list > li.open:after{
  transform: rotate(180deg);
}
.extra-options__list > li ul{
  padding-left: 0;
  max-width: 474px;
  width: 100%;
  margin-bottom: 0;
  display: none;
}
.extra-options__list > li.open ul{
  display: block;
  margin-top: 14px;
}
.extra-options__list > li ul li{
  padding-bottom: 8px;
  position: relative;
  font-weight: 400;
}
.extra-options__list > li ul li:after{
  content: '+';
  position: absolute;
  right: 0;
  color: #00AAD2;
}
</style>
