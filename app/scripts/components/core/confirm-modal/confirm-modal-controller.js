(function (angular) {
	'use strict';

	/**
	 * @param $modal
	 * @param $element
	 * @param $attrs
	 * @constructor
	 */
	function ConfirmModalController($modal, $element, $attrs) {
		var vm = this;
		vm.template = $attrs.template;

		/**
		 * @param $scope
		 * @param $modalInstance
		 * @constructor
		 */
		var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.approved = function () {
				vm.deleteAction();
				$modalInstance.close();
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$element.on('click', function () {
			var message = $attrs.confirmMessage || "Are you sure?";

			var approvedMessage = $attrs.approvedMessage || "OK";
			var cancelMessage = $attrs.cancelMessage || "CANCEL";

			var modalHtml = '<div class="modal-body">' + message + '</div>';
			modalHtml += '<div class="modal-footer">' +
				'<button class="btn btn-primary" ng-click="approved()">' + approvedMessage + '</button>' +
				'<button class="btn btn-warning" ng-click="cancel()">' + cancelMessage + '</button>' +
				'</div>';

			var modalInstance = $modal.open({
				template: modalHtml,
				controller: ModalInstanceCtrl
			});

		});
	}

	angular
		.module('eventManagementApp')
		.controller('ConfirmModalController', ConfirmModalController);

	ConfirmModalController.$inject = [
		'$modal',
		'$element',
		'$attrs'
	];

})(angular);