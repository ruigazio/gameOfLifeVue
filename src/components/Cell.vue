<template>
  <div class="cell" :class="{alive: alive}">
  </div>
</template>

<script lang="coffee">
module.exports =
	name: 'cell'
	data: ->
		alive: true
		neighbors: 0
	
	props: [ 'cell' ]
	computed:
		alive: ->
			@cell.alive
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
</style>
