<template>
	<div class="wide-column grid">
		<div class="row" 
			v-for="(row, irow) in this.cells"
			:key="'' + irow">

			<div v-for="(cell,icell) in row"
				class="cell" :class="cell.display.alive ? 'alive' : 'dead'"
				:key=" '' + irow + icell ">
			</div>
		</div>
	</div>
</template>

<script lang="coffee">

GridM = require '../model/grid.coffee'

module.exports  =
	name: 'grid'
	props: ['cells']

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
	width: 10px;
	height: 10px;
}

.cell {
	display: inline-block;
	cursor: default;
	border: 1px solid;
}

.alive {
	background-color: burlywood;
}

.dead {
	background-color: steelblue;
}

.row {
	line-height: 0;
}
</style>
