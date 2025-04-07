import './styles/index.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara'
import { usePassThrough } from 'primevue/passthrough'

import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

const CustomPreset = usePassThrough({
  mergeSections: true,
  mergeProps: false,
})

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
  pt: CustomPreset,
})
app.use(VueApexCharts)
app.use(ToastService)
app.use(router)

app.mount('#app')

import './plugins/chart.js'
