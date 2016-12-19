<template>
	<div class="clock">
		<table class="time">
			<thead>
				<tr>
					<th colspan="3">Frame drawing time in ms (FPS)</th>
				</tr>
				<tr>
					<th></th>
					<th  colspan="2">
						with
						<span>{{clock.sampleSize}}</span>
						samples
					</th>
				</tr>
				<tr>
					<th>current</th>
					<th>worst</th>
					<th>average</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{clock.frame}} ({{fps.frame}})</td>
					<td>{{clock.worst}} ({{fps.worst}})</td>
					<td>{{clock.average}} ({{fps.average}})</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="coffee">


module.exports  =
	name: 'clock'
	props: ['clock']
	computed:
		fps: ->
			this.clock.getFPS()

</script>

<style>
table.time th, table.time td {
	border: 1px solid black;
}

table.time th{
	font-family: courier;
	font-weight: normal;
}

table.time td{
	text-align: center;
}

table.time tr:first-child th {
	padding: 0 0.5em;
}
</style>
