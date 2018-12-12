function install (Vue, options) {
  const getMatchedRoutes = routes => {
    // Convert to an array if Vue 1.x
    if (parseFloat(Vue.version) < 2) {
      routes = Object.keys(routes)
        .filter(key => !isNaN(key))
        .map(key => routes[key])
    }

    return routes
  }

  // Add the $breadcrumbs property to the Vue instance
  Object.defineProperty(Vue.prototype, '$breadcrumbs', {
    get() {
      return getMatchedRoutes(this.$route.matched).filter(route =>
        (parseFloat(Vue.version) < 2)
          ? route.handler && route.handler.breadcrumb
          : route.meta && route.meta.breadcrumb
      )
    }
  })

  const defaults = {
    registerComponent: true,

    methods: {
      // Return the correct prop data
      linkProp(crumb) {
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
      },

      resolveCrumbName(crumb) {
        const crumbName = (parseFloat(Vue.version) < 2)
          ? crumb.handler.breadcrumb
          : crumb.meta.breadcrumb

        return typeof crumbName === 'function'
          ? crumbName(this.$route.params)
          : crumbName
      }
    },

    template: `
      <nav class="breadcrumbs" v-if="$breadcrumbs.length">
        <ul>
          <li v-for="crumb in $breadcrumbs">
            <router-link :to="linkProp(crumb)">{{ resolveCrumbName(crumb) }}</router-link>
          </li>
        </ul>
      </nav>
    `
  }

  const componentOptions = Object.assign(defaults, options)

  // Add a default breadcrumbs component
  if (componentOptions.registerComponent) {
    Vue.component('breadcrumbs', componentOptions)
  }
}

export default {
  install: install,
  version: '0.3.1'
}
