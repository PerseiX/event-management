(function (angular) {
	'use strict';

	function SingleEventRepository() {
		var that = this;

		that.event = null;

		/**
		 * @param event
		 */
		that.setEvent = function (event) {
			that.event = event;
		};

		/**
		 * @returns {EventsRepository}
		 */
		that.getEvent = function () {
			return that.event;
		};

	}

	angular
		.module('eventManagementApp')
		.service('SingleEventRepository', SingleEventRepository);

})(angular);