<template>
  <div id="app">
		<grid :cells="life.grid.cells"></grid>
		<controls :life="life" />
  </div>
</template>

<script>
import Grid from './components/Grid'

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
		Grid,
		Controls
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@media (min-width: 850px){
	.wide-column {
		width: 70%;
		float: left;
		text-align: center;
	}

	.narrow-column {
		width: 30%;
		float: left;
		text-align: center;
	}
}

@media (max-width: 849px){
	.wide-column {
		text-align: center;
	}
	.narrow-column {
		text-align: center;
	}
}
</style>
