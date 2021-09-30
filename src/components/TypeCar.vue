<template>
    <ul class="filter-tabs">
      <li v-for="(elem, i) in tabList" :key="i" class="filter-tabs__item" :class="{'active' : elem.active}" ref="tab"
          @click="setActive(elem)">
        {{ elem.name }}
      </li>
    </ul>
</template>

<script>
export default {
  name: 'typeCar',
  data() {
    return {
      tabList: {
        allModel: {
          name: "Все модели",
          active: true
        },
        cities: {
          name: "Городские",
          active: false
        },
        crossovers: {
          name: "Кроссоверы",
          active: false
        },
        minibus: {
          name: "Микроавтобусы",
          active: false
        },
      }
    }
  },
  methods: {
    setActive(el) {
      for (let i in this.tabList){
        this.tabList[i].active = false;
      }

      el.active = true;
    }
  }
}
</script>

<style scoped>
.filter-tabs{
  padding: 0;
  margin: 0;
}
.filter-tabs__item {
  display: inline-block;
  padding: 14px 20px;
  color: #000;
  cursor: pointer;
}

.filter-tabs__item.active {
  color: #fff;
  background-color: #97847A;
}
@media (max-width: 1024px) {
  .filter-tabs{
    display: flex;
    justify-content: space-between;
  }
}
@media (max-width: 767px) {
  .filter-tabs{
    flex-wrap: wrap;
  }
  .filter-tabs__item {
    padding: 14px 0;
    width: 50%;
    text-align: center;
  }
}
</style>
