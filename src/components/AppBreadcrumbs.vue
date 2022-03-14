<template>
  <ul class="breadcrumbs-list" :class="{'desktop-show': deviceDesktop}" itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement"
        itemscope="itemscope"
        itemtype="https://schema.org/ListItem"
        class="breadcrumbs-item">
      <a  href="/"
          class="router-link-active"
          itemprop="item">
        <span itemprop="name">Главная</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <li class="breadcrumbs-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"
        v-for="(item, i) in breadcrumbs" :key="i">
    <router-link :to="item.path" itemprop="item" v-if="(i + 1) !== breadcrumbs.length">
      <span itemprop="name">{{ item.name }}</span>
    </router-link>
    <span itemprop="name" v-else>{{ item.name }}</span>
    <meta itemprop="position" :content="i + 2">
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppBreadcrumbs",
  props: {
    propChainItem: {
      type: Array
    }
  },
  data() {
    return {
      chainItem: this.propChainItem,
      deviceDesktop: false,
      breadcrumbs: [
        {
          name: "Атомобили Hyundai в наличии",
          path: "/"
        }
      ]
    }
  },
  computed: {
    finishedCrumbs() {
      return this.chainItem.map(el => {
        el.path = encodeURI(el.path);

        return el;
      });
    }
  },
  created() {
    if (matchMedia('(min-width: 768px)').matches) {
      this.deviceDesktop = true;
    }
  },
  mounted() {
    if (this.chainItem) {
      this.finishedCrumbs.forEach(el => this.breadcrumbs.push(el))
    }
  }
}
</script>

<style scoped lang="scss">
.breadcrumbs-list {
  display: none;
  list-style: none;
  padding-left: 0;
  margin: 24px 0;
}

.breadcrumbs-list.desktop-show {
  display: flex;
}

.breadcrumbs-item {
  position: relative;

  &:not(:last-child) {
    padding-right: 16px;

    &:after {
      content: "/";
      position: absolute;
      right: 6px;
    }
  }

  &:last-child {
    opacity: .6;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #333;
  }
}

@media (max-width: 991px) {
  .breadcrumbs-list {
    font-size: 14px;
  }
}
</style>
