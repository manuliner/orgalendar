import Vue from 'vue'
import axios from 'axios'
import * as vueConfig from '../../vue.config'

import store from '../store/index'
class ConfigService {
  async loadConfig () {
    Vue.$log.debug('load config from ' + `${vueConfig.publicPath}static/config.json`)
    return axios
      .get(`${vueConfig.publicPath}static/config.json`)
      .then(response => {
        store.dispatch('setConfig', response.data)
      })
      .catch(e => {
        Vue.$log.error(e)
      })
  }

  set (key, value) {
    // store.state.config[key] = value
  }

  get (key) {
    return window.App.$store.getters.config[key]
  }

  getApiUrl () {
    if (this.get('apiUrl')) {
      return this.get('apiUrl')
    }
    Vue.$log.error('NO API URL IN CONFIG')

    return 'http://'
  }
}

export default new ConfigService()
