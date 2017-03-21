(function (angular) {
	'use strict';

	/**
	 * @param $transitions
	 * @param UserAuthProvider
	 * @param growl
	 * @constructor
	 */
	function ChangeStateListener($transitions, UserAuthProvider, growl) {
		$transitions.onStart({to: ['app.content.events', 'app.content.events.*']}, function (trans) {
			if (!UserAuthProvider.isAuthenticated()) {
				growl.error('Brak dostępu!', {ttl: 2500});

				return trans.router.stateService.target('app.content.home');
			}
		});
	}

	angular
		.module('eventManagementApp')
		.run(ChangeStateListener);

	ChangeStateListener.$inject = [
		'$transitions',
		'UserAuthProvider',
		'growl'
	];
})(angular);