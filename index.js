'use strict';

module.exports = {
    install: function(Vue, options) {
        Vue.component('breadcrumbs', {
            name:     'breadcrumbs',
            template: '<nav class="breadcrumbs" v-if="$route.matched.length"> <ul> <template v-for="(i, crumb) in $route.matched"> <template v-if="shouldShow(crumb)"> <li> <a v-link="{  name: crumb.handler.name,  params: crumb.params,  exact: true  }">{{ crumb.handler.breadcrumb }}</a> </li> </template> </template> </ul> </nav>',
            methods:  {
                shouldShow: function(crumb) {
                    return (crumb.handler && crumb.handler.breadcrumb);
                }
            }
        });
    }
}