<?php
header("Content-Type: application/json; charset=UTF-8");
$note = null;
if (!is_null($_POST["name"]) && !is_null($_POST["email"]) && !is_null($_POST["donationAmount"])) {
    include_once 'Database.php';
    include_once 'Constants.php';
    $db = new Database();
    $pdo = $db->getConnection();
    $statement = $pdo->prepare("
INSERT INTO Donators (name, email, donationAmount)
    VALUES (?, ?, ?);
");

    $name = $_POST["name"];
    $email = $_POST["email"];
    $donationAmount = $_POST["donationAmount"];

    try {
        $statement->execute([$name, $email, $donationAmount]);
        $responseList = Constants::truncateName($statement->fetchAll());
        echo json_encode($responseList);
    } catch (PDOException $exception) {
        echo json_encode($exception);
    }
} else {
    $error = new stdClass();
    $error->status = 404;
    $error->message = "Please make sure you have an 'name' / 'email' / 'donationAmount' as a POST parameter!";
    echo json_encode($error);
}
?>