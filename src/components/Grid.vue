<template>
	<div class="grid">
	<div class="row" 
		v-for="(row, irow) in this.cells"
		:style="rowStyle"
		:key="'' + irow">

		<div v-for="(cell,icell) in row"
			class="cell" :class="cell.display.alive ? 'alive' : 'dead'"
			@click="cellClick(cell)"
			:key=" '' + irow + icell "
			:style="cellStyle">
			{{showNeighbors ? cell.display.neighbors : '' }}
		</div>
	</div>
	</div>
</template>

<script lang="coffee">

GridM = require '../model/grid.coffee'

module.exports  =
	name: 'grid'
	props: ['cells', 'showNeighbors', 'cellStyle', 'rowStyle']
	methods:
		cellClick: (cell) ->
			this.$emit 'cellClick', cell

</script>

<style>
.cell {
	display: inline-block;
	cursor: default;
	border: 1px solid;
	font-size: 8px;
}

.alive {
	background-color: burlywood;
}

.dead {
	background-color: steelblue;
}

</style>
