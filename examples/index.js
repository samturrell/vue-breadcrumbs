Vue.config.debug = true;

// define some components
var Foo = Vue.extend({
  template: '<p>This is foo!</p>'
})

var Bar = Vue.extend({
  template: '<p>This is bar!</p>'
})

var News = Vue.extend({
  route: {
    setBreadcrumb: function() {
      this.$breadcrumb = 'News (2)';
    },
    activate: function() {

    }
  },
    template: '<p><ul><li><a v-link="{ path: \'/news/article1\' }">Article 1</a></li><li><a v-link="{ path: \'/news/article2\' }">Article 2</a></li></ul></p><router-view></router-view>'
})

var ArticleOne = Vue.extend({
  route: {
    activate: function() {
        console.log("a 1 active");
      this.$breadcrumb = 'Article 1 title, yo';
    }
  },
  template: '<p><ul><li><a v-link="{ path: \'/news/article1/comments\' }">Comments</a></li></ul></p><router-view></router-view>'
})

var ArticleTwo = Vue.extend({
  route: {
    activate: function() {
      this.$breadcrumb = 'Article 2 title, yo';
    }
  },
  template: '<p>Article 2</p>'
})

var Comments = Vue.extend({
  template: '<p>Comments!</p>'
})

var Page = Vue.extend({
  template: '<p>This is a page!</p>',
  route: {
    activate: function() {
      this.$breadcrumb = Date();
    }
  }
})


// the router needs a root component to render.
// for demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({
  ready: function() {
    if (window.console && window.console.log) {
      console.log(this.$breadcrumbs);
    }
  }
})

// create a router instance
// you can pass in additional options here, but
// let's keep it simple for now.
var router = new VueRouter()
routes = {
  '/': {
    breadcrumb: 'Home Page',
    component: Page,
  },
  '/foo': {
    component: Foo,
    breadcrumb: 'Foo Page'
  },
  '/news': {
    component: News,
    breadcrumb: 'News',
    subRoutes: {
      '/article1': {
        component: ArticleOne,
        breadcrumb: 'Article 1 Placeholder',
        subRoutes: {
            '/comments': {
                component: Comments,
                breadcrumb: 'Comments'
            }
        }
      },
      '/article2': {
        component: ArticleTwo,
        breadcrumb: 'Article 2 Placeholder'
      },
    }
  }
};
Vue.use(VueBreadcrumbs, routes);


// define some routes.
// each route should map to a component.
// we'll talk about nested routes later.

router.map(Vue.routes)

// now we can start the app!
// router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
