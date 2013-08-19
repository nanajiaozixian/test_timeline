<?php
$url = "";
//获取网页url
if(isset($_POST['pageurl'])){
	$url = $_POST['pageurl'];
}else{
	$url = "";
}
//$url = "http://www.adobe.com/products/dreamweaver.html?promoid=KAUCF";
//判断url的有效性
if(get_headers($url)===false){
	echo "error";
	return;
}
$parts = parse_url($url);//解析url
$host = $parts['host'];//获取hostname

$str_file = file_get_contents($url);
$main_file  = "source.html";
$copy_file  = "copy.html";
$local_file  = "local.html";
file_put_contents($main_file, $str_file);


$str_copy = $str_file;
/*preg_match_all("/<link\s+.*?href=[\"|'](.+?)[\"|'].*?>/",$str_copy,$links, PREG_SET_ORDER);
foreach($links as $val){
	if(strpos($val[1], "http:")!==0){
			
			$val[1] = $links[$count][1] = "http://".$host.$val[1];
	}	
}*/
$str_new = relative_to_absolute($str_copy, $url);
file_put_contents($copy_file, $str_new);
echo $copy_file;
function relative_to_absolute($content, $feed_url){
	//echo "feed_url: $feed_url<br/>";
	preg_match('/(http|https|ftp):\/\//', $feed_url, $protocol);
	//echo "protocol: <br/>";
	//var_dump($protocol);
	$server_url = preg_replace("/(http|https|ftp|news):\/\//", "", $feed_url);

 $server_url = preg_replace("/\/.*/", "", $server_url);
 //echo "server_url: $server_url<br/>";

    if ($server_url == '') {

        return $content;

    }
 if (isset($protocol[0])) {
 	//echo "replace<br/>";

        $new_content = preg_replace('/href="\/([^\/]+)/', 'href="'.$protocol[0].$server_url.'/'.'\\1', $content);

        //$new_content = preg_replace('/src="\//', 'src="'.$protocol[0].$server_url.'/', $new_content);
         $new_content = preg_replace('/src="\/([^\/]+)/', 'src="'.$protocol[0].$server_url.'/'.'\\1', $new_content);

    } else {
	//echo "not replace<br/>";
        $new_content = $content;

    }

    return $new_content;

}

?>