<template>
	<div>
	<div class="row" 
		v-for="(row, irow) in this.cells"
		:key="'' + irow">

		<div v-for="(cell,icell) in row"
			class="cell" :class="cell.display.alive ? 'alive' : 'dead'"
			@click="cellClick(cell)"
			:key=" '' + irow + icell ">
			{{showNeighbors ? cell.display.neighbors : '' }}
		</div>
	</div>
	</div>
</template>

<script lang="coffee">

GridM = require '../model/grid.coffee'

module.exports  =
	name: 'grid'
	props: ['cells', 'showNeighbors']
	methods:
		cellClick: (cell) ->
			this.$emit 'cellClick', cell

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
	width: 12px;
	height: 12px;
}

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

.row {
}
</style>
