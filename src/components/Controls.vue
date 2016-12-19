<template>
<div>
	<div class="wide-column grid">
		<grid v-on:cellClick="cellAction" :cells="life.grid.cells" :showNeighbors="showNeighbors"></grid>
	</div>

	<div class="narrow-column">
	<div class="row form-group">
		<h3>Pattern</h3>
		<button @click="setRandom">random</button>
		<button @click="setBlank">blank</button>
		<button @click="setGosper">Gosper</button>
		<button @click="setPulsar">Pulsar</button>
	</div>

	<div class="row form-group">
		<h3>Evolution</h3>
		<p id="tickNo" class="info">#{{life.numTicks}}</p>
		<button id="backBtn" @click="stepBack">
			&lt;<span id="backTick" class="info"></span> 
		</button>
		<button id="startBtn" @click="startStop"> 
			{{this.timer ? '\u25af' : '\u25b7'}}
		</button>
		<button id="forwardBtn" @click="stepForward"> &gt; </button>
	</div>
	<div class="row form-group">
		<h3>Speed</h3>
		<p>
			<input v-model.lazy.number="delay"
				type="number" id="delay"
				min="0" max="1000" required />delay (ms)
		</p>
	</div>

	<div class="row form-group">
		<h3>Size</h3>
		<p>
			<button @click="noop">-</button>
			<span id="noRows">{{life.grid.y}}</span> Rows
			<button @click="noop">+</button>
		</p>
		<p>
			<button @click="noop">-</button>
			<span id="noCols">{{life.grid.x}}</span> Columns
			<button @click="noop">+</button>
		</p>
		<p>
			Cell size <input v-model.lazy.number="cellSize"
				id="cellSize" type="number" min="5" max="25" required />px
		</p>
	</div>

	<div class="row form-group">
		<input v-model="showNeighbors"
			id="showNeighbors" type="checkbox"/>
		Display number of neighbours
	</div>

</div>
</template>

<script lang="coffee">

Examples = require '../model/examples.coffee'
Grid = require './Grid'

module.exports  =
	name: 'controls'
	data: () ->
		timer: null
		delay: 1
		cellSize: 12
		showNeighbors: false
		Examples: Examples
	props: ['life']

	components:
		Grid: Grid
  
	methods:
		noop: ->

		interrupt: (action) ->
			@stop()
			action()

		stop: ->
			if @timer
				clearTimeout @timer
				this.$nextTick @noop
				@timer = null
			else
				true

		startStop: ->
			if @stop()
				@cellClickCheck()
				@tick()

		stepForward: ->
			@cellClickCheck()
			@interrupt @life.stepForward.bind @life

		tick: ->
			@life.stepForward()
			@timer = setTimeout (this.$nextTick.bind this, @tick), @delay

		stepBack: ->
			@cellClickCheck()
			@interrupt @life.stepBack.bind @life

		cellAction: (mCell) ->
			console.log mCell
			@stop()
			@cellClicked = true
			mCell.invertState()
			@life.resetPreStep()

		cellClickCheck: ->
			if @cellClicked
				@cellClicked = false
				@life.resetPreStep()

		load: (pattern) ->
			@interrupt @life.loadPattern.bind @life, pattern

		lifeAction: (action) ->
			@interrupt action.bind @life

		setPulsar: -> @load Examples.pulsar
		setGosper: -> @load Examples.gosper
		setBlank: -> @lifeAction @life.setBlank
		setRandom: -> @lifeAction @life.setRandom
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
