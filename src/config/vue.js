import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import BootstrapVue from 'bootstrap-vue'

// Bootstrap-Vue styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// bootstrap-vue
// Bootstrap components and directives
Vue.use(BootstrapVue)

// vue-meta
// supports `meta` object returned with `module.defaults`
Vue.use(Meta)

// vuex
// State management library
Vue.use(Vuex)
