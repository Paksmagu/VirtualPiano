<?php
header("Content-Type: application/json; charset=UTF-8");
if (!is_null($_POST["name"]) && !is_null($_POST["email"])
    && !is_null($_POST["donationAmount"]) && !is_null($_POST["noteId"])
    && !is_null($_POST["isAnonymous"])) {
    include_once 'Database.php';
    include_once 'Constants.php';
    $db = new Database();
    $pdo = $db->getConnection();
    $insertToDonatorTable = $pdo->prepare("
INSERT INTO Donators (name, email, noteId, donationAmount, isAnonymous, donationText)
    VALUES (?, ?, ?, ?, ?, ?);");

    $name = $_POST["name"];
    $email = $_POST["email"];
    $noteId = $_POST["noteId"];
    $donationAmount = $_POST["donationAmount"];
    $donationText = $_POST["donationText"];
    $isAnonymous = $_POST["isAnonymous"];

    if (!Constants::validateBuyAmount($donationAmount)) {
        echo json_encode(Constants::generateError("'donationAmount' is not a proper donate amount. >$donationAmount<"));
        return;
    }
    if (!Constants::validateNoteId($noteId)) {
        echo json_encode(Constants::generateError("'noteId' is not a numeric value. >$noteId<"));
        return;
    }

    $validateDonationAmountQuery = $pdo->prepare("
SELECT * 
FROM Notes
WHERE id = ?;");

    $validateDonationAmountQuery->execute([$noteId]);
    $noteResult = $validateDonationAmountQuery->fetch();
    if ($noteResult["currentPrice"] + $donationAmount > $noteResult["totalPrice"]) {
        echo json_encode(Constants::generateError("Price is too high, maximum price for note is 200 ---- ".$noteResult["currentPrice"]." + ".$donationAmount));
        return;
    }

    try {
        $insertToDonatorTable->execute([$name, $email, $noteId, $donationAmount, $isAnonymous, $donationText]);
        $responseList = Constants::truncateName($insertToDonatorTable->fetchAll());
        echo json_encode($responseList);
        return;
    } catch (PDOException $exception) {
        echo json_encode($exception);
        return;
    }
} else {
    echo json_encode(Constants::generateError("Please make sure you have an 'name' / 'email' / 'donationAmount' / 'noteId' / 'isAnonymous' as a POST parameter!"));
    return;
}
?>