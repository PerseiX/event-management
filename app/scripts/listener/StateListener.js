(function (angular) {
	'use strict';

	/**
	 * @param $transitions
	 * @param UserManager
	 * @param CONST
	 * @param UserAuthentication
	 * @param $auth
	 * @constructor
	 */
	function ChangeStateListener($transitions, UserManager, CONST, UserAuthentication, $auth) {
		UserAuthentication.setAuth($auth);

		$transitions.onStart({to: ['app.content.events', 'app.content.events.*', 'app.content.events.tags.edit', 'app.content.login']}, function (trans) {
			var seconds = new Date().getTime() / 1000;
			seconds = Math.round(seconds);

			if (true === UserManager.isAuthenticated()) {
				if (UserManager.getUser().getAccessTokenExpiresAt() < seconds + 120) {
					console.log('refresh token');
					UserManager.refreshToken();
				}
			}

			if (!UserManager.isAuthenticated()) {
				return UserManager.login(CONST.OAUTH2.DEFAULT_PROVIDER_NAME)
					.then(function () {
						return trans.router.stateService.target('app.content.events');
					})
					.catch(function () {
						//TODO Source state
						return trans.router.stateService.target('app.content.login');
					});
			}
		});

	}

	angular
		.module('eventManagementApp')
		.run(ChangeStateListener);

	ChangeStateListener.$inject = [
		'$transitions',
		'UserManager',
		'CONST',
		'UserAuthentication',
		'$auth'
	];
})(angular);