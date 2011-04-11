<?php
abstract class __files_data {
	private $cwd = '/files';	

	public function getfilelist() {
		$this->flushAsXml('getfilelist');
		$this->setupCwd();

		$param = array(
					array('delete', 'unlink', 1),
					array('copy',   'copy', 2),
					array('move',   'rename', 2)
					);

		for($i=0; $i<count($param); $i++) {
			if(isset($_REQUEST[$param[$i][0]]) && !empty($_REQUEST[$param[$i][0]])) {
				foreach($_REQUEST[$param[$i][0]] as $item) {
					$item = CURRENT_WORKING_DIR . base64_decode($item);
					$arguments = array($item);
					if($param[$i][2] > 1) {
						$arguments[] = $this->cwd . '/' . basename($item);
					}
					@call_user_func_array($param[$i][1], $arguments);
				}
			}
		}
        
        $imageExt = array("jpg", "jpeg", "gif", "png");
		$sizeMeasure = array("b", "Kb", "Mb", "Gb", "Tb");		
		$allowedExt = true;		
		if(isset($_REQUEST['showOnlyImages'])) {
			$allowedExt = $imageExt;
		} else if(isset($_REQUEST['showOnlyVideos'])) {
			$allowedExt = array("flv", "mp4");
		} else if(isset($_REQUEST['showOnlyMedia'])) {
			$allowedExt = array("swf","flv","dcr","mov","qt","mpg","mp3","mp4","mpeg","avi","wmv","wm","asf","asx","wmx","wvx","rm","ra","ram");
		}
		
		$directory = new DirectoryIterator($this->cwd);
		
		$cwd = substr($this->cwd, strlen(CURRENT_WORKING_DIR));		
		
		$filesData = array();		
		foreach($directory as $file) {
			if($file->isDir()) continue;
			if($file->isDot()) continue;
			$name = $file->getFilename();
			$ext = strtolower( substr($name, strrpos($name, ".")+1) );
			if($allowedExt !== true && !in_array($ext, $allowedExt)) continue;
			
			$ts   = $file->getCTime();
			$time = date('g:i, d.m.Y' , $ts );
			$size = $file->getSize();	
			
			$file = array('attribute:name' => $name,
					      'attribute:type' => $ext,
						  'attribute:size' => $size,
						  'attribute:ctime'     => $time,
						  'attribute:timestamp' => $ts);

			$i = 0;
			while($size > 1024.0) {
				$size /= 1024;
				$i++;
			}
			$convertedSize = (int)round($size);
			if($convertedSize == 1 && (int)floor($size) != $convertedSize) {
				$i++;
			}
			$file['attribute:converted-size'] = $convertedSize.$sizeMeasure[$i];
			if(in_array($ext, $imageExt) && $info = @getimagesize($item)) {
				$file['attribute:mime']   = $info['mime'];
				$file['attribute:width']  = $info[0];
				$file['attribute:height'] = $info[1];
			}
			$filesData[] = $file;
			
		}
		$data = array(
			'attribute:folder'	=> $cwd,
			'data'				=> array(
			'list'				=> array(
				'files' => array('nodes:file' => $filesData)
			))
		);		
		return $data;
		
	}

	public function getfolderlist() {
		$this->flushAsXml('getfolderlist');
		$this->setupCwd();

		$folders  = glob($this->cwd . '/*', GLOB_ONLYDIR);

		$cwd = substr($this->cwd, strlen(CURRENT_WORKING_DIR));		
		$foldersData = array();
		foreach($folders as $item) {
			$name = basename($item);
			$foldersData[] = array('attribute:name' => $name);
		}
		$data = array(
			'attribute:folder'	=> $cwd,
			'data'				=> array(
			'list'				=> array(
				'folders' => array(
					'nodes:folder' => $foldersData
				)
			))
		);
		
		return $data;
	}

	public function createfolder() {
		$this->flushAsXml('createfolder');
		$folder = rtrim(base64_decode(getRequest('folder')), "/");
		$_REQUEST['folder'] = base64_encode(dirname($folder));
		$folder = basename($folder);
		$this->setupCwd();		
		if(!is_dir($this->cwd . "/" . $folder)) {
			mkdir($this->cwd . "/" . $folder);
		}
		return array();
	}

