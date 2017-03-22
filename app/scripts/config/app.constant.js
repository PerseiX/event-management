(function (angular) {
	'use strict';

	var constant = {
		DOMAIN: 'http://localhost',
		URL: '/event-management-api/web/app_dev.php/api',
		OAUTH2: {
			CODE_EXCHANGE_URL: 'http://localhost/event-management-api/web/app_dev.php/code',
			CLIENT_ID: '7_68zst57vgdoo0c8kow0s84wsgc0808scooc4sk08kgkkskowo0',
			REDIRECT_URL: 'http://localhost/event-management/app/',
			AUTHORIZATION_ENDPOINT: 'http://localhost/event-management-api/web/app_dev.php/oauth/v2/auth',
			RESPONSE_TYPE: 'code',
			DEFAULT_PROVIDER_NAME: 'event-management-oauth'
		}
	};

	angular
		.module('eventManagementApp')
		.constant('CONST', constant);
})(angular);