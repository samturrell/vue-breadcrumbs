<template>
    <nav class="breadcrumbs" v-if="$route.matched.length">
        <ul>
            <template v-for="(i, crumb) in $route.matched">
                <template v-if="shouldShow(crumb)">
                    <li>
                        <a v-link="{ 
                            name: crumb.handler.name, 
                            params: crumb.params, 
                            exact: true 
                        }">{{ crumb.handler.breadcrumb }}</a>
                    </li>
                </template>
            </template>
        </ul>
    </nav>
</template>

<style scoped>
    .breadcrumbs li {
        display: inline-block;
        vertical-align: middle;
        color: #1a2831;
        font-size: 16px;
        font-weight: 300;
    }
    .breadcrumbs li a.v-link-active {
        color: inherit;
        text-decoration: none;
    }
    .breadcrumbs li:last-child a {
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }
</style>

<script>
    module.exports = {
        name: 'breadcrumbs',

        methods: {
            shouldShow: function(crumb) {
                return (crumb.handler && crumb.handler.breadcrumb);
            }
        }
    }
</script>