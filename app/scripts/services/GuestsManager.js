(function (angular) {
	'use strict';

	/**
	 * @param DataFetcher
	 * @constructor
	 */
	function GuestsManager(DataFetcher) {
		var that = this;

		/**
		 * @param page
		 * @param id
		 * @returns {IPromise}
		 */
		that.getCollection = function (page, id) {
			return DataFetcher.GETData('/event/'+id+'/guests', page.page);
		};
	}

	angular
		.module('eventManagementApp')
		.service('GuestsManager', GuestsManager);

	GuestsManager.$inject = [
		'DataFetcher'
	];
})(angular);