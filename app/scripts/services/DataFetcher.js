(function (angular) {
	'use strict';

	/**
	 * Support REST api and provide fetching data
	 *
	 * @param $resource
	 * @param $q
	 * @param CONST
	 * @returns {*}
	 * @constructor
	 */
	function DataFetcher($resource, $q, CONST) {
		var that = this;

		/**
		 * Return promise when all promises all executed
		 *
		 * @param promise
		 * @returns {IPromise}
		 */
		function returnPromise(promise) {
			return $q.all({'requestPromise': promise}).then(function (response) {
				return response.requestPromise;
			});
		}

		/**
		 * @param path
		 * @param page
		 * @param parameters
		 * @returns {IPromise}
		 * @constructor
		 */
		that.GETData = function (path, page, parameters = []) {

			var promise = $resource(CONST.DOMAIN + CONST.URL + path, {'page': page, 'limit': 10}, {
				get: {
					method: 'GET'
				}
			});

			var request = [];

			if (typeof parameters['embedded'] !== 'undefined') {
				request['with[]'] = parameters['embedded'];
			}
			if (typeof parameters['sortBy'] !== 'undefined') {
				var orderBy = Object.keys(parameters['sortBy'])[0];
				request['sortBy[' + orderBy + ']'] = parameters['sortBy'][orderBy];
			}
			console.log(request);

			return returnPromise(promise.get(request).$promise);
		};

		/**
		 * @param path
		 * @param data
		 * @returns {*}
		 * @constructor
		 */
		that.PUTData = function (path, data) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': data.id}, {
				update: {
					method: 'PUT'
				}
			});

			return returnPromise(promise.update(data).$promise);
		};

		/**
		 * @param path {string}
		 * @param elementId {int}
		 * @returns {IPromise}
		 * @constructor
		 */
		that.PUTEnable = function (path, elementId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': elementId}, {
				update: {
					method: 'PUT'
				}
			});

			return returnPromise(promise.update().$promise);
		};

		/**
		 * @param path {string}
		 * @param elementId {int}
		 * @returns {IPromise}
		 * @constructor
		 */
		that.PUTDisable = function (path, elementId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': elementId}, {
				update: {
					method: 'PUT'
				}
			});

			return returnPromise(promise.update().$promise);
		};

		/**
		 *
		 * @param path {string}
		 * @param elementId {int}
		 * @returns {IPromise}
		 * @constructor
		 */
		that.Delete = function (path, elementId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': elementId}, {
				delete: {
					method: 'DELETE'
				}
			});

			return returnPromise(promise.delete().$promise);
		};

		/**
		 *
		 * @param path
		 * @param element
		 * @returns {IPromise}
		 * @constructor
		 */
		that.Create = function (path, element) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path, {}, {
				create: {
					method: 'POST'
				}
			});

			return returnPromise(promise.create(element).$promise);
		};

		/**
		 * @param User
		 * @returns {*}
		 * @constructor
		 */
		that.GetUserDetail = function (User) {
			var url = '/event-management-api/web/app_dev.php/access-token/' + User.getAccessToken() + '/refresh-token/' + User.getRefreshToken() + '/user-details';
			var promise = $resource(CONST.DOMAIN + url, {}, {
				getDetails: {
					method: 'POST'
				}
			});

			return returnPromise(promise.getDetails().$promise);
		};

		/**
		 * @param User
		 * @returns {*}
		 * @constructor
		 */
		that.refreshToken = function (User) {
			var requestData = {
				'grant_type': 'refresh_token',
				'client_id': CONST.OAUTH2.CLIENT_ID,
				'client_secret': CONST.OAUTH2.CLIENT_SECRET,
				'refresh_token': User.getRefreshToken()
			};
			var promise = $resource(CONST.DOMAIN + '/event-management-api/web/app_dev.php/oauth/v2/token', {}, {
				refreshToken: {
					method: 'POST'
				}
			});

			return returnPromise(promise.refreshToken(requestData).$promise);
		};

		/**
		 * @returns {*}
		 */
		that.logout = function () {
			var promise = $resource(CONST.DOMAIN + '/event-management-api/web/app_dev.php/logout', {}, {
				logout: {
					method: 'GET'
				}
			});

			return returnPromise(promise.logout().$promise);
		};
	}

	angular
		.module('eventManagementApp')
		.service('DataFetcher', DataFetcher);

	DataFetcher.$inject = [
		'$resource',
		'$q',
		'CONST'
	];

})(angular);