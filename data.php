<?php
    // 返回JSON格式
    $arr = array("state"=>"success");
	$callback=$_GET['callback'];
	$id = $_GET["id"];

	$name = $_GET["name"];
	$json='"'.$name.'":{';
	$ids = explode("_",$id);
	$total=$ids[count($ids)-1];
	for($index=0;$index<count($ids)-1;$index++){
		$json.='"bk'.$index.'":"book'.$ids[$index].'",';
	}
	$json.='"total":'.$total."},\r\n";
	$result=json_encode($arr);  
	echo $callback."(".$result.")";  
	file_put_contents("json/order.json", $json, FILE_APPEND);
?>