	public function deletefolder() {
		$this->flushAsXml('deletefolder');
		$this->setupCwd();
		if(is_dir($this->cwd)) {
			@rmdir($this->cwd);
		}
		return array();
	}

	public function uploadfile() {
		$this->flushAsXml('uploadfile');
		$this->setupCwd();
		if(isset($_FILES['Filedata']['name'])) {
			foreach($_FILES['Filedata'] as $k => $v) {
				$_FILES['Filedata'][$k] = array('upload' => $v);
			}			
			$file = umiFile::upload('Filedata', 'upload', $this->cwd);
		}
		$cwd = substr($this->cwd, strlen(CURRENT_WORKING_DIR));
		$result = array(
			'attribute:folder'	=> $cwd,
			'attribute:upload'	=> 'done'
		);

		if($file) {

			$item = $this->cwd . "/" . $file->getFileName();

			// Collect some file info
			$imageExt    = array("jpg", "jpeg", "gif", "png");
			$sizeMeasure = array("b", "Kb", "Mb", "Gb", "Tb");

			$name = $file->getFileName();
			$type = strtolower($file->getExt());
			$ts   = $file->getModifyTime();
			$time = date('g:i, d.m.Y' , $ts );
			$size = $file->getSize();

			if(isset($_REQUEST['imagesOnly']) && !in_array($type, $imageExt)) {
				unlink($item);
				return $result;
			}

			$file = array('attribute:name' => $name,
						  'attribute:type' => $type,
						  'attribute:size' => $size,
						  'attribute:ctime'     => $time,
						  'attribute:timestamp' => $ts);

			$i = 0;
			while($size > 1024.0) {
				$size /= 1024;
				$i++;
			}
			$convertedSize = (int)round($size);
			if($convertedSize == 1 && (int)floor($size) != $convertedSize) {
				$i++;
			}
			$file['attribute:converted-size']   = $convertedSize.$sizeMeasure[$i];
			if(in_array($type, $imageExt) && $info = @getimagesize($item)) {
				umiImageFile::addWatermark("." . $cwd . "/" . $name);
				$file['attribute:mime']   = $info['mime'];
				$file['attribute:width']  = $info[0];
				$file['attribute:height'] = $info[1];
			} else {
				//$file['attribute:mime']   = mime_content_type($item);
			}

			$result["file"] = $file;
		}

		return $result;
	}

	public function deletefiles() {
		$this->flushAsXml('deletefiles');
		$this->setupCwd();

		if(isset($_REQUEST['delete']) && is_array($_REQUEST['delete'])) {
			foreach($_REQUEST['delete'] as $item) {
				$item = $this->cwd . '/' . base64_decode($item);
				if(is_dir($item)) @rmdir($item);
				else @unlink($item);
			}
		}
		if(!isset($_REQUEST['nolisting'])) {
			return $this->getfilelist();
		}
	}

	public function rename() {
		$this->flushAsXml('rename');
		$path    = CURRENT_WORKING_DIR . base64_decode( getRequest("oldName") );
		$newName = dirname($path) . "/" . basename(base64_decode( getRequest("newName") ));
		$old = pathinfo($path);
		$new = pathinfo($newName);
		if(strtolower($old['extension']) != strtolower($new['extension'])) return array();
		rename($path, $newName);
		return array(
			'attribute:path'	=> substr($newName, strlen(CURRENT_WORKING_DIR))
		);
	}

	public function getimagepreview() {
		$this->setupCwd();
		if(isset($_REQUEST['file'])){
			readfile( CURRENT_WORKING_DIR . base64_decode($_REQUEST['file']) );
		}
		exit();
	}

	public function setupCwd() {        
		$allowedRoots = array(CURRENT_WORKING_DIR . '/files', CURRENT_WORKING_DIR . '/images' );
		$this->cwd    = realpath(CURRENT_WORKING_DIR . '/files');
		if($newCwd = getRequest('folder')) {
            $newCwd = rtrim(base64_decode($newCwd), "/");
			$newCwd = realpath(CURRENT_WORKING_DIR . $newCwd);
            if(strlen($newCwd)) {
                foreach($allowedRoots as $test) {
                    $test = realpath($test);
                    if(substr($newCwd, 0, strlen($test)) == $test) {
                        $this->cwd = $newCwd;
                        break;
                    }                
                }
            }
		}
        return $this->cwd;
	}	
};
?>
