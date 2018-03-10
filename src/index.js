// Styles
import "./less/index.less";

// Polyfills
import "whatwg-fetch";

// Vue
import Vue from "vue";
import Navigation from "./components/Navigation.vue";
import PostList from "./components/PostList.vue";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

if($('#navigation')) {
	new Vue({
		el: '#navigation',
		render(h) {
			return h(Navigation)
		}
	});
}

if($('#satou-posts')){
	new Vue({
		el: '#satou-posts',
		render(h) {
			return h(PostList)
		}
	});
}
