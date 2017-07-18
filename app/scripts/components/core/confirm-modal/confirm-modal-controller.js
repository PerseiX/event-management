(function (angular) {
	'use strict';

	/**
	 * @param $uibModal
	 * @param $element
	 * @param $attrs
	 * @constructor
	 */
	function ConfirmModalController($uibModal, $element, $attrs) {
		let vm = this;
		vm.template = $attrs.template;

		/**
		 *
		 * @param $scope
		 * @param $uibModalInstance
		 * @constructor
		 */
		let ModalInstanceCtrl = function ($scope,  $uibModalInstance) {
			$scope.approved = function () {
				vm.deleteAction();
				$uibModalInstance.close();
			};

			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		};

		$element.on('click', function () {
			let message = $attrs.confirmMessage || "Are you sure?";

			let approvedMessage = $attrs.approvedMessage || "OK";
			let cancelMessage = $attrs.cancelMessage || "CANCEL";

			let modalHtml = '<div class="modal-body">' + message + '</div>';
			modalHtml += '<div class="modal-footer">' +
				'<button class="btn btn-primary" ng-click="approved()">' + approvedMessage + '</button>' +
				'<button class="btn btn-warning" ng-click="cancel()">' + cancelMessage + '</button>' +
				'</div>';

			let modalInstance = $uibModal.open({
				template: modalHtml,
				controller: ModalInstanceCtrl
			});

		});
	}

	angular
		.module('eventManagementApp')
		.controller('ConfirmModalController', ConfirmModalController);

	ConfirmModalController.$inject = [
		'$uibModal',
		'$element',
		'$attrs'
	];

})(angular);