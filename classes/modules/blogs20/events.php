<?php
$blogsCommentAddEventListener = new umiEventListener("blogs20CommentAdded", "blogs20", "onCommentAdd");
// ----
new umiEventListener('blogs20PostAdded', 'blogs20', 'onPostAdded'); 
new umiEventListener('blogs20CommentAdded', 'blogs20', 'onCommentAdded'); 
?>
