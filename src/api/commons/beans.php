<?php
require_once '../../../config.php';
require_once '../vendor/rb.php';

R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE, DB_USER, DB_PASSWORD);