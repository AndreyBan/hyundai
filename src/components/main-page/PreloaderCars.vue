<template>
    <div class="car-item">
      <div class="car-item__title c-preload"></div>
      <div class="car-item__price c-preload"></div>
      <div class="car-item__img c-preload--big"></div>
      <a class="btn-link c-preload--big" href="#" @click.prevent></a>
      <div class="wrap-credit c-preload">
        <span class="credit__text"></span>
        <span class="credit__price"></span>
      </div>
    </div>
</template>

<script>
export default {
  name: "PreloaderCars"
}
</script>

<style scoped>
.car-item {
  padding: 28px 32px;
  border: 1px solid #E4DCD3;
  margin-bottom: 32px;
}
.car-item__title{
  height: 10px;
  width: 150px;
  background-color: #E4DCD3;
  margin-bottom: 5px;
}
.wrap-credit{
  margin-top: 12px;
  height: 8px;
  width: 100px;
  background-color: #E4DCD3;
}
.car-item__price{
  background-color: #E4DCD3;
  height: 8px;
  width: 100px;
}
.car-item__img {
  width: 100%;
  height: 164px;
  background-color: #E4DCD3;
  margin: 16px 0;
}
.btn-link{
  display: block;
  background-color: #E4DCD3;
  width: 292px;
  height: 48px;
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
