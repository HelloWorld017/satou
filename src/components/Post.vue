<template>
	<a class="post-card" :href="url">
		<template v-if="image">
			<div class="post-card-image" :style="imageStyle"></div>
		</template>

		<div class="post-card-content">
			<header class="post-card-header">
				<h2 class="post-card-title font-list-title font-bold">
					<a :href="url">{{title}}</a>
				</h2>
			</header>

			<div class="post-card-footer">
				<div class="post-card-metadata font-list-content">
					<span class="readtime">
						{{readtime}}
					</span>
					<span class="vr-divider"></span>
					<span>by </span>
					<a class="post-card-author" v-for="author, i in authors"
						:href="resolveUrl(`/author/${author.slug}`)">

						<span>{{author.name}}</span><span v-if="i !== authors.length - 1">, </span>
					</a>
					<span class="vr-divider"></span>
					<time class="post-card-date" :datetime="datetime">
						@{{datetext}}
					</time>
					<span class="vr-divider" v-if="tags.length > 0"></span>
					<div class="post-card-tags">
						<a class="post-card-tag" v-for="tag in tags" :href="resolveUrl(`/tag/${tag.slug}`)">
							#{{tag.slug}}
						</a>
					</div>
				</div>
			</div>

			<p class="post-card-text font-list-content" v-html="computedExcerpt"></p>

			<a class="post-card-button" :href="url">
				<i class="mdi mdi-chevron-double-right"></i>
			</a>

		</div>
	</a>
</template>

<style lang="less" scoped>
	.post-card {
		margin: 60px 0;
		padding: 10px;
		display: flex;
		text-decoration: none;

		.post-card-image {
			flex: 0 0 150px;
			height: 150px;

			margin-right: 30px;
			background-color: #2c3e50;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
		}

		.post-card-content {
			flex: 1;
			width: 0;

			.post-card-header {
				display: flex;
				align-items: baseline;

				.post-card-title {
					margin: 0;
					padding-bottom: 5px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 1.8rem;

					a {
						color: #202020;
						text-decoration: none;
					}
				}

				.readtime {
					color: #808080;
					white-space: nowrap;
				}
			}

			.post-card-text {
				font-size: 1.2rem;
				margin-top: 30px;
				color: #404040;

				.post-card-button {
					display: block;
					width: 60px;
					text-align: center;
					color: #202020;
					border: 3px solid #202020;
					background: transparent;
					font-size: 2rem;
					transform: skewX(-10deg);
					cursor: pointer;
					transition: background .4s ease, color .4s ease, transform .4s ease .4s;
					margin-top: 40px;
					outline: none;

					&:hover {
						transform: skewX(0deg);
						background: #202020;
						color: #fff;
					}
				}
			}

			.post-card-footer {
				.post-card-metadata {
					margin-top: 5px;
					margin-bottom: 5px;
					color: #808080;

					a {
						color: #00989d;
						text-decoration: none;
					}

					.post-card-tags {
						display: inline-flex;

						.post-card-tag:not(:last-child) {
							margin-right: 3px;
						}
					}

					.vr-divider {
						border-right: 1px solid #c0c0c0;
						margin-right: 5px;
					}
				}
			}
		}
	}
</style>

<script>
	import fitvids from "fitvids";
	import excerpt from "../js/excerpt";
	import readTime from "../js/read-time";
	import resolveUrl from "../js/resolve-url";

	const minlen = (str, len) => (str.length < len) ? minlen('0' + str, len) : str;
	const pad2 = (str) => minlen('' + str, 2);
	const monthString = (num) => [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	][num];

	export default {
		props: {
			title: {
				type: String,
				required: true
			},

			slug: {
				type: String,
				required: true
			},

			url: {
				type: String,
				required: true
			},

			image: {},

			html: {
				type: String,
				required: true
			},

			authors: {
				type: Array,
				required: true
			},

			tags: {
				type: Array,
				required: true
			},

			index: {
				type: Number,
				required: true
			},

			date: {
				required: true
			},

			customExcerpt: {}
		},

		computed: {
			readtime() {
				return `${readTime(this.html)} to read`;
			},

			datetime(){
				return `${this.date.getFullYear()}-${pad2(this.date.getMonth() + 1)}-${pad2(this.date.getDate())}`;
			},

			datetext(){
				return `${monthString(this.date.getMonth())} ${pad2(this.date.getDate())}`;
			},

			imageStyle(){
				return `background-image: url("${this.image}")`;
			},

			computedExcerpt(){
				return this.customExcerpt ? this.customExcerpt : `${this.excerpt}…`;
			},

			excerpt() {
				return excerpt(this.html, {words: 26});
			},
		},

		methods: {
			resolveUrl
		},

		mounted() {
			fitvids(".post-content");
		}
	}
</script>
