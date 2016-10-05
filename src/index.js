function plugin (Vue, options = {}) {
  Object.defineProperties(Vue.prototype, {
    $breadcrumbs: {
      get: function () {
        var crumbs = []
        for (var i = 0; i < this.$route.matched.length; i++) {
          if (this.$route.matched[i].meta && this.$route.matched[i].meta.breadcrumb) {
            crumbs.push(this.$route.matched[i])
          }
        }
        return crumbs
      }
    }
  })
  
  Vue.component('breadcrumbs', {
    template: '<nav class="breadcrumbs" v-if="$breadcrumbs.length"> <ul> <li v-for="(crumb, i) in $breadcrumbs"> <router-link :to=" { path: crumb.path }">{{ crumb.meta.breadcrumb }}</router-link> </li> </ul> </nav>'
  })
}

plugin.version = '0.3.1'

export default plugin
