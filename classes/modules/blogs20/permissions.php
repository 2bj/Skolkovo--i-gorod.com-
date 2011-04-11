<?php
$permissions = Array(
	'common' => array('blog', 'blogsList', 'commentAdd', 'commentsList', 'comment', 'post', 'postsList', 
					  'postView', 'viewBlogAuthors',  'postsByTag', 'checkAllowComments' ),
	'add'    => array('placeControls', 'itemDelete', 'postAdd', 'postEdit', 'editUserBlogs', 'draughtsList'),
	'admin'  => array('config', 'add', 'del', 'edit', 'blogs', 'posts', 'comments', 'activity', 'listItems', 'publish')
);
?>
