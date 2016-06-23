/*!
 * vue-breadcrumbs v0.3.1
 * (c) 2016 Sam Turrell
 * Released under the MIT License.
 */
'use strict';

function plugin(Vue) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


  var prepareRoutes = function prepareRoutes(routes) {
    for (var route in routes) {
      Vue.util.defineReactive(routes[route], 'breadcrumb', routes[route].breadcrumb);
      if (routes[route].subRoutes) {
        routes[route].subRoutes = prepareRoutes(routes[route].subRoutes);
      }
    }

    return routes;
  };
  var routes = prepareRoutes(options);
  Vue.routes = routes;

  Object.defineProperties(Vue.prototype, {
    $breadcrumbs: {
      get: function get() {
        var crumbs = [];
        for (var i = 0; i < this.$route.matched.length; i++) {
          if (this.$route.matched[i].handler && this.$route.matched[i].handler.breadcrumb) {
            crumbs.push(this.$route.matched[i]);
          }
        }
        return crumbs;
      }
    },
    $breadcrumb: {
      set: function set(breadcrumb) {
        if (this.$route.matched.length) {
          // Router object is frozen so won't trigger
          // an update. How do I get around this?
          for (var i = this.$route.matched.length - 1; i >= 0; i--) {
            console.log(this.$route.matched[i].handler.fullPath, this.$route.path);
            if (this.$route.matched[i].handler.fullPath == this.$route.path) {
              console.log(this.$route.matched[i].handler.fullPath, this.$route.path);
              return this.$route.matched[i].handler.breadcrumb = breadcrumb;
            }
          }
        }
      }
    }
  });

  Vue.component('breadcrumbs', {
    data: function data() {
      return {
        breadcrumbs: this.$breadcrumbs
      };
    },
    template: '<nav class="breadcrumbs" v-if="$breadcrumbs.length"> <ul> <li v-for="(i, crumb) in $breadcrumbs"> <a v-link="crumb">{{ crumb.handler.breadcrumb }}</a> </li> </ul> </nav>'
  });
}

plugin.version = '0.3.1';

module.exports = plugin;