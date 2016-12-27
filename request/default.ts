import has = require('../has');


var defId = has('config-requestProvider'),
	platformId;

if (has('host-browser') || has('host-webworker')) {
	platformId = './xhr';
} else if (has('host-node')) {
	platformId = './node';
	/* TODO:
	}else if(has('host-rhino')){
		platformId = './rhino';
   */
}

if (!defId) {
	defId = platformId;
}

export const getPlatformDefaultId = function () {
	return platformId;
};

export const load = function (id, parentRequire, loaded, config) {
	require([id == 'platform' ? platformId : defId], function (provider) {
		loaded(provider);
	});
};
