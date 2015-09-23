<?php
    $s = $_GET['search'];
    $url = "http://en.wikipedia.org/w/api.php";//?action=query&titles=".$s."&prop=extracts&exintro=true&format=json";
    $params = array(
                    'action'=>'query',
                    'titles'=>$s,
                    'prop'=>'extracts',
                    'exintro'=>true,
                    'format'=>'json'
                    );
                
    $ch = curl_init($url."?".http_build_query($params));
    curl_setopt($ch, CURLOPT_HTTPGET, TRUE);
    curl_setopt($ch, CURLOPT_POST, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_NOBODY, FALSE);
    curl_setopt($ch, CURLOPT_VERBOSE, FALSE);
    curl_setopt($ch, CURLOPT_REFERER, "");
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 4);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; he; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8");
    $page = curl_exec($ch);
    exit($page);
?>