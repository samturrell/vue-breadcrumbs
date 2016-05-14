# vue-breadcrumbs

Vue breadcrumbs builds on the official vue-router package to provide simple breadcrumbs. 

# Usage

```
<script src="../dist/vue-breadcrumbs.min.js"></script>
```

```
Vue.use(VueBreadcrumbs)
```

or with browserify/bundler:

```sh
$ npm install vue-plugin-boilerplate
```

```
var VueBreadcrumbs = require('vue-breadcrumbs')

Vue.use(VueBreadcrumbs)
```

Define the matching breadcrumb text in your vue-router routes as the `breadcrumb:` property of a route or subRoute, e.g.:

```
router.map({
  '/': {
    component: Page,
    breadcrumb: 'Home Page',
    subRoutes: {
      '/foo': {
        component: Foo,
        breadcrumb: 'Foo Page'
      },
      '/bar': {
        component: Bar,
        breadcrumb: 'Bar Page'
      }
    }
  }
})
```

You can then render the breadcrumbs using the included <breadcrumbs> component or using your own markup logic with the `this.$breadcrumbs()` method which will return an array of active routes.

# License

[MIT](http://opensource.org/licenses/MIT)
