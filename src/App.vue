<template>
  <div id="app" v-cloak>
    <keep-alive :include="$route.meta.keepComponents">
      <router-view />
    </keep-alive>
  </div>
</template>

<style>
@import url('~vue-select/dist/vue-select.css');

* {
  box-sizing: border-box;
}

[v-cloak] {
  display: none;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.container {
  max-width: 1560px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

label {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vs__dropdown-option {
  height: auto;
  line-height: 18px;
  word-wrap: break-word;
  white-space: normal;
  border-top: 1px solid #dadada;
  padding: 6px 8px;

}

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

.btn.btn--blue-dark {
  background-color: #003469;
}

.btn--blue-dark:hover {
  background-color: #0C4F94;
}

.model-filter .vs--searchable .vs__dropdown-toggle {
  background-color: transparent;
}

.model-filter .vs__dropdown-menu {
  background-color: #e7e7e7;
  font-size: 14px;
}


.model-filter .vs__actions:before {
  content: "";
  position: absolute;
  width: 9px;
  height: 5px;
  right: 16px;
  background: url("/images/instock/select-arrow.svg") 50% 50% no-repeat;
  background-size: 9px;
  transition-duration: .35s;
}

.model-filter .v-select {
  width: 100%;
}

.model-filter .select-wrap {
  width: 100%;
  max-width: 229px;
}
.vs__actions {
  cursor: pointer;
}

.vs__clear {
  margin-right: 30px;
}

.vs__search, .vs__search:focus {
  padding-left: 16px;
  padding-right: 0;
  color: #666666;
}

.vs__search::-webkit-input-placeholder {
  color: #666666;
  font-size: 14px;
}

.vs__search::-moz-placeholder {
  color: #666666;
  font-size: 14px;
}

.vs__search:-ms-input-placeholder {
  color: #666666;
  font-size: 14px;
}

.vs__search::-ms-input-placeholder {
  color: #666666;
  font-size: 14px;
}

.vs__search::placeholder {
  color: #666666;
  font-size: 14px;
}

.model-filter .vs--searchable .vs__dropdown-toggle {
  overflow: hidden;
}

.vs__dropdown-toggle {
  height: 43px;
  border-radius: 0;
}

.vs__selected-options {
  font-size: 14px;
  color: #CFD0D0;
}

.vs__open-indicator {
  display: none;
}

.vs__actions {
  width: 56px;
  position: relative;
}

.v-select {
  color: #666666;
}

@media only screen and (max-width: 1262px) {
  .container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 767px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .btn {
    -webkit-transition: .2s !important;
    transition: .2s !important;
  }
}
</style>
