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


Filters
=======
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
Services are packaged as Plain JavaScript files which export a default function to be called as `(VueAppInstance)`.

* All services install themselves as dollar-symbol + service name against each Vue component. e.g. `vm.$toast` is the Toast service
* MOST services provide an `init()` function which needs to be run to connect to 3rd party services, see each component if this is necessary
* Where an `init()` call is nessessary each service also provides `promise()` which can be used to wait for a service to settle its state before continuing

Services can be imported from the `@momsfriendlydevco/vitel/services/*` path.

**Example:**
```javasript
// Vue App creation preamble
import {createApp} from 'vue'
import App from './App.vue';
let app = createApp(App);

// Import the $toast service + pass it our app so it can install itself
import toastService from '@momsfriendlydevco/vitel/services/toast';
toastService(app);
```
