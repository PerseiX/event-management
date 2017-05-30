(function (angular) {
	'use strict';

	/**
	 * @param $resource
	 * @param $q
	 * @param CONST
	 * @param sorting
	 * @constructor
	 */
	function DataFetcher($resource, $q, CONST, sorting) {
		let that = this;

		/**
		 * @type {Array}
		 */
		that.data = [];

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
		 * @param force
		 * @param parameters
		 * @returns {*}
		 * @constructor
		 */
		that.GETData = function (path, force = false, parameters = []) {
			if (typeof that.data[path] !== 'undefined' && force === false) {
				console.log("STORAGE");
				console.log(sorting.getPreparedSortArgument());

				return that.data[path];
			}
			else {
				let request = [];
				let page = 1,
					limit = 10;
				if (typeof parameters['page'] !== 'undefined') {
					page = parameters['page'];
				}

				if (typeof parameters['embedded'] !== 'undefined') {
					request['with[]'] = parameters['embedded'];
				}
				console.log(sorting);
				if (typeof parameters['sortBy'] !== 'undefined') {
					let orderBy = Object.keys(parameters['sortBy'])[0];
					request['sortBy[' + orderBy + ']'] = parameters['sortBy'][orderBy];
				}
				else {
					request['sortBy[id]'] = 'DESC';
				}

				let promise = $resource(CONST.DOMAIN + CONST.URL + path, {'page': page, 'limit': limit}, {
					get: {
						method: 'GET'
					}
				});

				return promise.get(request).$promise
					.then(function (response) {
						console.log("DATABASE");
						return that.data[path] = response;
					});

			}
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
		 * @returns {IPromise|*}
		 * @constructor
		 */
		that.Delete = function (path, elementId) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': elementId}, {
				delete: {
					method: 'DELETE'
				}
			});
			return returnPromise(promise.delete().$promise)
				.then(function () {
					//TODO Ugly hack route change
					return that.GETData(path + 's', true);
				});
		};

		/**
		 *
		 * @param path
		 * @param element
		 * @returns {IPromise|*}
		 * @constructor
		 */
		that.Create = function (path, element) {
			var promise = $resource(CONST.DOMAIN + CONST.URL + path, {}, {
				create: {
					method: 'POST'
				}
			});

			return returnPromise(promise.create(element).$promise)
				.then(function () {
					return that.GETData(path + 's', true);
				});
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
		'CONST',
		'sorting'
	];

})
(angular);