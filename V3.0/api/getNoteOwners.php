<?php
header("Content-Type: application/json; charset=UTF-8");
$note = null;
if (!is_null($_GET['id'])) {
    include_once 'Database.php';
    include_once 'Constants.php';
    $db = new Database();
    $pdo = $db->getConnection();
    $statement = $pdo->prepare("
SELECT Donators.name, Donators.donationText, Donators.isAnonymous, Notes.displayNote, Notes.playNote 
FROM Donators 
    INNER JOIN Notes ON Notes.id = Donators.noteId 
WHERE Notes.playNote = ?
");
    $statement->execute([$_GET['id']]);
    $responseList = Constants::truncateName($statement->fetchAll());
    echo json_encode($responseList);
} else {
    $error = new stdClass();
    $error->status = 404;
    $error->message = "Please make sure you have an 'id' as a GET parameter!";
    echo json_encode($error);
}
?>