<template>
  <div id="app">
		<h3 class="title">Conway's Game Of Life (Vue)</h3>
		<controls :life="life" />
  </div>
</template>

<script>

import LifeM from './model/life.coffee'
import GridM from './model/grid.coffee'
import Examples from './model/examples.coffee'
import Controls from './components/Controls'

const sparseFactor = 50

export default {
  name: 'app',
	data: function () {
		const grid = new GridM(this.x, this.y, sparseFactor)
		const life = new LifeM(grid)
		life.loadPattern(Examples.pulsar)
		return {life}
	},
	props: ["x","y"],
  components: {
		Controls
  }
}

</script>

<style>

*, *::after, *::before {
    box-sizing: border-box;
}

h3.title {
	margin-bottom: 1em;
}

body {
	margin: 1em;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
