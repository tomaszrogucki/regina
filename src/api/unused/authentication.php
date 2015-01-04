<?php
require_once '../commons/database.php';
require_once 'users.php';

class Oauth {
    private $table = 'tokens';
    private $db;

    public function __construct() {
        $this->db = new Db();
    }

    function getToken($user) {

    }

    function setToken($user) {

    }

    function createToken($user) {
        return rand();
    }

    function getUser($token) {

    }
}
?>