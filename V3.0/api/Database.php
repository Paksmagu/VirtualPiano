<?php
class Database {
    private string $host = "localhost";
    private string $dbName = "virtualPiano";
    private string $username = "paksmagu";
    private string $password = "onlineResentfulTK1234";
    private string $charSet = "utf8";
    private array $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    public ?PDO $connection;

    public function getConnection() {
        $this -> connection = null;
        $dsn = "mysql:host=$this->host;dbname=$this->dbName;charset=$this->charSet";
        try {
            $this->connection = new PDO($dsn, $this->username, $this->password, $this->options);
        } catch (PDOException $exception) {
            $error = new stdClass();
            $error->status = 404;
            $error->message = "Connection Errror: " . $exception->getMessage();
            echo json_encode($error);
        }

        return $this->connection;
    }
}
?>