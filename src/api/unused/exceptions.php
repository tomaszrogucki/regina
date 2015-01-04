<?php
  class Exception2 {
      protected $code;
      protected $message;

      public function setCode($code) {
          $this->code = $code;
      }

      public function setMessage($message) {
          $this->message = $message;
      }
  }
?>