function install (Vue, options) {
  function getMatchedRoutes (routes) {
    // Convert to an array if Vue 1.x
    if (parseFloat(Vue.version) < 2) {
      routes = (Object.keys(routes)).filter(function (key) {
        return !isNaN(key)
      }).map(function (key) {
        return routes[key]
      })
    }

    return routes
  }

  // Add the $breadcrumbs property to the Vue instance
  Object.defineProperty(Vue.prototype, '$breadcrumbs', {
    get: function get () {
      var crumbs = []

      var matched = getMatchedRoutes(this.$route.matched)

      matched.forEach(function (route) {
        // Backwards compatibility
        var hasBreadcrumb = (parseFloat(Vue.version) < 2)
          ? route.handler && route.handler.breadcrumb
          : route.meta && route.meta.breadcrumb
          
        if (hasBreadcrumb) {
          crumbs.push(route)
        }
      })
        
      return crumbs
    }
  })

  var defaults = {
    methods: {
      // Return the correct prop data
      linkProp: function (crumb) {
        // If it's a named route, we'll base the route
        // off of that instead
        if (crumb.name || (crumb.handler && crumb.handler.name)) {
          return {
            name: crumb.name || crumb.handler.name,
            params: this.$route.params
          }
        }

        return {
          path: (crumb.handler && crumb.handler.fullPath)
              ? crumb.handler.fullPath
              : crumb.path,
          params: this.$route.params
        }
      }
    },

    filters: {
      // Display the correct breadcrumb text
      // depending on the Vue version
      crumbText: function (crumb) {
        return (parseFloat(Vue.version) < 2) ? crumb.handler.breadcrumb : crumb.meta.breadcrumb
      }
    },

    template: '<nav class="breadcrumbs" v-if="$breadcrumbs.length"> ' +
    '<ul> ' +
    '<li v-for="crumb in $breadcrumbs"> ' +
    '<router-link :to="linkProp(crumb)">{{ crumb | crumbText }}</router-link> ' +
    '</li> ' +
    '</ul> ' +
    '</nav>'
  }

  // Add a default breadcrumbs component
  Vue.component('breadcrumbs', Object.assign(defaults, options))
}

export default {
  install: install,
  version: '0.3.1'
}
