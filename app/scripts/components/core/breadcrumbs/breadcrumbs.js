(function (angular) {
	function Breadcrumbs() {
		var that = this;

		/**
		 * @type {Array}
		 */
		that.breadcrumbs = [];

		that.onEnterBreadcrumbsArray = function (router) {
			var displayName = getDisplayName(router.globals.$current);
			that.breadcrumbs.push({
				displayName: displayName,
				route: ""
			});

			return that.breadcrumbs;
		};

		/**
		 *
		 * @param trans
		 */
		that.updateBreadcrumbsArray = function (trans) {
			var workingState;
			var displayName;
			var breadcrumbs = [];
			var currentState = trans.$to();

			while (currentState && currentState.name !== '') {
				workingState = getWorkingState(currentState);
				if (workingState) {
					displayName = getDisplayName(workingState);
					if (displayName !== false && !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)) {
						breadcrumbs.push({
							displayName: displayName,
							route: workingState.name
						});
					}
				}
				currentState = currentState.parent;
			}
			breadcrumbs.reverse();
			that.breadcrumbs = breadcrumbs;

			return that.breadcrumbs;
		};

		/**
		 * @param currentState
		 * @returns {*}
		 */
		function getWorkingState(currentState) {
			var workingState = currentState;

			if (workingState.abstract === true) {
				workingState = false;
			}
			return workingState;
		}

		/**
		 * @param currentState
		 * @returns {string|boolean}
		 */
		function getDisplayName(currentState) {
			var data = currentState.data;
			if (data) {
				if (data.displayName) {
					return data.displayName;
				}
			}

			if (currentState.name) {
				var explodedName = currentState.name.split('.');
				var textToDisplay = explodedName[explodedName.length - 2];
				return textToDisplay.charAt(0).toUpperCase() + textToDisplay.slice(1);
			}
		}

		/**
		 * @param state
		 * @param breadcrumbs
		 * @returns {boolean}
		 */
		function stateAlreadyInBreadcrumbs(state, breadcrumbs) {
			var i;
			var alreadyUsed = false;
			for (i = 0; i < breadcrumbs.length; i++) {
				if (breadcrumbs[i].route === state.name) {
					alreadyUsed = true;
				}
			}
			return alreadyUsed;
		}

		return that;
	}

	angular
		.module('eventManagementApp')
		.service('Breadcrumbs', Breadcrumbs);
})(angular);