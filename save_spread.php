<?php

$spread_filename = "spreads.dat";

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

// save spreads
$file = fopen($spread_filename, "a+") or die ("Cannot create or open file ".$spread_filename.".");
fwrite($file, $card_name."\t".$card_positions."\n");
fclose($file);

echo json_encode(array(
    "card_name" => $card_name,
    "card_positions" => $card_positions
)); 

?>
