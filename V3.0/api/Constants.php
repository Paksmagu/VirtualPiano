<?php
class Constants {
    public static function truncateName($responseList) {
        foreach ($responseList as $responseKey => $response) {
            if ($responseList[$responseKey]["isAnonymous"] == 1) {
                $name = $response["name"];
                $responseList[$responseKey]["name"] = mb_substr($name, 0, 1) . str_repeat("*", mb_strlen($name) - 1);
            }
        }
        return $responseList;
    }
    public static function validateBuyAmount($buyAmount) {
        if (is_numeric($buyAmount) && ($buyAmount == 50 || $buyAmount == 100 || $buyAmount == 200)) {
            return true;
        } else {
            return false;
        }
    }

    public static function validateNoteId($noteId) {
        return is_numeric($noteId);
    }

    public static function generateError($message) {
        $error = new stdClass();
        $error->status = 404;
        $error->message = $message;
        return $error;
    }
}