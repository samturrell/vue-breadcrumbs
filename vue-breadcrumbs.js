(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    install: function(Vue, options) {
        Vue.component('breadcrumbs', {
            template: '<nav class="breadcrumbs" v-if="$route.matched.length"> <ul> <template v-for="(i, crumb) in $route.matched"> <template v-if="shouldShow(crumb)"> <li> <a v-link="{  name: crumb.handler.name,  params: crumb.params,  exact: true  }">{{ crumb.handler.breadcrumb }}</a> </li> </template> </template> </ul> </nav>',
            methods:  {
                shouldShow: function(crumb) {
                    return (crumb.handler && crumb.handler.breadcrumb);
                }
            }
        });
    }
}
},{}]},{},[1]);
