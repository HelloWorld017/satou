// Styles
import "./less/index.less";

// Polyfills
import "whatwg-fetch";

// Vue
import Vue from "vue";
import AuthorList from "./components/AuthorList.vue";
import FloatingHeader from "./components/FloatingHeader.vue";
import ListNavigation from "./components/ListNavigation.vue";
import Navigation from "./components/Navigation.vue";
import PostList from "./components/PostList.vue";

// Prism
import "./js/prism";

// Fitvids
import fitvids from "fitvids";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const kebabize = text => text[0].toLowerCase() + text.slice(1).replace(/([A-Z])/, (_, p1) => `-${p1.toLowerCase()}`);

const vueMatcher = {
	AuthorList,
	FloatingHeader,
	ListNavigation,
	Navigation,
	PostList
};

Object.keys(vueMatcher)
.map(k => [`#${kebabize(k)}`, vueMatcher[k]])
.forEach(([id, elem]) => {
	if($(id)) {
		new Vue({
			el: id,
			render(h) {
				return h(elem);
			}
		});
	}
});

document.addEventListener('load', () => {
	if($('.post-full-content')) fitvids('.post-full-content');
});
