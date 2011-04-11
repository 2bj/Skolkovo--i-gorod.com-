<?php
	$permissions = Array(
		'add_poll' => Array('add_poll_do', 'polls', 'lists', 'add'), 
		'edit_poll' => Array('edit_poll_do', 'polls', 'lists', 'edit', 'poll.edit', 'answers_list', 'activity', 'publish'),
		'del_poll' => Array('del'), 
		'poll' => Array('insertvote', 'results', 'insertlast'), 
		'post' => Array('json_rate', 'getElementRating')
	);
?>