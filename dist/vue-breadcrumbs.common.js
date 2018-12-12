/*!
 * vue-breadcrumbs v1.2.0
 * (c) 2018 Sam Turrell
 * Released under the MIT License.
 */
'use strict';

function install(Vue, options) {
  var getMatchedRoutes = function getMatchedRoutes(routes) {
    // Convert to an array if Vue 1.x
    if (parseFloat(Vue.version) < 2) {
      routes = Object.keys(routes).filter(function (key) {
        return !isNaN(key);
      }).map(function (key) {
        return routes[key];
      });
    }

    return routes;
  };

  // Add the $breadcrumbs property to the Vue instance
  Object.defineProperty(Vue.prototype, '$breadcrumbs', {
    get: function get() {
      return getMatchedRoutes(this.$route.matched).filter(function (route) {
        return parseFloat(Vue.version) < 2 ? route.handler && route.handler.breadcrumb : route.meta && route.meta.breadcrumb;
      });
    }
  });

  var defaults = {
    registerComponent: true,

    methods: {
      // Return the correct prop data
      linkProp: function linkProp(crumb) {
        // If it's a named route, we'll base the route
        // off of that instead
        if (crumb.name || crumb.handler && crumb.handler.name) {
          return {
            name: crumb.name || crumb.handler.name,
            params: this.$route.params
          };
        }

        return {
          path: crumb.handler && crumb.handler.fullPath ? crumb.handler.fullPath : crumb.path,
          params: this.$route.params
        };
      },
      resolveCrumbName: function resolveCrumbName(crumb) {
        var crumbName = parseFloat(Vue.version) < 2 ? crumb.handler.breadcrumb : crumb.meta.breadcrumb;

        return typeof crumbName === 'function' ? crumbName(this.$route.params) : crumbName;
      }
    },

    template: '\n      <nav class="breadcrumbs" v-if="$breadcrumbs.length">\n        <ul>\n          <li v-for="crumb in $breadcrumbs">\n            <router-link :to="linkProp(crumb)">{{ resolveCrumbName(crumb) }}</router-link>\n          </li>\n        </ul>\n      </nav>\n    '
  };

  var componentOptions = Object.assign(defaults, options);

  // Add a default breadcrumbs component
  if (componentOptions.registerComponent) {
    Vue.component('breadcrumbs', componentOptions);
  }
}

var index = {
  install: install,
  version: '0.3.1'
};

module.exports = index;