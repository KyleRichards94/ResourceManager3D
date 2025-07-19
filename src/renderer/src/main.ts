import { mount } from 'svelte'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'

import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!
})

export default app
