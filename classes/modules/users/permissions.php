<?php
	$permissions = Array(
		'login' => Array('login_do', 'welcome', 'auth', 'is_auth', 'logout', 'createAuthorUser', 'createAuthorGuest', 'viewAuthor', 'permissions', 'loadUserSettings'), 
		'registrate' => Array('registrate_do', 'registrate_done', 'activate', 'get_delivery_list', 'forget', 'forget_do', 'restore'), 
		'settings' => Array('settings_do', 'loadUserSettings', 'saveUserSettings'), 
		'users_list' => Array('add_group', 'add_group_do', 'group_edit', 'group_edit_do', 'group_delete', 'add_user', 'add_user_do', 'user_delete', 'user_edit', 'edit_user_do', 'groups_list', 'users_list_all', 'add', 'edit', 'activity', 'del', 'choose_perms'),
		'profile' => Array('list_users', 'json_change_dock', 'getFavourites', 'getPermissionsOwners', 'get_user_info')
	);
?>