function renderRoutesForV1 (routes) {
  var v1routes = {}

  routes.forEach((route) => {
    var v1route = route
    if (route.children) {
      v1route.subRoutes = renderRoutesForV1(v1route.children)
    }
    v1route.breadcrumb = v1route.meta.breadcrumb
    delete v1route.meta
    var routePath = route.path

    if (routePath.substr(0, 1) !== '/') {
      routePath = '/' + routePath
    }

    v1routes[routePath] = route
  })

  return v1routes
}

Vue.use(VueBreadcrumbs)

// Route components
var Home = {
  path: '/',
  component: {
    template: '<p>Home page</p>'
  },
  meta: {
    breadcrumb: 'Home Page'
  }
}

var Foo = {
  path: '/foo',
  component: {
    template: '<p>Foo!</p>'
  },
  meta: {
    breadcrumb: 'Foo Page'
  }
}

var Bar = {
  path: '/bar',
  component: {
    template: '<p>Bar!</p>'
  },
  meta: {
    breadcrumb: 'Bar Page'
  }
}

var AboutFoo = {
  path: 'foo',
  component: {
    template: '<p>About our foo!</p>'
  },
  meta: {
    breadcrumb: 'Foo About'
  }
}

var AboutBar = {
  path: 'bar',
  component: {
    template: '<p>About our foo!</p>'
  },
  meta: {
    breadcrumb: 'Bar About'
  }
}

var About = {
  path: '/about',
  component: {
    template: '<div>' +
              '<p>About us!</p>' +
              '<router-view></router-view>' +
              '</div>'
  },
  meta: {
    breadcrumb: 'About Us'
  },
  children: [
    AboutFoo,
    AboutBar
  ]
}


var Item = {
  path: ':id',
  name: 'store-item',
  component: {
    template: '<p>test This is item {{ $route.params.id }}</p>'
  },
  meta: {
    breadcrumb: 'View item'
  }
}

var Items = {
  path: '/items',
  component: {
    template: '<div>' +
              '<p>Our items!</p> ' +
              '<router-view></router-view>' +
              '</div>'
  },
  meta: {
    breadcrumb: 'Items'
  },
  children: [
    Item
  ]
}

var routes = [
  Home,
  Foo,
  Bar,
  About,
  Items
]

if (parseFloat(Vue.version) < 2) {
  Vue.config.debug = true
  Vue.config.devtools = true
  // Create a v2 router-link component for
  // backwards compatibility
  Vue.component('router-link', {
    props: ['to'],
    template: '<a v-link="to"><slot></slot></a>'
  })
  // the router needs a root component to render.
  // for demo purposes, we will just use an empty one
  // because we are using the HTML as the app template.
  var App = Vue.extend({
    ready: function () {
      if (window.console && window.console.log) {
        console.log(this.$breadcrumbs)
      }
    },

    filters: {
        json: function (val) {
            return JSON.stringify(val, null, 2)
        }
    }
  })

  // create a router instance
  // you can pass in additional options here, but
  // let's keep it simple for now.
  var router = new VueRouter()
  router.map(renderRoutesForV1(routes))

  // now we can start the app!
  // router will create an instance of App and mount to
  // the element matching the selector #app.
  router.start(App, '#app')
} else {
  // create a router instance
  // you can pass in additional options here, but
  // let's keep it simple for now.
  const router = new VueRouter({
    routes
  })

  // now we can start the app!
  // router will create an instance of App and mount to
  // the element matching the selector #app.
  const app = new Vue({
    router,
    mounted: function () {
      if (window.console && window.console.log) {
        console.log(this.$breadcrumbs)
      }
    }
  }).$mount('#app')
}
