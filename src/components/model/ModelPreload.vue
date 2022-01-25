<template>
<section class="preload">
  <div class="preload-filter">
    <div class="mf__title">Выбрать автомобиль</div>
    <div class="mf-selects">
      <div class="select-wrap"></div>
    </div>

  </div>
  <div class="preload-cars">
    <div class="ml-car">
      <div class="ml-car__title c-preload"></div>

      <div class="ml-car-wrap">
        <div class="ml-car-item" v-for="i in 8" :key="i">
          <div class="ml-car-item__title c-preload"></div>
          <div class="ml-car-item__subtitle c-preload"></div>
          <div class="ml-car-item__img c-preload--big" ></div>
          <div class="ml-car-price">
            <div class="ml-car-price__new c-preload"></div>
            <div class="ml-car-price__old c-preload"></div>
          </div>
          <hr class="ml-separate">
          <div class="ml-car-options">
            <div class="ml-car-options-row" v-for="i in 4" :key="i">
              <div class="ml-car-options__circle c-preload"></div>
              <div class="ml-car-options__name c-preload"></div>
              <div class="ml-car-options__value c-preload"></div>
            </div>
          </div>
          <div class="btn c-preload"></div>
          <div class="btn c-preload"></div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: "ModelPreload"
}
</script>

<style scoped lang="scss">
$bgColor: #E4DCD3;

@mixin block-preload($height, $width){
  height: $height;
  width: $width;
  background-color: $bgColor;
}

.ml-car-wrap {
  display: -ms-grid;
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr;
  gap: 32px;
}
.ml-separate {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 20px 0 16px;
}

.ml-car-item {
  background: #FFFFFF;
  box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  padding: 32px;
}

.ml-car-price {
  display: flex;
  justify-content: space-between;
}
.ml-car-options-row {
  display: -ms-grid;
  display: grid;
  grid-template: 1fr / 5% 65% 30%;
  column-gap: 8px;

  &:not(:last-child){
    margin-bottom: 32px;
  }
}

.preload-filter{
  @include block-preload(480px, 100%);
}
.ml-car__title{
  @include block-preload(18px, 300px);
  margin: 30px 0;
}
.ml-car-item__title{
  @include block-preload(16px, 150px);
  margin-bottom: 4px;
}
.ml-car-item__subtitle{
  @include block-preload(12px, 90px);
  margin-bottom: 14px;
}
.ml-car-item__img{
  @include block-preload(183px, 100%);
}
.ml-car-price{
  &__new,
  &__old{
    margin-top: 16px;
    @include block-preload(14px, 100px);
  }
}
.ml-car-options{
  &__name{
    @include block-preload(10px, 150px);
    margin-left: 16px;
    position: relative;
  }
  &__circle{
    @include block-preload(16px, 16px);
    border-radius: 50%;
    margin-top: -3px;
  }
  &__value{
    @include block-preload(10px, 80px);
  }
}
.btn{
  @include block-preload(52px, 100%);
  margin-top: 32px;
}

.c-preload,
.c-preload--big{
  position: relative;
  overflow: hidden;
}

.c-preload:before,
.c-preload--big:before{
  content: '';
  display: block;
  position: absolute;
  left: -250px;
  top: 0;
  height: 100%;
  background: linear-gradient(to right, transparent 0%, #f5eee7 50%, transparent 100%);
  animation: load 1s ease-in-out infinite;
}
.c-preload:before{
  width: 60px;
}
.c-preload--big:before{
  width: 80%;
}
@keyframes load {
  from {
    left: -250px;
  } to {
      left: 100%;
    }
}
</style>
