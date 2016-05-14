function plugin (Vue, options = {}) {
  Object.defineProperties(Vue.prototype, {
    $breadcrumbs: {
      get: function () {
        var crumbs = []
        for (var i = 0; i < this.$route.matched.length; i++) {
          if (this.$route.matched[i].handler && this.$route.matched[i].handler.breadcrumb) {
            crumbs.push(this.$route.matched[i])
          }
        }
        return crumbs
      }
    }
  })
  
  Vue.component('breadcrumbs', {
    template: '<nav class="breadcrumbs" v-if="$breadcrumbs.length"> <ul> <li v-for="(i, crumb) in $breadcrumbs"> <a v-link="crumb">{{ crumb.handler.breadcrumb }}</a> </li> </ul> </nav>'
  })
}

plugin.version = '0.2.2'

export default plugin
