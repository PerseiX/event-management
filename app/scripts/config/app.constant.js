(function (angular) {
	'use strict';

	let constant = {
		DOMAIN: 'http://localhost',
		URL: '/event-management-api/web/app_dev.php/api',
		OAUTH2: {
			CODE_EXCHANGE_URL: 'http://localhost/event-management-api/web/app_dev.php/code',
			CLIENT_ID: '7_68zst57vgdoo0c8kow0s84wsgc0808scooc4sk08kgkkskowo0',
			CLIENT_SECRET: '1vfki9uu7uxww0oo4kkg0gco4ocwgcwkcwwcskk0gcsosw8wsg',
			REDIRECT_URL: 'http://localhost/event-management/app/',
			AUTHORIZATION_ENDPOINT: 'http://localhost/event-management-api/web/app_dev.php/oauth/v2/auth',
			RESPONSE_TYPE: 'code',
			DEFAULT_PROVIDER_NAME: 'event-management-oauth'
		},
		PAGINATION_ELEMENT_PER_PAGE: 10,
		MAPS: {
			KEY: 'AIzaSyARarJIViFnuSvPLVs3rgiXgw-q0o77rcc',
			VERSION: '3.20',
			LIBRARIES: 'places',
		}
	};

	angular
		.module('eventManagementApp')
		.constant('CONST', constant);
})(angular);