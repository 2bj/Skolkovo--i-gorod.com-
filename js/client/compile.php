<?php
 chdir(dirname(__FILE__));include "../../developerTools/jsPacker/class.JavaScriptPacker.php";include "../../developerTools/jsPacker/jsPacker.php";$v45b963397aa40d4a0063e0d85e4fe7a1 = Array(  'commonClient.js' );$v0b0f137f17ac10944716020b018f8126 = new jsPacker($v45b963397aa40d4a0063e0d85e4fe7a1);$v0b0f137f17ac10944716020b018f8126->pack('commonClient.js', isset($_REQUEST['compress']));?>