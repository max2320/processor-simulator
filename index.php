<!DOCTYPE html>
<html>
    
    <?php include 'includes/header.php' ?>
    <body>
        <header class="header">
            <?php include 'includes/menu.php' ?>
        </header>
        <div class="container">
            <div class="site-center">
                <div class="site-box-conteudo">
                    <?php include "includes/pages/" . (isset($_GET['page']) ? $_GET['page'] : "index") . ".php"; ?>
                </div>
            </div>
        </div>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-42927176-1', 'maxfs.com');ga('send', 'pageview');
        </script>
    </body>
</html>
