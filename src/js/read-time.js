import striptags from "striptags";
import moment from "moment";

const wps = 4.6;

export default function readTime(text) {
	const words = striptags(text).split(/\s+/).length;
	
	return moment.duration(Math.ceil(words / wps), "seconds").humanize();
}
