<?php
// header('Access-Control-Allow-Origin:*');
// header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type,      Accept");
// header('Content-Type:application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
// Initializeing
include_once('../core/initialize.php');

$data = json_decode(file_get_contents('php://input'), true);

$headers = getallheaders();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $activity_type = $data['activity'];
    if($activity_type=="LOGIN"){
        echo $registeruser->Login($data,$LoginObject);
    }


}


?>