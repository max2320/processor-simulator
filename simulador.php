<!DOCTYPE html>
<html>
    <?php include 'includes/header.php' ?>
    <body>
        <header class="header">
            <?php include 'includes/menu.php' ?>
        </header>

        <link href="css/simulator.css" rel="stylesheet">

        <script src="system/Init.js"></script>
        <script src="processor/sergium/cfg.js"></script>


        <div id="computador" class="row">
                
                <div class="col-xs-3 col-sm-3">
                    <div class="content-computer-area">
                        <h3>MEM&Oacute;RIA</h3>
                        <div id="memoria-content" class="box_scrollbar">
                            <div memoryarea="memoryarea" class="content"></div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6 col-sm-6">
                    <div class="content-computer-area">
                        <div id="processador" class="computer-element">
                            <canvas id="fullcanvas" height="395" width="442"></canvas>
                            <div processorarea='processorarea'>
                                <div id="aux_periferico_area"></div>
                                <div id="aux_memoria_area"></div>
                            </div>
                        </div>
                        <div id="controlUnitArea" class="computer-element">
                            <button type="button" id="ctrlClockMinus">-</button>
                            <input disabled="disabled" type="text" id="ctrlClockCicleTimeDisplay" value="1000" style="width: 35px;" />
                            <button type="button" id="ctrlClockPlus">+</button>
                            <button type="button" id="ctrlClockStart">></button>
                            <button type="button" id="ctrlClockStop" style="display:none;">||</button>
                            <button type="button" onclick="reset_processamento();">|></button>
                            <button type="button" onclick="editor_assembly();" title="editor"><\></button>
                            <button type="button" id="configPanel" title="Painel de configuração">*</button>
                            <script>
                                var defaultCicleTime=1000;
                                $('#ctrlClockMinus').click(function(){
                                    var time=defaultCicleTime-100;
                                    if(time>=100){
                                        defaultCicleTime=time;
                                    }
                                    $('#ctrlClockCicleTimeDisplay').val(defaultCicleTime);
                                });
                                $('#ctrlClockPlus').click(function(){
                                    var time=defaultCicleTime+100;
                                    if(time<30000){
                                        defaultCicleTime=time;
                                    }
                                    $('#ctrlClockCicleTimeDisplay').val(defaultCicleTime);
                                });
                                $('#ctrlClockStart').click(function(){
                                    if(motherBoard!=undefined){
                                        motherBoard.startProcessing(defaultCicleTime);
                                        $('#ctrlClockStart').css({'display':'none'});
                                        $('#ctrlClockStop').css({'display':''});
                                    }

                                });
                                $('#ctrlClockStop').click(function(){
                                    if(motherBoard!=undefined){
                                        motherBoard.stopProcessing(defaultCicleTime);
                                        $('#ctrlClockStop').css({'display':'none'});
                                        $('#ctrlClockStart').css({'display':''});
                                    }
                                });
                                $('#configPanel').click(function(){
                                    motherBoard.configPanel();
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <div class="col-xs-3 col-sm-3">
                    <div class="content-computer-area">
                        <h3>PERIF&Eacute;RICOS</h3>
                        <div id="perifericos-content" class="box_scrollbar ">
                            <div id="perifericos" class="content">
                                <ul devicearea="devicearea" class="devices"> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="modal fade" id="configPanelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title" modaltitle>Configurações</h4>
                        </div>
                        <div class="modal-body" modalbody>

                            <div></div>
                        
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
