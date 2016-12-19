# gameOfLifeVue

> Game of life implemented in Vue.js

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

19/09/2016

Porting the view layer from the vanilla *Javascript* implementation was a breeze. To compare it in fairness against others, the model objects were left untouched.

After having discovered the library "tick completion" callback `vm.$nextTick`, I proceeded with the "play" feature. I then noticed the inputs were unable to change while looping, an issue that didn't come up in the other implementions. 

To implement the cell size controls, a style class with a dynamic body would be ideal. I was able to achieve it in the other implementations, although through a hack in the case of *React*. Could not find a straightforward way in *Vue* as the runtime complains specifically about a *style* tag in the template. 

The emphasis on building modular view components and the separation of concerns in each of them is commendable. It is lean and focuses on what it is set out to do, a straightforward way of tying modeled information to its visual representation.

Without digging too deep, the performance (in terms of ticks/second) was noticeably inferior to that of Angular and even React. It was disappointing because I was expecting a boost instead. I had assumed that observing changes in the model would be *cheaper* than *dirty checking* for changes.
