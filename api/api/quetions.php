<?php


header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type,      Accept");
header('Content-Type:application/json');
// Initializeing
include_once('../core/initialize.php');

$data = json_decode(file_get_contents('php://input'), true);

$headers = getallheaders();
// $LoginObject->ToeknValidator($headers);
// $LoginObject->LoginUser(1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $activity_type = "";
    if(isset($_POST['activity'])){
      $activity_type= $_POST['activity'];
    }else{
    $activity_type = $data['activity'];
    }
   
    if($activity_type==="ADD_QUETION"){
            try {
                $main_validation = $LoginObject->ToeknValidator($headers);
                $token_state = $main_validation['state'];
                
                if($main_validation['state']){
                    $reason_info = $token_state['reason'];
                    $user_id = $main_validation['reason']->sub_user;
                 $quetion->AddNewQuetion($user_id,$data['quetion']);
                }else{
                    echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

                }
            } catch (\Throwable $th) {
                throw $th;
            }

    }else if($activity_type==="ANSWER_QUETION"){
      try {
          $main_validation = $LoginObject->ToeknValidator($headers);
          $token_state = $main_validation['state'];
          
          if($main_validation['state']){
            $account_level = $main_validation['reason']->account_type;
            $user_id = $main_validation['reason']->sub_user;
            if($account_level==3 || $account_level==4){
                $quetion->AnswerQuetion($user_id,$data['quetion_id'],$data['answer']);

            }else{
            echo  json_encode(array('state'=>false,"message_type"=>"Please register as a teacher to answer this quetions","_POST_set"=>null));

            }
          }else{
            echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

          }
        }catch (\Throwable $th) {
          throw $th;
      }
    }else if($activity_type = "GET_QEUTIONS"){
        try {
            $main_validation = $LoginObject->ToeknValidator($headers);
            $token_state = $main_validation['state'];
            
            if($main_validation['state']){
              $account_level = $main_validation['reason']->account_type;
              $user_id = $main_validation['reason']->sub_user;
              $all_quetions = $quetion->GetQuetionsAndAnswersTillNow();
              echo  json_encode(array('state'=>true,"message_type"=>"Quetions are loading","data_set"=>$all_quetions));

            }else{
            echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }



  }
?>