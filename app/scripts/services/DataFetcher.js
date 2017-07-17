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
		 * Clean array key - force again fetch data
		 * @param key
		 * @returns {boolean}
		 */
		function removeKey(key) {
			that.data[key] = [];

			return true;
		}

		/**
		 * @param path
		 * @param force
		 * @param parameters
		 * @returns {*}
		 * @constructor
		 */
		that.GETData = function (path, force = false, parameters = []) {
			let request = [],
				page = 1,
				limit = 10,
				key = path.split('/').pop();

			if (typeof parameters['page'] !== 'undefined') {
				page = parameters['page'];
			}

			if (typeof parameters['limit'] !== 'undefined') {
				limit = parameters['limit'];
			}

			//Init array of arguments where key is entity name
			if (typeof that.data[key] === 'undefined') {
				that.data[key] = [];
			}

			//If first sorting clear all data from properly entity
			if (typeof sorting.getOrderBy(key) !== 'undefined') {
				if (sorting.clearStorage === true) {
					that.data[key] = [];
					sorting.clearStorage = false;
				}
			}
			//If key exist return from data
			if (typeof that.data[key][page] !== 'undefined' && force === false) {
				console.log("STORAGE");
				return returnPromise(that.data[key][page].$promise);
			}// Get data from database
			else {
				console.log("DATABASE");
				//Embedded param
				if (typeof parameters['embedded'] !== 'undefined') {
					request['with[]'] = parameters['embedded'];
				}

				//Sorting param, default is by id
				if (typeof sorting.getOrderBy(key) !== 'undefined') {
					request['sortBy[' + sorting.getOrderBy(key) + ']'] = sorting.getOrderType(key);
				}
				else {
					request['sortBy[id]'] = 'DESC';
				}

				let promise = $resource(CONST.DOMAIN + CONST.URL + path, {'page': page, 'limit': limit}, {
					get: {
						method: 'GET'
					}
				});

				let $promise = promise.get(request).$promise;

				return $q.when($promise).then(function (response) {
					that.data[key][page] = response;

					return response;
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
			let promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': data.id}, {
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
			let promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': elementId}, {
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
			let promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': elementId}, {
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
			let promise = $resource(CONST.DOMAIN + CONST.URL + path + '/:id', {'id': elementId}, {
				delete: {
					method: 'DELETE'
				}
			});
			return returnPromise(promise.delete().$promise)
				.then(function (response) {
					//Any idea ? Ugly hack
					removeKey(path.split('/').pop() + 's');

					return response
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
			let promise = $resource(CONST.DOMAIN + CONST.URL + path, {}, {
				create: {
					method: 'POST'
				}
			});

			return returnPromise(promise.create(element).$promise)
				.then(function (response) {
					//Any idea ? Ugly hack
					removeKey(path.split('/').pop() + 's');

					return response
				});
		};

		/**
		 * @param User
		 * @returns {*}
		 * @constructor
		 */
		that.GetUserDetail = function (User) {
			let url = '/event-management-api/web/app_dev.php/access-token/' + User.getAccessToken() + '/refresh-token/' + User.getRefreshToken() + '/user-details';
			let promise = $resource(CONST.DOMAIN + url, {}, {
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
			let requestData = {
				'grant_type': 'refresh_token',
				'client_id': CONST.OAUTH2.CLIENT_ID,
				'client_secret': CONST.OAUTH2.CLIENT_SECRET,
				'refresh_token': User.getRefreshToken()
			};
			let promise = $resource(CONST.DOMAIN + '/event-management-api/web/app_dev.php/oauth/v2/token', {}, {
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
			let promise = $resource(CONST.DOMAIN + '/event-management-api/web/app_dev.php/logout', {}, {
				logout: {
					method: 'GET'
				}
			});
			console.log("LOGOUT");
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