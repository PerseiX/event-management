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
			console.log(data);
			var promise = $resource(CONST.DOMAIN + CONST.URL + path + '/' + data.id, {}, {
				update: {
					method: 'PUT'
				}
			});

			return returnPromise(promise.update(data).$promise);
		}
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