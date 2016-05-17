function plugin (Vue, options = {}) {
  Object.defineProperties(Vue.prototype, {
    $breadcrumbs: {
      get: function () {
        var crumbs = [];
        for (var i = 0; i < this.$route.matched.length; i++) {
          if (this.$route.matched[i].handler && this.$route.matched[i].handler.breadcrumb) {
            crumbs.push(this.$route.matched[i]);
          }
        }
        return crumbs;
      },
    },
    $breadcrumb: {
      set: function(breadcrumb) {
        if (this.$route.matched.length) {
          // Router object is frozen so won't trigger 
          // an update. How do I get around this?
          this.$route.matched[0].handler.breadcrumb = breadcrumb;
        }
      }
    }
  })
  
  Vue.component('breadcrumbs', {
    template: '<nav class="breadcrumbs" v-if="$breadcrumbs.length"> <ul> <li v-for="(i, crumb) in $breadcrumbs"> <a v-link="crumb">{{ crumb.handler.breadcrumb }}</a> </li> </ul> </nav>'
  })
}

plugin.version = '0.3.1'

export default plugin
