(function (angular) {
	'use strict';

	/**
	 * @param $q
	 * @param localStorageService
	 * @returns {{request: request, responseError: responseError}}
	 * @constructor
	 */
	function TokenInjector($q, localStorageService) {

		return {
			request: function (config) {
				if (false === angular.isDefined(config.headers['Authorization']) && null !== localStorageService.get('user')) {
					config.headers['Authorization'] = 'Bearer ' + localStorageService.get('user').access_token;
				}

				return config;
			},
			responseError: function (response) {
				return $q.reject(response);
			}
		};
	}

	/**
	 * @param $httpProvider
	 * @constructor
	 */
	function RequestInterceptor($httpProvider) {
		$httpProvider.interceptors.push(TokenInjector);
	}


	RequestInterceptor.$inject = [
		'$httpProvider'
	];

	TokenInjector.$inject = [
		'$q',
		'localStorageService'
	];

	angular.module('eventManagementApp')
		.config(RequestInterceptor);

})(angular);