<?php
header("Content-Type: application/json; charset=UTF-8");
include_once 'Database.php';
$db = new Database();
$pdo = $db->getConnection();
$statement = $pdo->prepare("
SELECT *
FROM Notes
");
$statement->execute();
echo json_encode($statement->fetchAll());
?>