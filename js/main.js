var App = (function () {
	'use strict';

	var BITMOVIN_LICENSE_KEY, player;

	BITMOVIN_LICENSE_KEY = 'd44197e4-ca58-4b71-bce1-a918711216f6';

	return {
		init: init
	};



	function loadPlayer() {
		player = bitmovin.player('player-container');
		player.setup({
			key: BITMOVIN_LICENSE_KEY
		});
	};


	function getSource(sourceName) {
		return sources[sourceName];
	}

	function setSource(source) {
		player.load({
			dash: source.src,
			drm: {
				widevine: {
					LA_URL: source.widevine
				},
				playready: {
					playready: source.playready
				}
			}
		})
	};

	function init() {
		addEventListeners();
		loadPlayer();
	};

	function addEventListeners() {

		document.querySelectorAll('nav a.nav-item').forEach(function (elm) {

			elm.addEventListener('click', handleNavItemClick);
		});

		document.getElementById('btn-refresh').addEventListener('click', function () {
			window.location.reload(true);
		});
	};

	function handleNavItemClick(event) {
		console.log(event);
		var sourceName, source;
		try {
			sourceName = this.dataset['title'];
			source = getSource(sourceName);

			setSource(source);
		} catch (err) {
			console.warn(err);
		}
		// setSource(sourceName);
	};
})();


(function () {
	'use strict';

	App.init();

})(window, window.bitmovin, sources);