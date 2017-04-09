(function (angular) {
	'use strict';

	/**
	 * @param UserAuthentication
	 * @param $q
	 * @returns {{request: request, responseError: responseError}}
	 * @constructor
	 */
	function TokenInjector(UserAuthentication, $q) {

		return {
			request: function (config) {
				var User = UserAuthentication.getUser();

				if (false === angular.isDefined(config.headers['Authorization']) && true === User.isAuthenticated()) {
					config.headers['Authorization'] = 'Bearer ' + User.getAccessToken();
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
		'UserAuthentication',
		'$q'
	];

	angular.module('eventManagementApp')
		.config(RequestInterceptor);

})(angular);