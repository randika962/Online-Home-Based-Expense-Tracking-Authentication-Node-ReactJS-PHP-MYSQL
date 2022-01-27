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
    $activity_type = $data['activity'];

    if($activity_type==="ADD_USER"){
       echo  $registeruser->RegisterMainUser($data);
   
   
    }else if($activity_type=="REGISTER_FAMILY"){
            try {
                $main_validation = $LoginObject->ToeknValidator($headers);
                $token_state = $main_validation['state'];
                
                if($main_validation['state']){
                    $reason_info = $token_state['reason'];
                    //  print_r($main_validation);
                    try {
                        $main_user_id = $main_validation['reason']->main_user;
                        $state_of_userName = $registeruser->CheckIfUserNameExist($data['user_name']);
                        if(!$state_of_userName){
                            $save_state =  $registeruser->InsertSubUser($data['user_name'],$data['pwd'],$main_user_id,$data['income'],2);
                            if($save_state){
                                echo json_encode(array('state'=>true,"message_type"=>"Successfully Registered the family member","data_set"=>null));
                            }else{
                               echo json_encode(array('state'=>false,"message_type"=>"Something went wrong while registering family member please tryagain","data_set"=>null));
                            }
                        }else{
                           echo  json_encode(array('state'=>false,"message_type"=>"Please use different user name","data_set"=>null));
                        }
                    } catch (\Throwable $th) {
                        echo  json_encode(array('state'=>false,"message_type"=>"Validation failed please re login","data_set"=>null));
                       
                    }
                    
                }
            } catch (\Throwable $th) {
                echo  json_encode(array('state'=>false,"message_type"=>"Validation Problem please re login","data_set"=>null));
               
            }

    }else if($activity_type=="BECOME_TEACHER"){
       try {
        $main_validation = $LoginObject->ToeknValidator($headers);
        $token_state = $main_validation['state'];
        
        if($main_validation['state']){
            $reason_info = $token_state['reason'];
            $user_id_sub = $main_validation['reason']->sub_user;
            $account_type  = $main_validation['reason']->account_type;
            $update_setate = $registeruser->BecomeATeacher($user_id_sub,$account_type);
            if($update_setate){
                echo json_encode(array('state'=>true,"message_type"=>"Now you have teacher priviladges use them wisely","data_set"=>null));

            }else{
                echo json_encode(array('state'=>true,"message_type"=>"Sorry We failed to make you teacher please try again at some other time","data_set"=>null));

            }
        }
       } catch (\Throwable $th) {
           //throw $th;
       } 
    }else if($activity_type=="MY_STATE"){
       
        try {
            $main_validation = $LoginObject->ToeknValidator($headers);
            $token_state = $main_validation['state'];
            
            if($main_validation['state']){
                $reason_info = $token_state['reason'];
                $user_id_sub = $main_validation['reason']->sub_user;
                $account_type  = $main_validation['reason']->account_type;
                $state = $data['state'];
                $update_setate = $registeruser->ChangeStateOf($user_id_sub,$state);
                if($update_setate){
                    echo json_encode(array('state'=>true,"message_type"=>"Account State is updated","data_set"=>null));
    
                }else{
                    echo json_encode(array('state'=>true,"message_type"=>"Sorry We failed to make you teacher please try again at some other time","data_set"=>null));
    
                }
            }else{
                echo json_encode(array('state'=>true,"message_type"=>"Please login properly validation failed","data_set"=>null));

            }
           } catch (\Throwable $th) {
               throw $th;
           }    
    }
    
}

?>
