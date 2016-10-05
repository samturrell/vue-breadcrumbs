// define some components
var Foo = Vue.extend({
  template: '<p>This is foo!</p>'
})

var Bar = Vue.extend({
  template: '<p>This is bar!</p>'
})

var Page = Vue.extend({
  template: '<p>This is a page!</p>'
})

Vue.use(VueBreadcrumbs)

// the router needs a root component to render.
// for demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({
  mounted: function() {
    if (window.console && window.console.log) {
      console.log(this.$breadcrumbs);
    }
  }
})
Vue.component(App);
// define some routes.
// each route should map to a component.
// we'll talk about nested routes later.
var routes = [
  {
    path: '/',
    component: Page,
    meta: {
      breadcrumb: 'Home Page'
    }
  },
  {
    path: '/foo',
    component: Foo,
    meta: {
      breadcrumb: 'Foo Page'
    }
  },
  {
    path: '/bar',
    component: Bar,
    meta: {
      breadcrumb: 'Bar Page'
    }
  },
  {
    path: '/about',
    component: Page,
    meta: {
      breadcrumb: 'About Us'
    },
    children: [
      {
        path: 'foo',
        component: Foo,
        meta: {
          breadcrumb: 'Foo About'
        }
      },
      {
        path: 'bar',
        component: Bar,
        meta: {
          breadcrumb: 'Bar About'
        }
      },
    ]
  }
]

// create a router instance
// you can pass in additional options here, but
// let's keep it simple for now.
var router = new VueRouter({
  routes
})

// now we can start the app!
// router will create an instance of App and mount to
// the element matching the selector #app.
new App({
  router
}).$mount('#app')
