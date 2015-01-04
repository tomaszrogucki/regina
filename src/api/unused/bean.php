<?php
require_once '../vendor/rb.php';

class Bean {
    private $bean;
    private $tableName;

    public function __construct() {
        $this->tableName = strtolower(get_class($this));
        $this->bean = R::dispense($this->tableName);
    }

    static function find() {
        return 1;
    }

    static function findById($id) {
        $class = get_called_class();
        $tableName = strtolower($class);

        $bean = R::load($tableName, $id);
        $result = new $class();
        Bean::_populateObjectStatic($result, $bean);

        return $result;
    }

    function get($id) {
        $this->bean = R::load($this->tableName, $id);
        $this->_populateObject();
    }

    function save() {
        $this->_populateBean(['id']);
        R::store($this->bean);
    }

    function update() {
        if($this->id == null) {
            throw new Exception('Cannot update a Bean that is not stored in DB!');
        }
        $this->_populateBean();
        R::store($this->bean);
    }


    private function _populateBean($skip = []) {
        $objectVars = get_object_vars($this);
        $classVarKeys = array_keys(get_class_vars(__CLASS__));

        foreach($objectVars as $key => $value) {
            // do not populate super class properties nor those to be skipped explicitly
            if(!in_array($key, $classVarKeys) && !in_array($key, $skip)) {
                $this->bean[$key] = $value;
            }
        }
    }

    private function _populateObject($skip = []) {
        $objectVars = $this->bean->getProperties();
        $classVarKeys = array_keys(get_class_vars(get_class($this)));

        foreach($objectVars as $key => $value) {
            // do not populate super class properties nor those to be skipped explicitly
            if(in_array($key, $classVarKeys) && !in_array($key, $skip)) {
                $this->$key = $value;
            }
        }
    }
    private static function _populateBeanStatic($bean, $object, $skip = []) {
        $objectVars = get_object_vars($object);
        $classVarKeys = array_keys(get_class_vars(__CLASS__));

        foreach($objectVars as $key => $value) {
            // do not populate super class properties nor those to be skipped explicitly
            if(!in_array($key, $classVarKeys) && !in_array($key, $skip)) {
                $bean[$key] = $value;
            }
        }
    }

    private static function _populateObjectStatic($object, $bean, $skip = []) {
        $objectVars = $bean->getProperties();
        $classVarKeys = array_keys(get_class_vars(get_class($object)));

        foreach($objectVars as $key => $value) {
            // do not populate super class properties nor those to be skipped explicitly
            if(in_array($key, $classVarKeys) && !in_array($key, $skip)) {
                $object->$key = $value;
            }
        }
    }
}