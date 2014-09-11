<?php

error_reporting(E_ALL);
$user_agent = strtolower($_SERVER['HTTP_USER_AGENT']);
echo $user_agent;
// matches popular mobile devices that have small screens and/or touch inputs
// mobile devices have regional trends; some of these will have varying popularity in Europe, Asia, and America
// detailed demographics are unknown, and South America, the Pacific Islands, and Africa trends might not be represented, here
if (!preg_match("/ipad/", $user_agent)) {
    if (preg_match("/phone|iphone|itouch|ipod|symbian|android|htc_|htc-|palmos|blackberry|opera mini|iemobile|windows ce|nokia|fennec|hiptop|kindle|mot |mot-|webos\/|samsung|sonyericsson|^sie-|nintendo/", $user_agent)) {
        // these are the most common
        echo "::mobile";
        flush();
        ?>
        <script>
            window.location.href='http://www.tempodental.com.br';
        </script>
        <?php

        die();
    } else if (preg_match("/mobile|pda;|avantgo|eudoraweb|minimo|netfront|brew|teleca|lg;|lge |wap;| wap /", $user_agent)) {
        // these are less common, and might not be worth checking
        echo "::mobile";
        flush();
        ?>
        <script>
            window.location.href='http://www.tempodental.com.br';
        </script>
        <?php

        die();
    }
}
?>