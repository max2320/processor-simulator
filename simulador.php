<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simulador</title>
        <link href="css/estilo_definitivo.css" rel="stylesheet" />
        <link href="css/devices.css" rel="stylesheet" />
        <link href="css/jquery-ui.css" rel="stylesheet" />
        
        <script src="Scripts/jquery.js"></script>
        <script src="Scripts/jquery-ui.js"></script>
        <script src="Scripts/nanoscroller.js"></script>
        
        <script src="sistema/Init.js"></script>
        <script src="processadores/sergium/cfg.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <?php include 'includes/menu.php' ?>
            </div>
            <div class="center">
                <div id="computador">
                    
                    <div class="memoria-box">
                        <div class="box-title">
                            <span>MEM&Oacute;RIA</span>
                        </div>
                        <div id="memoria-content" class="box_scrollbar">
                            <div memoryarea="memoryarea" class="content"></div>
                        </div>
                    </div>
                    <div class="processador-box">
                        <div id="processador">
                            <div class="processador_info_btn">
                                <span id="processador_info" class="button" icon="note"></span>
                                <script>
                                    $('#processador_info').hover(function(){
                                        $('#processador_info_area').css('display','block');
                                    },function(){
                                        $('#processador_info_area').css('display','none');
                                    })
                                </script>
                                <div id="processador_info_area">
                                    <span procinfo="nome">
                                        <strong>Processador:</strong>
                                    </span>
                                    <span procinfo="descricao">
                                        <strong>Descrição:</strong>
                                    </span>
                                    <span procinfo="arquitetura">
                                        <strong>Arquitetura:</strong>
                                    </span>
                                    <span procinfo="memoria.size">
                                        <strong>Tamanho Memória:</strong>
                                    </span>
                                </div>
                            </div>
                            <div id="aux_memoria_area"></div>
                            <canvas id="fullcanvas" height="395" width="442"></canvas>
                            <div id="aux_periferico_area"></div>
                            <div processorarea='processorarea'></div>
                        </div>
                        <div id="unidade_controle">
                            <div id="clock_area">
                                <a class="button" icon="minus" subclock=""></a>
                                <input disabled="disabled" type="text" id="clock" value="1000" style="width: 35px; height: 14px; font-size: 12px;" />
                                <a class="button" icon="plus" addclock=""></a>
                            </div>
                            <a class="button" icon="play" onclick="start_processamento();"></a>
                            <a class="button" icon="pause" style="display:none;" onclick="stop_processamento();"></a>
                            <a class="button" icon="seek-first" onclick="reset_processamento();"></a>
                            <a class="button" icon="script" onclick="editor_assembly();" title="editor"></a>
                            
                            <script src="sistema/clock.js"></script>
                            <script src="processadores/<?php echo $_GET['simulador']?>/programateste.js"></script>
                        </div>
                    </div>
                    <div class="perifericos-box">
                        <div class="box-title">
                            <span>PERIF&Eacute;RICOS</span>
                        </div>
                        <div class="controlador_per">
                            <select id="tipo_periferico" name="tipo_periferico" style="float:left">
                                <option value="display">Display</option>
                                <option value="numberkeypad">Number Key Pad</option>
                            </select>
                            <a class="button" icon="plus" id="ADD_periferico"></a>
                            <script src="sistema/devices.js"></script>
                        </div>
                        <div id="perifericos-content" class="box_scrollbar">
                            <div id="perifericos" class="content">
                                <ul el="per" barramento="" qtd="0"> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-42927176-1', 'maxfs.com');ga('send', 'pageview');
        </script>
    </body>
</html>
