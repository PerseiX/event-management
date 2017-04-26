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
		 * @returns {*}
		 */
		function returnPromise(promise) {
			return $q.all({'requestPromise': promise}).then(function (response) {
				return response.requestPromise;
			});
		}

		/**
		 * @param path
		 * @returns {*}
		 * @constructor
		 */
		that.GETData = function (path) {
			console.log(path);
			var promise = $resource(CONST.DOMAIN + CONST.URL + path, {}, {
				get: {
					method: 'GET'
				}
			});

			return returnPromise(promise.get().$promise);
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
		 * @param path
		 * @param eventId
		 * @returns {*}
		 * @constructor
		 */
		that.PUTEnable = function (path, eventId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': eventId}, {
				update: {
					method: 'PUT'
				}
			});

			return returnPromise(promise.update().$promise);
		};

		/**
		 * @param path
		 * @param eventId
		 * @returns {*}
		 * @constructor
		 */
		that.PUTDisable = function (path, eventId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': eventId}, {
				update: {
					method: 'PUT'
				}
			});

			return returnPromise(promise.update().$promise);
		};

		/**
		 *
		 * @param path
		 * @param eventId
		 * @returns {*}
		 * @constructor
		 */
		that.Delete = function (path, eventId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': eventId}, {
				delete: {
					method: 'DELETE'
				}
			});

			return returnPromise(promise.delete().$promise);
		};

		/**
		 * @param User
		 * @returns {*}
		 * @constructor
		 */
		that.GetUserDetail = function (User) {
			var url = '/access-token/' + User.getAccessToken() + '/refresh-token/' + User.getRefreshToken() + '/user-details';
			var promise = $resource(CONST.DOMAIN + CONST.URL + url, {}, {
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


		//GUSTS
		/**
		 * @param eventId
		 * @returns {*}
		 */
		that.getGuestCollectionToEvent = function (eventId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + '/event/:eventId/guests', {'eventId': eventId}, {
				get: {
					method: 'GET'
				}
			});

			return returnPromise(promise.get().$promise);
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