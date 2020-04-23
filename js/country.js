// too be added before mounting app
import Vue from 'vue'
import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)
 
new Vue({}).$mount('#app')
// end mounting app
 
// then inside your vue components
export default Vue.extend({
  data: () => ({
    country: '',
    region: ''
  })
})
 
<template>
  <country-select v-model="country" :country="country" topCountry="US" />
  <region-select v-model="region" :country="country" :region="region" />
</template>