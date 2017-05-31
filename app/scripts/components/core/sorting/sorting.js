(function (angular) {

	function sorting() {
		let that = this;

		/**
		 * @type {boolean}
		 */
		that.clearStorage = true;

		/**
		 * @param orderType
		 * @returns {sorting}
		 */
		that.setOrderType = function (orderType) {
			that.orderType = orderType;
			return that;
		};

		/**
		 * @returns {string}
		 */
		that.getOrderType = function () {
			return that.orderType;
		};

		/**
		 * @param orderBy
		 * @returns {sorting}
		 */
		that.setOrderBy = function (orderBy) {
			that.orderBy = orderBy;
			return that;
		};

		/**
		 * @returns {string}
		 */
		that.getOrderBy = function () {
			return that.orderBy;
		};

		return that;
	}

	angular
		.module('eventManagementApp')
		.service('sorting', sorting);
})(angular);