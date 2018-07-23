
<template>
	<section id="satou-posts">
		<h1 class="font-ui-base font-semilight">
			<i class="mdi mdi-pentagon"></i> Documents
		</h1>

		<div class="post-list">
			<div class="post-column full-column">
				<template v-for="(post, index) in posts">
						<post
							v-if="post"
							:title="post.title"
							:slug="post.slug"
							:html="post.html"
							:authors="post.authors"
							:image="post.image"
							:tags="post.tags"
							:url="post.url"
							:date="new Date(post.published_at)"
							:customExcerpt="post.custom_excerpt"
							:index="post.index">
						</post>

						<div class="post-list-divider" v-if="index !== posts.length - 1"></div>
				</template>
			</div>
		</div>

		<pagination-trigger
			:pagination="pagination"
			:pages="pages"
			:load-next="nextPage">
		</pagination-trigger>
	</section>
</template>

<style lang="less" scoped>
	#satou-posts {
		max-width: 768px;
		margin: 0 auto;
		padding: 5vw;

		h1 {
			margin: 0;
			margin-bottom: 40px;
		}
	}

	.post-list-divider {
		max-width: 300px;
		margin-left: auto;
		margin-right: auto;
		border-bottom: 2px solid #808080;
		position: relative;

		&::before {
			content: '';
			display: block;
			background: #f1f2f3;
			width: 30px;
			height: 10px;

			position: absolute;
			top: -5px;
			left: 50%;

			transform: translateX(-50%);
		}

		&::after {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			transform: translateX(-50%) rotate(45deg);

			position: absolute;
			left: 50%;
			top: -5px;

			border: 2px solid #808080;
		}

	}
</style>

<script>
	import resolveUrl from "../js/resolve-url.js";
	import PaginationTrigger from "./PaginationTrigger.vue";
	import Post from "./Post.vue";

	export default {
		components: {
			PaginationTrigger,
			Post
		},
		data(){
			return {
				posts: [],
				pagination: 0,
				pages: 1,
				previousLeft: [],
				previousRight: [],
				tablet: false,
				context: satou.pagination.context,
				contextData: satou.pagination.data,
				limit: satou.pagination.limit
			};
		},

		methods: {
			async nextPage(){
				const query = {
					limit: this.limit,
					page: this.pagination + 1,
					include: "authors,tags"
				};

				if(this.context === 'tag' || this.context === 'author')
					query.filter = `${this.context}:${this.contextData}`;

				const v = await fetch(ghost.url.api('posts', query)).then((v) => v.json())

				this.pagination = v.meta.pagination.page;
				this.pages = v.meta.pagination.pages;
				this.posts.push(...v.posts.map((v, k) => {
					v.index = k;
					v.url = resolveUrl(v.url);
					if(v.image) v.image = resolveUrl(v.image);
					if(v.feature_image) v.image = resolveUrl(v.feature_image);
					return v;
				}));
			}
		}
	}
</script>
