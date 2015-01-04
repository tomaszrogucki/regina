<?php
require_once '../commons/database.php';
require_once '../commons/bean.php';
require_once '../vendor/rb.php';

class User extends Bean {
    public $id;
    public $email;
    public $password;
    public $name;
    public $surname;

    public function __construct() { //__construct($id = null, $email, $password, $name, $surname) {
        parent::__construct();

//        $this->id = $id;
//        $this->email = $email;
//        $this->password = $password;
//        $this->name = $name;
//        $this->surname = $surname;
    }

    function fromDb() {

    }

    function toDb() {

    }

    function toJson() {

    }

    function fromJson() {

    }
}

class UserService {
    private $table;
    private $db;

    function UserService() {
        $this->table = 'users';
        $this->db = new Db();
    }

    function getUser($id) {
        return $this->db->query('SELECT id, email, password, name, surname FROM ' . $this->table . ' WHERE id = ' . $id . ';');
    }

    function setUser($user) {
//        $query = 'INSERT INTO ' . $this->table . ' (id, email, password, name, surname) VALUES (' . $user->id . ', "' . $user->email . '", "' . $user->password . '", "' . $user->name . '", "' . $user->surname . '");';
//        return $this->db->set($query);


        $theUser = new User('1', 'A', 'B', 'C', 'e');
        print(json_encode($theUser));

        $token = R::dispense('token');
        $token->token = 'ABC123';

        $user = R::load('user', 3);
        print(json_encode($user->getProperties()));

//        $user->ownTokenList[] = $token;
//        R::store($user);
        print_r($user->ownTokenList);
//
//        $u = User::findById(5);
//
//        var_dump($u);

//        return $id;
    }
}