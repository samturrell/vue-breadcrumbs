'use strict';

module.exports = {
    install: function(Vue, options) {
        Vue.component('breadcrumbs', require('./vue-breadcrumbs.js'))
    }
}