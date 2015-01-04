<?php

require_once '../../../config.php';
require_once '../vendor/rb.php';

class Db
{
    private $host;
    private $user;
    private $password;
    private $database;

    function Db($host = DB_HOST, $user = DB_USER, $password = DB_PASSWORD, $database = DB_DATABASE) {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
        $this->database = $database;

        $this->initialize();
    }

    private function initialize() {
        R::setup('mysql:host=' . $this->host . ';dbname=' . $this->database, $this->user, $this->password);
    }

//    function get($class, $id) {
//
//    }
//
//    function set($object) {
//
//    }
//
//    function update($object) {
//
//    }
//
//    function delete($object) {
//
//    }

    function query($query, $page = 1, $perPage = 10) {
        if (!is_null($page)) {
            $range = (string)((int)$page * $perPage) . ',' . (string)($perPage);
            $query = $query . ' LIMIT ' . $range;
        }

        $db = mysqli_connect($this->host, $this->user, $this->password, $this->database);
        $result = mysqli_query($db, $query);
        $rows = array();
        while($row = mysqli_fetch_assoc($result)){
            $rows[] = $row;
        }
        mysqli_close($db);

        return $rows;
    }

    function set($query) {
        $db = mysqli_connect($this->host, $this->user, $this->password, $this->database);
        $result = mysqli_query($db, $query);
        mysqli_close($db);

        return $result;
    }

    function getById() {

    }
}

?>
