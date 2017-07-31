(function (angular) {
	'use strict';


	angular
		.module('eventManagementApp', [
			'ui.router',
			'ngResource',
			'angular-growl',
			'satellizer',
			'LocalStorageModule',
			'bw.paging',
			'ui.bootstrap',
			'uiGmapgoogle-maps'
		]);

	function OauthProvider($authProvider, CONST) {
		$authProvider.oauth2({
			name: CONST.OAUTH2.DEFAULT_PROVIDER_NAME,
			url: CONST.OAUTH2.CODE_EXCHANGE_URL,
			clientId: CONST.OAUTH2.CLIENT_ID,
			redirectUri: CONST.OAUTH2.REDIRECT_URL,
			authorizationEndpoint: CONST.OAUTH2.AUTHORIZATION_ENDPOINT,
			responseType: CONST.OAUTH2.RESPONSE_TYPE,
			optionalUrlParams: ['display'],
			display: 'popup',
			popupOptions: {width: 500, height: 500}
		});
	}

	function GoogleMapsProvider(uiGmapGoogleMapApiProvider, CONST) {

		uiGmapGoogleMapApiProvider.configure({
			key: CONST.MAPS.KEY,
			v: CONST.MAPS.VERSION,
			libraries: CONST.MAPS.LIBRARIES
		});
	}

	angular.module('eventManagementApp')
		.config(OauthProvider)
		.config(GoogleMapsProvider);

	OauthProvider.$inject = [
		'$authProvider',
		'CONST'
	];
	GoogleMapsProvider.$inject = [
		'uiGmapGoogleMapApiProvider',
		'CONST'
	];


})(angular);
