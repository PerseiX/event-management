(function (angular) {

	function sorting() {
		var that = this;

		/**
		 * @param argument
		 * @returns {sorting}
		 */
		that.setPreparedSortArgument = function (argument) {
			that.argument = argument;
			return that;
		};

		/**
		 * @returns {*}
		 */
		that.getPreparedSortArgument = function () {
			return that.argument;
		};
	}

	angular
		.module('eventManagementApp')
		.service('sorting', sorting);
})(angular);