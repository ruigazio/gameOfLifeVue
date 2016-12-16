// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Life from './Life'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Life :x="40" :y="40"/>',
  components: { Life }
})
