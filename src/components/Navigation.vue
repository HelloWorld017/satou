<template>
	<nav id="navigation" :class="{opened}">
		<button class="nav-puller" @click="toggle">
			<i class="mdi mdi-chevron-double-left"></i>
		</button>

		<div class="nav-title" :style="{backgroundImage: `url(${coverImage})`}">
			<h1 class="font-ui-index-title font-normal">{{title}}</h1>
		</div>

		<div class="nav-list font-list-content">

			<a v-for="nav, i in navigations"
				:key="nav.slug"
				:href="nav.url"
				:class="[
					'nav-item',
					`nav-${nav.slug}`,
					{'nav-current': nav.current}
				]" v-html="nav.text">

			</a>
		</div>
	</nav>
</template>

<style lang="less" scoped>
	@import "../less/fonts.less";

	#navigation {
		width: 400px;
		height: 100vh;

		position: fixed;
		top: 0;
		right: -400px;
		bottom: 0;

		display: flex;
		flex-direction: column;

		background: #263238;
		transition: all .4s ease;
		z-index: 22;

		&::after {
			content: '';
			display: block;
			width: 0;
			height: 0;
			position: absolute;
			top: 0;
			left: -100px;

			border-top: 100vh solid transparent;
			border-right: 100px solid #202020;
			border-right: 100px solid #202020;
		}
	}

	.nav-title {
		display: flex;
		align-items: stretch;
		background-size: cover;
		background-position: center;

		h1 {
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0, 0, 0, .3);
			flex: 1;
			height: 20vh;
			padding: 10px;
			color: #fff;
			margin: 0;
			font-size: 2rem;

			.font-ui-index-title;
		}
	}

	.nav-puller {
		position: fixed;
		top: 70px;
		right: 0;

		display: block;
		width: 120px;
		height: 60px;

		border: none;
		outline: none;
		cursor: pointer;

		font-size: 3rem;
		text-decoration: none;
		text-align: left;

		z-index: -1;

		transition: right .5s ease-out, color .2s cubic-bezier(0, 0, 0, 1), background .3s ease;

		.mdi::before {
			transform: rotate(0deg);
			transition: all .4s ease;
		}

		background: transparent;
		color: #202020;

		&:hover {
			background: #202020;
			color: #fff;
		}
	}

	.nav-list {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		flex: 1;

		.nav-item {
			display: flex;
			justify-content: center;
			align-items: center;
			text-decoration: none;
			color: #f1f2f3;
			height: 50px;
			transition: all .4s ease;
			text-transform: uppercase;
			border: solid 0px #fff;

			&:hover {
				//border-width: 5px;
				background: rgba(0, 0, 0, .4);
			}
		}
	}

	#navigation.opened {
		right: 0;

		.nav-title {
			box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .3);
		}

		.nav-puller {
			color: #fff;
			right: 340px;

			.mdi::before {
				transform: rotate(180deg);
			}
		}
	}
</style>

<style lang="less">
	.backdrop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 0;
		height: 100vh;

		display: block;
		opacity: 0;
		z-index: 20;
		transition: opacity .4s ease;
		background-color: rgba(0, 0, 0, .4);

		&.active {
			width: 100vw;
			opacity: 1;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				opened: false,
				coverImage: satou.configuration.cover,
				title: satou.configuration.title,
				navigations: JSON.parse(JSON.stringify(satou.navigation))
			};
		},

		methods: {
			pull() {
				this.opened = true;
				this.backdrop.className = 'backdrop active';
			},

			push() {
				this.opened = false;
				this.backdrop.className = 'backdrop';
			},

			toggle() {
				if(this.opened) return this.push();
				this.pull();
			}
		},

		mounted() {
			this.backdrop = document.createElement('div');
			this.backdrop.className = 'backdrop';
			this.backdrop.addEventListener('click', () => this.toggle());

			document.body.appendChild(this.backdrop);
		},

		destroyed() {
			document.body.removeChild(this.backdrop);
		}
	};
</script>
