<?php
header("Content-Type: application/json; charset=UTF-8");
include_once 'Database.php';
include_once 'Constants.php';
$db = new Database();
$pdo = $db->getConnection();
$statement = $pdo->prepare("
SELECT name, isAnonymous
FROM Donators
");
$statement->execute();
$responseList = Constants::truncateName($statement->fetchAll());
echo json_encode($responseList);
?>