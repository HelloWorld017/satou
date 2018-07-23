<template>
	<div class="pagination-trigger" ref="trigger"></div>
</template>

<script>
	export default {
		data() {
			return {
				observer: new IntersectionObserver(this.preload, {
					root: null,
					rootMargin: '250px 0px',
					threshold: 0
				}),
				loadRequestFinished: false,
				loadFulfilled: false
			};
		},

		props: {
			pagination: {
				type: Number,
				required: true
			},

			pages: {
				type: Number,
				required: true
			},

			loadNext: {
				type: Function,
				required: true
			}
		},

		methods: {
			async preload(entries) {
				if(!this.loadRequestFinished) return;
				if(!this.next) {
					this.loadFulfilled = true;
					return;
				}

				if(typeof entries !== 'undefined') {
					if(entries.length < 1) return;
					if(!entries[0].isIntersecting) {
						this.loadFulfilled = true;
						return;
					} else {
						this.loadFulfilled = false;
					}
				}

				this.loadRequestFinished = false;
				await this.loadNext();
				this.loadRequestFinished = true;

				setTimeout(() => {
					if(!this.loadFulfilled) {
						this.preload();
					}
				}, 1000);
			},
		},

		computed: {
			next() {
				return this.pagination < this.pages;
			}
		},

		mounted() {
			this.observer.observe(this.$refs.trigger);
			this.loadRequestFinished = true;
			this.preload();
		}
	};
</script>
