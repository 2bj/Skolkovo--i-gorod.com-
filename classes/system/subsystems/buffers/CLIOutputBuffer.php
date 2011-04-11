<?php
 class CLIOutputBuffer extends outputBuffer {public function send() {echo $this->buffer;$this->clear();}};?>