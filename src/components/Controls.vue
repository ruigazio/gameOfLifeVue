<template>
<div>
	<div class="wide-column">
		<grid 
			@cellClick="cellAction"
			:cells="life.grid.cells"
			:showNeighbors="showNeighbors"
			:cellStyle="cellStyle"
			:rowStyle="rowStyle">
		</grid>
	</div>

	<div class="narrow-column">

	<div class="form-group">
		<clock :clock="clock"></clock>
	</div>

	<div class="form-group">
		<h3>Pattern</h3>
		<button @click="setRandom">random</button>
		<button @click="setBlank">blank</button>
		<button @click="setGosper">Gosper</button>
		<button @click="setPulsar">Pulsar</button>
	</div>

	<div class="form-group">
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
	<div class="form-group">
		<h3>Speed</h3>
		<p>
			<input v-model.lazy.number="delay"
				type="number" id="delay"
				min="0" max="1000" required />delay (ms)
		</p>
	</div>

	<div class="form-group">
		<h3>Size</h3>
		<p>
			<button @click="life.grid.delRow()">-</button>
			<span id="noRows">{{life.grid.y}}</span> Rows
			<button @click="life.grid.addRow()">+</button>
		</p>
		<p>
			<button @click="life.grid.delCol()">-</button>
			<span id="noCols">{{life.grid.x}}</span> Columns
			<button @click="life.grid.addCol()">+</button>
		</p>
		<p>
			Cell size <input v-model.lazy.number="cellSize"
				id="cellSize" type="number" min="5" max="25" required />px
		</p>
	</div>

	<div class="form-group">
		<input v-model="showNeighbors"
			id="showNeighbors" type="checkbox"/>
		Display number of neighbours
	</div>

</div>
</template>

<script lang="coffee">

Examples = require '../model/examples.coffee'
Grid = require './Grid'
Clock = require './Clock'
ClockM = require '../model/clock.coffee'

module.exports  =
	name: 'controls'

	data: () ->
		timer: null
		clock: new ClockM 50
		delay: 1
		cellSize: 12
		showNeighbors: false
		Examples: Examples

	props: ['life']

	computed:
		cellSizePx: ->
			"#{this.cellSize}px"
		cellStyle: ->
			width: this.cellSizePx
			height: this.cellSizePx
			fontSize: "#{this.cellSize * 0.6}pt"
		rowStyle: ->
			height: this.cellSizePx

	components:
		Grid: Grid
		Clock: Clock
  
	methods:
		noop: ->

		interrupt: (action) ->
			@stop()
			action()

		stop: ->
			if @timer
				clearTimeout @timer
				setTimeout @clock.stop.bind @clock
				@timer = null
			else
				true

		startStop: ->
			if @stop()
				@cellClickCheck()
				@clock.start()
				@tick()

		stepForward: ->
			@cellClickCheck()
			@interrupt @life.stepForward.bind @life

		tick: ->
			@life.stepForward()
			@clock.mark()
			@timer = setTimeout (this.$nextTick.bind this, @tick), @delay

		stepBack: ->
			@cellClickCheck()
			@interrupt @life.stepBack.bind @life

		cellAction: (mCell) ->
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

<style>
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

.info {
	color: silver;
}

.hint {
	font-style: italic;
}

.form-group p {
	margin: 0.5em auto;
}

.form-group {
	border: 1px solid silver;
	margin: 0.5em auto;
	padding: 0.5em;
	max-width: 22em;
}

.cell {
	display: inline-block;
	cursor: default;
	border: 1px solid;
}

h3 {
	margin-top: 0;
	margin-bottom: 0;
}

button {
	margin: 0.3em 0.1em;
	font: inherit;
	color: inherit;
}

input {
	width: 5em;
	color: black;
}

</style>
