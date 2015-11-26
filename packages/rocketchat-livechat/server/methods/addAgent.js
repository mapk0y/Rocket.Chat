Meteor.methods({
	'livechat:addAgent' (username) {
		if (!Meteor.userId() || !RocketChat.authz.hasPermission(Meteor.userId(), 'view-livechat-manager')) {
			throw new Meteor.Error("not-authorized");
		}

		if (!username || !_.isString(username)) {
			throw new Meteor.Error('invalid-arguments');
		}

		console.log('[methods] livechat:addAgent -> '.green, 'arguments:', arguments);

		var user = RocketChat.models.Users.findOneByUsername(username, { fields: { _id: 1 } });

		if (!user) {
			throw new Meteor.Error('user-not-found', TAPi18n.__('Username_not_found'));
		}

		return RocketChat.authz.addUsersToRoles(user._id, 'livechat-agent');
	}
});