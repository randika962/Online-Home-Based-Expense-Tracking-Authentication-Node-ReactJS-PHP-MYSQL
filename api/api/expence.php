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
   
    if($activity_type==="ADD_EXPENCE"){
            try {
                $main_validation = $LoginObject->ToeknValidator($headers);
                $token_state = $main_validation['state'];
                
                if($main_validation['state']){
                    $reason_info = $token_state['reason'];
                    $user_id = $main_validation['reason']->sub_user;
                    // uploadmanager
                  $state = $expence->AddNewExpence($user_id,$_POST['reason'],$_POST['amount'],$_POST['category'],$_POST['state'],$_POST['date'],$_FILES,$uploadmanager);
                  if($state){
                    echo  json_encode(array('state'=>true,"message_type"=>"New Expence Track Logged in to your expence","_POST_set"=>null));

                  }else{
                    echo  json_encode(array('state'=>false,"message_type"=>"Something went wrong while registering please try again latter","_POST_set"=>null));

                  }
                    
                }else{
                    echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

                }
            } catch (\Throwable $th) {
                throw $th;
            }

    }else if($activity_type==="VIEW_MY_EXPENCES"){
      try {
          $main_validation = $LoginObject->ToeknValidator($headers);
          $token_state = $main_validation['state'];
          
          if($main_validation['state']){
              $reason_info = $token_state['reason'];
              $user_id = $main_validation['reason']->sub_user;
              echo $expence->getExpencesAndIncome($user_id);
          }else{
            echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));
          }
        }catch (\Throwable $th) {
          throw $th;
      }
    }else if($activity_type=="MY_SALLERY"){
      try {
        $main_validation = $LoginObject->ToeknValidator($headers);
        $token_state = $main_validation['state'];
        
        if($main_validation['state']){
            $reason_info = $token_state['reason'];
            $user_id = $main_validation['reason']->sub_user;
            
            echo  json_encode(array('state'=>true,"message_type"=>"","data_set"=>$expence->getSallery($user_id)));
        }else{
          echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

        }
      }catch (\Throwable $th) {
        throw $th;
    }
    }else if($activity_type=="UPDATE_SALLERY"){
      try {
        $main_validation = $LoginObject->ToeknValidator($headers);
        $token_state = $main_validation['state'];
        
        if($main_validation['state']){
            $reason_info = $token_state['reason'];
            $user_id = $main_validation['reason']->sub_user;
            $state = $expence->UpdateSallery($data['sallery'],$user_id);
           if($state){
            echo  json_encode(array('state'=>true,"message_type"=>"Sallery Has Been updated","data_set"=>""));
           }else{
            echo  json_encode(array('state'=>false,"message_type"=>"Sorry We coudn't update the sallery","data_set"=>""));
           }
        }else{
          echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

        }
      }catch (\Throwable $th) {
        throw $th;
    }
    }else if($activity_type == "GET_EXPENCES"){
      // GetMonthlyExpences
      // GetThisMonth
      try {
        $main_validation = $LoginObject->ToeknValidator($headers);
        $token_state = $main_validation['state'];
        
        if($main_validation['state']){
            $reason_info = $token_state['reason'];
            $user_id = $main_validation['reason']->sub_user;
            $type_of = $data['type_of'];
            $array_of_data = [];
            if($type_of==="MONTHLY"){
             $array_of_data =  $expence->GetMonthlyExpences($user_id);
            }else if ($type_of=="MONTH"){
             $array_of_data =  $expence->GetThisMonth($user_id);
              
            }else if($type_of==="CATEGORY"){
              $array_of_data =  $expence->GetCategoyes($user_id,$data['category']);
            }
          echo  json_encode(array('state'=>true,"message_type"=>true,"data_set"=>$array_of_data));

        }else{
          echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

        }
      } catch (\Throwable $th) {
        throw $th;
      }
    }else if($activity_type =="FAMILY_EXPENCES"){
      

try {
  $main_validation = $LoginObject->ToeknValidator($headers);
  $token_state = $main_validation['state'];
 
  if($main_validation['state']){
      $reason_info = $token_state['reason'];
      $user_id = $main_validation['reason']->sub_user;
      $main_user_id = $main_validation['reason']->main_user;
      $type_of = $data['type_of'];
      $array_of_data = [];
      
      if($type_of==="MONTHLY"){
        $array_of_data =  $expence->GetEveryoneIncomeStatmentAllTheMonths($main_user_id);
      }else if ($type_of==="MONTH"){
     
        $array_of_data =  $expence->GetEveryoneIncomeStatmentThisMonth($main_user_id);
        
      }
    echo  json_encode(array('state'=>true,"message_type"=>true,"data_set"=>$array_of_data));

  }else{
    echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

  }
} catch (\Throwable $th) {
  throw $th;
}
}else if($activity_type =="GET_DASHBOARD"){
  try {
    $main_validation = $LoginObject->ToeknValidator($headers);
    $token_state = $main_validation['state'];
   
    if($main_validation['state']){
        $reason_info = $token_state['reason'];
        $user_id = $main_validation['reason']->sub_user;
        
 
        
        $array_of_data = $expence->GetDashboardExpences($user_id);
        echo  json_encode(array('state'=>true,"message_type"=>true,"data_set"=>$array_of_data));
    }else{
    echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

    }
  } catch (\Throwable $th) {
    throw $th;
  }
}else if($activity_type =="GETFORNOTIFY"){
  try {
    $main_validation = $LoginObject->ToeknValidator($headers);
    $token_state = $main_validation['state'];
   
    if($main_validation['state']){
        $reason_info = $token_state['reason'];
        $user_id = $main_validation['reason']->sub_user;
        
 
        
        $array_of_data = $expence->GetItemsForNotify($user_id);
        echo  json_encode(array('state'=>true,"message_type"=>true,"data_set"=>$array_of_data));
    }else{
    echo  json_encode(array('state'=>false,"message_type"=>"Token expired or invalide please relogin and try again","_POST_set"=>null));

    }
  } catch (\Throwable $th) {
    throw $th;
  }
}



  }
?>