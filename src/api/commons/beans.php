<?php
require_once '../../../../config_regina.php';
require_once '../vendor/rb.php';

R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE, DB_USER, DB_PASSWORD);
R::freeze(DB_FREEZE);