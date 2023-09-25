@MomsFriendlyDevCo/Vitel
========================
Various, pickable Vue@3 / Vite modules and components.

A collection of useful [Components](#components), [Directives](#directives), [Filters](#filters) and [Services](#services)

[Documentation & Demo](https://momsfriendlydevco.github.io/Vitel/)


Glossary & Terms used
---------------------
This NPM module, commit history and various other documentation surrounding it uses shorthand notation to refer to different types of export:

* [Components](#components) are referred to as a DOM like element - e.g. `<widget/>`
* [Directives](#directives) are always single strings with a `v-` prefix - e.g. `v-href`
* [Filters](#filters) are prefixed with `|` indicating its a pipable function - e.g. `|currency`
* [Services](#services) are prefixed with `$` indicating that its a globally available entity - e.g. `$toast`


Components
==========
Naming convention: `<my-component/>`
Each component is a standard Vue3 SFC file with a `<script/>`, `<template>` and optional `<style/>` block.

Components can be imported from the `@momsfriendlydevco/vitel/component/*` path.

**Example:**
```javascript
// Vue App creation preamble
import {createApp} from 'vue'
import App from './App.vue';
let app = createApp(App);

import Date from '@momsfriendlydevco/vitel/component/date';
app.component('Date', Date);
```


Directives
==========
Naming convention: `v-my-directive`
Directives are elements which can be applied in multiple to the same Vue component or DOM element.

Components can be imported from the `@momsfriendlydevco/vitel/directives/*` path.

**Example:**
```javascript
// Vue App creation preamble
import {createApp} from 'vue'
import App from './App.vue';
let app = createApp(App);

import vHref from '@momsfriendlydevco/vitel/directives/v-href';
app.directive('href', vHref);
```


Filters
=======
Naming convention: `|myFilter`
Filters are pure JavaScript functions called with a single data input + options object.

Filters can be imported from the `@momsfriendlydevco/vitel/filters/*` path.

**Example:**
```javascript
// Vue App creation preamble
import {createApp} from 'vue'
import App from './App.vue';
let app = createApp(App);

// Install Vitel against our app to provide `app.filter`
import Vitel from '@momsfriendlydevco/vitel';
app.use(Vitel);

// Import a filter
import List from '@momsfriendlydevco/vitel/filters/list';
app.filter('List', List);

// Use within vanilla JavaScript:
console.log( List(['Foo', 'Bar', 'Baz']) );

// Or within a Vue Component:
this.$filters.list(['Foo', 'Bar', 'Baz']);
// or within a Vue Template:
{{$filters.list(['Foo', 'Bar', 'Baz'])}}
{{$filters.pipe(['Foo', 'Bar', 'Baz'], 'list')}}
```


Services
========
Naming convention: `$myService`
Services are very similar to standard Vue Components except that:

* Services need loading with `app.service(NAME, SPEC, OPTIONS)` or wrapping in the `@momsfriendlydevco/vitel/service` function
* Services are "headless" - they do not have any template or render function
* They are singleton instances - only one of each service exists within your app at any time (by default anyway)
* They are setup against every component automatically as `$serviceName`
* If a service requires an async `created()` lifecycle sequence, `ready` (a boolean) and `promise()` (a function which returns when the created process has completed) are also automatically provided
* A `debug(...msg)` method is injected automatically into all services, when initalizing with `debug: true` this will be activated to output information to the console otherwise it will be a no-op function
* Debug mode can also be queried with `vm.debug.enabled` which will return a boolean `true` if debugging is enabled on that service

Services can be imported from the `@momsfriendlydevco/vitel/services/*` path.

**Example using the Vitel extender (recommended)**
```javasript
// Vue App creation preamble
import {createApp} from 'vue'
import App from './App.vue';
let app = createApp(App);

// Install Vitel against our app to provide `app.service`
import Vitel from '@momsfriendlydevco/vitel';
app.use(Vitel);

// Import the $toast service
import Toast from '@momsfriendlydevco/vitel/services/toast';
app.service('$toast', Toast, {
    // options, if any
});
```

**Example using the Service Wrapper**
```javasript
// Vue App creation preamble
import {createApp} from 'vue'
import App from './App.vue';
let app = createApp(App);

// Import the $toast service + pass it our app so it can install itself
import Service from '@momsfriendlydevco/vitel/services/service';
import Toast from '@momsfriendlydevco/vitel/services/toast';
Service(Toast, {app}); // Toast now available in all components as `vm.$toast`
```
