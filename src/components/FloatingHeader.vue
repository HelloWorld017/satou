<template>
	<div class="floating-header">
		<div class="floating-header-wrapper">
			<div class="floating-header-logo font-ui-base">
				<a class="font-bold" :href="blogUrl">
					<img v-if="blogIcon" :src="blogIcon" :alt="`${blogTitle} icon`">
					{{blogTitle}}
				</a>
				<span class="floating-header-divider">&mdash;</span>
				<div class="floating-header-title" v-html="title"></div>
			</div>
			<div class="floating-header-share">
				<a class="floating-header-share-tw"
					:href="twitterUrl"
					@click="openUrl(twitterUrl, 'twitter', $event)">

					<svg width="24" height="24" viewBox="0 0 32 32">
						<use :xlink:href="iconify(twitterIcon)"/>
					</svg>
				</a>

				<a class="floating-header-share-fb"
					:href="facebookUrl"
					@click="openUrl(facebookUrl, 'twitter', $event)">

					<svg width="24" height="24" viewBox="0 0 32 32">
						<use :xlink:href="iconify(facebookIcon)"/>
					</svg>
				</a>
			</div>
		</div>

		<progress class="progress" :value="progressValue" ref="progress">
			<div class="progress-container">
				<span class="progress-bar"></span>
			</div>
		</progress>
	</div>
</template>

<style lang="less" scoped>
	.floating-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #f9fafb;
		box-shadow: 0 1px 4px rgba(0, 0, 0, .4);

		&-logo {
			display: flex;
			color: #404040;
			font-size: 1.4rem;
			align-items: center;

			img {
				width: 60px;
				height: 60px;
			}

			a {
				color: inherit;
				text-decoration: none;
				display: flex;
				align-items: center;
			}

			span {
				padding: 0 5px;
			}
		}

		&-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;

			max-width: 768px;
			width: 100%;
			flex: 1;
		}

		&-share {
			display: flex;

			a {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 60px;
				height: 60px;
				transition: all .6s ease;
			}

			svg * {
				transition: all .6s ease;
				fill: rgba(0, 0, 0, .3);
			}

			&-tw:hover svg * {
				fill: #33b1ff;
			}

			&-fb:hover svg *{
				fill: #005e99;
			}
		}
	}

	.progress {
		width: 100%;
		height: 4px;
		border: none;
		background: transparent;

		appearance: none;
	}

	.progress::-webkit-progress-bar {
		background-color: transparent;
	}

	.progress::-webkit-progress-value {
		background-color: #00bcd4;
	}

	.progress::-moz-progress-bar {
		background-color: #00bcd4;
	}

	.progress-container {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 4px;
		background-color: transparent;
	}

	.progress-bar {
		display: block;
		width: 50%;
		height: inherit;
		background-color: #00bcd4;
	}
</style>

<script>
	import twitterIcon from "../images/twitter.svg";
	import facebookIcon from "../images/facebook.svg";

	export default {
		data() {
			return {
				blogTitle: satou.configuration.title,
				title: satou.post.title,
				blogUrl: satou.configuration.baseUrl,
				blogIcon: satou.configuration.icon,
				url: satou.post.url,
				height: window.innerHeight,
				documentHeight: document.querySelector('article.post-full').clientHeight,
				scroll: window.scrollY,
				twitterIcon,
				facebookIcon
			};
		},

		computed: {
			twitterUrl() {
				return `https://twitter.com/share?text=${encodeURIComponent(this.title)}` +
					`&url=${encodeURIComponent(this.url)}`;
			},

			facebookUrl() {
				return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
			},

			progressValue() {
				return this.scroll / (this.documentHeight - this.height / 2);
			}
		},

		methods: {
			openUrl(url, target, ev) {
				window.open(url, `share-${target}`, 'width=550,height=235');
				ev.preventDefault();
			},

			resizeHandler() {
				this.height = window.innerHeight;
				this.documentHeight = document.querySelector('article.post-full').clientHeight;
			},

			scrollHandler() {
				this.scroll = window.scrollY;
			},

			iconify(path) {
				return `${path}#icon`;
			}
		},

		created() {
			window.addEventListener('resize', this.resizeHandler);
			window.addEventListener('scroll', this.scrollHandler);
		},

		destroyed() {
			window.removeEventListener('resize', this.resizeHandler);
			window.removeEventListener('scroll', this.scrollHandler);
		},

		mounted() {

		}
	};
</script>
