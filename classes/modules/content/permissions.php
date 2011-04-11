<?php
	$permissions = Array(
		'content' => 
				Array('title', 'menu', 'sitemap', 'get_page_url', 'get_page_id', 'redirect', 'get_describtion',
				'get_keywords', 'insert', 'header', 'gen404', 'json_get_tickets', 'json_get_editable_blocks',
				'page', 'get_edit_link', 'pagesByDomainTags', 'tagsAccountCloud', 'tagsDomainEfficiencyCloud',
				'tagsDomainUsageCloud', 'pagesByAccountTags', 'tagsAccountUsageCloud', 'json_load_hierarchy_level',
				'json_load_hierarchy', 'json_get_images_panel', 'tagsDomainCloud',
				
				'json_mini_browser', 'old_json_load_files', 'json_load_files', 'json_load_zip_folder', 'load_tree_node',
				'tree_delete_element', 'tree_move_element', 'tree_set_activity', 'tree_move_element'), 

		'sitetree' => 
				Array('add_page', 'add_page_do', 'del_page', 'edit_page', 'edit_page_do', 'move_page', 'treelink_parse', 'treelink', 'edit_domain', 'edit_domain_do', 'insertimage', 'insertmacros', 'replace', 'json_load', 'json_move', 'json_copy', 'json_del', 'json_set_is_active', 'insertimage_do', 'page.edit', 'getObjectsByTypeList', 'getObjectsByBaseTypeList', 'getPagesByBaseTypeList', 'edit', 'add', 'del', 'page.edit', '.edit', 'qedit', 'tree_copy_element',
				'get_editable_region', 'save_editable_region', 'widget_create', 'widget_delete',
				// EIP
				'eip_move_page', 'eip_quick_add', 'editValue', 'eip_add_page', 'eip_del_page', 'frontendPanel',
				// ----
				'json_mini_browser', 'old_json_load_files', 'json_load_files', 'json_load_zip_folder', 'move_to_lang', 'change_template', 'publish'), 

		'tickets' => 
				Array('json_add_ticket', 'json_del_ticket', 'json_update_ticket')
	);
?>
