(function (angular) {

	function sorting() {
		let that = this;

		/**
		 * @type {boolean}
		 */
		that.clearStorage = true;

		that.orderType = [];
		that.orderBy = [];

		/**
		 * @param orderType
		 * @param key
		 * @returns {sorting}
		 */
		that.setOrderType = function (orderType, key) {
			that.orderType[key] = orderType;
			return that;
		};

		/**
		 * @param key
		 * @returns {string}
		 */
		that.getOrderType = function (key) {
			return that.orderType[key];
		};

		/**
		 * @param orderBy
		 * @param key
		 * @returns {sorting}
		 */
		that.setOrderBy = function (orderBy, key) {
			that.orderBy[key] = orderBy;
			return that;
		};

		/**
		 * @param key
		 * @returns {string}
		 */
		that.getOrderBy = function (key) {
			return that.orderBy[key];
		};

		return that;
	}

	angular
		.module('eventManagementApp')
		.service('sorting', sorting);
})(angular);