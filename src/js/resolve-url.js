export default (url) => {
	if(url.match(/^(?:[^:]+:)?\/\//)) {
		return url;
	}

	const baseUrl = satou.configuration.baseUrl;

	if(!url.startsWith('/')) url = `/${url}`;
	if(baseUrl.endsWith('/')){
		const base = baseUrl.slice(0, window.origamiBaseUrl.length - 1);

		return `${base}${url}`
	}

	return `${baseUrl}${url}`;
};
