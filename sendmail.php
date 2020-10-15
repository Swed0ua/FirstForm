<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->chatSet = "UTF-8";
$mail->setLanguage('en', "phpmailer/language/");
$mail->isHTML(true);

$mail->setFrom( 'shmagala2001@gmail.com', 'Andrio');
$mail->addAddress('shmagala2k1@gmail.com', 'Andriy');

$mail->Subject = 'Hello, this my first sent form!!!';

$hand = "right";
if($_POST['hand'] == "left"){
    $hand = "left";
}

$body = '<h1> ladies and gentlemen meeeeeeeeeeet $@#@%@$@ MY FIRS SENT FORM $@#@%@$@ </h1>';

if (trim(!empty($_POST['name']))){
    $body.'<p><strong>Name : </strong>'.$_POST['name'].'</p>'
}
if (trim(!empty($_POST['message']))){
    $body.'<p><strong>Message : </strong>'.$_POST['message'].'</p>'
}
if (trim(!empty($_POST['hand']))){
    $body.'<p><strong>Message : </strong>'.$hand.'</p>'
}
if (trim(!empty($_POST['age']))){
    $body.'<p><strong>Message : </strong>'.$_POST['age'].'</p>'
}

if (!empty($_FILES['image']['tmp_name'])){
    $filePath = __DIR__.'/files/'.$_FILES['image']['tmp_name'];

    if(copy($_FILES['image']['tmp_name'], $filePath)){
        $fileAttach = $filePath;
        $body.'<p><strong>Attach file : </strong> </p>';
        $mail->addAttachment($fileAttach);
    }
}

@mail->Body = $body;

if(!$mail->send()){
    $message = "ERROR";
} else {
    $message = "Data sent!"
}




$response = ["message" => $message];
header("Content-type: application/json");

echo json_encode($response);
?>