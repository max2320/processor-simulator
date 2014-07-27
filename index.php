<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Simulador</title>
        <link href="css/estilo_definitivo.css" rel="stylesheet">
        <link href="css/jquery-ui.css" rel="stylesheet">
        <script src="Scripts/jquery.js"></script>
        <script src="Scripts/jcanvas.js"></script>
        <script src="Scripts/jquery-ui.js"></script>
        <script src="Scripts/nanoscroller.js"></script>
        <script>
            $(document).ready(function(){
                $('.box_scrollbar').nanoScroller();
            });
        </script>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <?php include 'includes/menu.php' ?>
            </div>
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
