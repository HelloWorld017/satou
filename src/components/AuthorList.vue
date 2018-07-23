<template>
	<div id="author-list">
		<div class="author-list-item font-ui-base" v-for="author in authors">
			<template>
				<img class="author-profile-image" v-if="author.profile_image" :src="author.profile_image">
				<img class="author-profile-image default-image" v-else :src="defaultAvatar">
			</template>

			<div class="author-profile">
				<h2 v-html="author.name"></h2>
				<p v-if="author.bio" v-html="author.bio"></p>
				<p v-else>Read <a :href="author.url">more posts</a> by this author.</p>
			</div>
			<a :href="author.url" class="author-more">
				Read More
			</a>
		</div>
	</div>
</template>

<style lang="less" scoped>
	#author-list {
		padding-top: 100px;
		padding-bottom: 40px;
	}

	.author-list-item {
		display: flex;
		align-items: center;
		margin-bottom: 60px;
	}

	.author-profile-image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-right: 20px;

		&.default-image {
			background: #d1d2d3;
		}
	}

	.author-profile {
		display: flex;
		flex-direction: column;
		flex: 1;
		color: #202020;

		h2 {
			font-size: 1.4rem;
			margin-top: 0;
			margin-bottom: 4px;
		}

		p {
			font-size: 1rem;
			margin-bottom: 0;
		}
	}

	.author-more {
		text-decoration: none;
		border: 1px solid #00acc1;
		padding: 10px 15px;
		border-radius: 26px;
		line-height: 1em;
		transition: all .4s ease;

		&:hover {
			background: #00acc1;
			color: #fff;
		}
	}
</style>

<script>
	import defaultAvatar from "../images/avatar.svg";

	export default {
		data() {
			return {
				authors: satou.post.authors,
				defaultAvatar
			};
		}
	};
</script>
