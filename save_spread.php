<?php

if (isset($_POST['card_name'])){
    $card_name = $_POST['card_name'];
} else {
    $card_name = "";
}

if (isset($_POST['card_positions'])){
    $card_positions = $_POST['card_positions'];  
} else {
    $card_positions = "";
}

echo json_encode(array(
    "card_name" => $card_name,
    "card_positions" => $card_positions
)); 

?>
