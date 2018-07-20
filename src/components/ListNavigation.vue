<template>
	<nav id="list-navigation" class="list-navigation font-ui-base">
		<div v-for="nav, i in navigations" :key="nav.slug">

			<a :href="nav.url" :class="[
				'list-nav-item',
				`list-nav-${nav.slug}`,
				{'list-nav-current': nav.current}
			]">
				{{nav.text}}
			</a>

			<!-- <span class="list-nav-divider" v-if="i !== navigations.length - 1">/</span> -->
		</div>
	</nav>
</template>

<style lang="less" scoped>
	.list-navigation {
		display: flex;
		max-width: 768px;
		margin: 0 auto;
		padding: 0 5px;

		.list-nav-item {
			display: inline-block;
			color: #202020;
			padding: 3px;
			text-decoration: none;
			margin: 0 5px;
			position: relative;

			&.list-nav-current {
				color: #ee6e73;
				border-bottom: 2px solid #ee6e73;
			}

			&::after {
				content: '';
				position: absolute;
				display: block;
				left: 0;
				bottom: -2px;
				width: 100%;
				height: 2px;
				background: #202020;
				transform: scaleX(0);
				transition: all .4s ease;
			}

			&:hover::after {
				transform: scaleX(1);
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				navigations: JSON.parse(JSON.stringify(satou.navigation))
			};
		}
	};
</script>
