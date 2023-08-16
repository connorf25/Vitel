@MomsFriendlyDevCo/Vitel
========================
Various, pickable Vue@3 / Vite modules and components.

A collection of useful [Components](#components), [Directives](#directives), [Filters](#filters) and [Services](#services)

[Storybook documentation](https://momsfriendlydevco.github.io/Vitel/)


Refering to different things
----------------------------
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

// Import a filter
import List from '@momsfriendlydevco/vitel/filters/list';

// Use within Vue:
app.filter('List', List); // Can only be used either with Vue@2 or the [Doop framework](https://github.com/MomsFriendlyDevCo/Doop)

// Use within vanilla JavaScript:
console.log( List(['Foo', 'Bar', 'Baz']) );
```


Services
========
Naming convention: `$myService`
Services are very similar to standard Vue Components except that:

* Services need wrapping in the `@momsfriendlydevco/vitel/services/service` handler to provide...
* Services do not have any template or render function - they are "headless"
* They are singleton instances - only one of each service exists within your app at any time (by default anyway)
* They are setup against every component automatically as `$serviceName`
* If a service requires an initalization sequence (i.e. an `init()` method) `ready` (a boolean) and `promise` (a function which returns when the init has completed) are also automatically provided

Services can be imported from the `@momsfriendlydevco/vitel/services/*` path.

**Example:**
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
