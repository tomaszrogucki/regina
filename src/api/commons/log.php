<?php

class Log {
    static protected $dir = '..';
    static protected $file = 'application.log';

    public function __construct($file = '../application.log') {
        Log::$file = $file;
    }

    static public function info($message) {
        Log::logLine('INFO', $message);
    }

    static protected function logLine($type, $message) {
        $fullMessage = gmdate('Y-m-d H:i:s') . '[' . $type . '] ' . ' ' . $message;

//        if (!file_exists(Log::$dir)) {
//            mkdir(Log::$dir, 0744);
//        }

        file_put_contents(Log::$dir . '/' . Log::$file, $fullMessage . PHP_EOL, FILE_APPEND);
    }
}