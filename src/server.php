<?php
$_POST = json_decode( file_get_contents("php://input"), true );
echo var_dump($_POST);
/* https://api.telegram.org/bot1307316882:AAHl1GHzCStdRSquSxU4EMbJQI6AnGgIGFc/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$phone = $_POST['phone'];
$messenger = $_POST['messenger'];
$sendform	 = $_POST['sendform'];
$sendsizeA = $_POST['sendsizeA'];
$sendsizeB = $_POST['sendsizeB'];
$sendsizeC = $_POST['sendsizeC'];
$sendstyle = $_POST['sendstyle'];
$sendprice = $_POST['sendprice'];
$senddeadline = $_POST['senddeadline'];
$sendproblem = $_POST['sendproblem'];
$sendprioritet = $_POST['sendprioritet'];
$token = "1307316882:AAHl1GHzCStdRSquSxU4EMbJQI6AnGgIGFc";
$chat_id = "-435519441";
$arr = array(
  'Имя: ' => $name,
  'Телефон: ' => $phone,
  'Способ связи:' => $messenger,
  'Форма: ' => $sendform,
  'Размер A: ' => $sendsizeA,
  'Размер B: ' => $sendsizeB,
  'Размер С: ' => $sendsizeC,
  'Стиль: ' => $sendstyle,
  'Бюджет: ' => $sendprice,
  'Сроки: ' => $senddeadline,
  'Проблемы: ' => $sendproblem,
  'Приоритет: ' => $sendprioritet,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

/* if ($sendToTelegram) {
  header('Location: Thanks.html');
} else {
  echo "Error";
} */