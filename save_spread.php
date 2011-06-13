<?php

if (isset($_POST['card_positions'])){
    $value = $_POST['card_positions'];  
}else{
    $value = "";
}

echo json_encode(array("returnValue"=>"This is returned from PHP : ".$value)); 

?>
