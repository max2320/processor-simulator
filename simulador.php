<!DOCTYPE html>
<html>
    <?php include 'includes/header.php' ?>
    <body>
        <link href="css/simulator.css" rel="stylesheet">
        <link href="css/font-awesome.css" rel="stylesheet">
        <script src="system/svg.js"></script>
        <script src="system/Init.js"></script>
        <script src="processor/<?php echo $_GET['simulador'] ?>/cfg.js"></script>
        <?php if(isset($_GET['edit_mode'])){ ?>
          <script src="system/edit_mode.js"></script>
        <?php } ?>

        <header class="header">
            <?php include 'includes/menu.php' ?>
        </header>
        <div class='site'>
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
                        <div id="processador" class="computer-element" style="height:450px;">
                            <svg id="bus_draw" style="width: 100%; height: 100%;"></svg>
                            <div processorarea='processorarea'>
                                <div id="aux_periferico_area"></div>
                                <div id="aux_memoria_area"></div>
                            </div>
                            <div id="processor_desc" class="processor-desc"></div>
                        </div>
                        <div id="controlUnitArea" class="computer-element">
                            <button title="Reduz Delay" type="button" id="ctrlClockMinus"><i class="fa fa-minus"></i></button>
                            <input disabled="disabled" type="text" id="ctrlClockCicleTimeDisplay" value="1000" style="width: 60px;" />
                            <button title="Aumenta Delay" type="button" id="ctrlClockPlus"><i class="fa fa-plus"></i></button>
                            <button title="Play" type="button" id="ctrlClockStart"><i class="fa fa-play"></i></button>
                            <button title="Pause" type="button" id="ctrlClockStop" style="display:none;"><i class="fa fa-pause"></i></button>
                            <button title="Reset" type="button" id="ctrlClockReset"><i class="fa fa-refresh"></i></button>
                            <!-- <button title="" type="button" onclick="editor_assembly();" title="editor"><\></button> -->
                            <button type="button" id="configPanel" title="Painel de configuração"><i class="fa fa-cog"></i></button>
                            <!-- <button type="button" id="description" title="Descritivo"><i class="fa fa-file-text-o"></i></button> -->
                            <?php if(isset($_GET['edit_mode'])){ ?>
                              <button type="button" title="Edit" onClick="design_mode()"><i class="fa fa-edit"></i></button>
                              <button type="button" title="Save"onClick="design_mode_end()"><i class="fa fa-save"></i></button>
                            <?php } ?>

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
        <script>
            $('#controlUnitArea [title]').tooltip();
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
            $('#ctrlClockReset').click(function(){
                if(motherBoard!=undefined){
                    motherBoard.reset();
                    $('#ctrlClockStop').css({'display':'none'});
                    $('#ctrlClockStart').css({'display':''});
                }
            });
            $('#configPanel').click(function(){
                motherBoard.configPanel();
            });
            $(function(){
                motherBoard.processors.forEach(function(processor){
                    $('#processor_desc').append($('<div>').html(processor.getDescriptionName()))
                });
            })
            setInterval(function(){
               if(motherBoard.controlUnit.running){
                    $('#ctrlClockStart').css({'display':'none'});
                    $('#ctrlClockStop').css({'display':''});
               }else{
                    $('#ctrlClockStop').css({'display':'none'});
                    $('#ctrlClockStart').css({'display':''});
               }
            },100);

        </script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-42927176-1', 'maxfs.com');ga('send', 'pageview');
        </script>
    </body>
</html>
