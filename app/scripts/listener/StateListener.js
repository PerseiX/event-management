(function (angular) {
	'use strict';

	/**
	 * @param $transitions
	 * @param UserManager
	 * @param CONST
	 * @constructor
	 */
	function ChangeStateListener($transitions, UserManager, CONST) {

		$transitions.onStart({to: ['app.content.events', 'app.content.events.*']}, function (trans) {
			var seconds = new Date().getTime() / 1000;
			seconds = Math.round(seconds);

			if (true === UserManager.isAuthenticated()) {
				if (UserManager.getUser().getAccessTokenExpiresAt() < seconds + 120) {
					console.log('refresh token');
					UserManager.refreshToken();
				}
			}
			if (!UserManager.isAuthenticated()) {
				UserManager.login(CONST.OAUTH2.DEFAULT_PROVIDER_NAME);
				//TODO Fix problem refresh
				// return trans.router.stateService.target('app.content.home');
			}
		});
	}

	angular
		.module('eventManagementApp')
		.run(ChangeStateListener);

	ChangeStateListener.$inject = [
		'$transitions',
		'UserManager',
		'CONST'
	];
})(angular);