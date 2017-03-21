(function (angular) {
	'use strict';

	/**
	 * @param $q
	 * @param UserAuthProvider
	 * @returns {{request: request, responseError: responseError}}
	 * @constructor
	 */
	function TokenInjector($q, UserAuthProvider) {

		return {
			request: function (config) {
				if (false === angular.isDefined(config.headers['Authorization']) && true === UserAuthProvider.isAuthenticated()) {
					config.headers['Authorization'] = 'Bearer ' + UserAuthProvider.getAccessToken();
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
		'UserAuthProvider'
	];

	angular.module('eventManagementApp')
		.config(RequestInterceptor);

})(angular);