(function($) {
    $.fn.highlight = function(remove) {
        if(remove==undefined){
            remove=true
        }
        if(remove){
            $('.hightlight').removeClass('hightlight');
        }
        $(this).addClass('hightlight');
        $(this)[0].scrollIntoView(false);
    }
})(jQuery);


window.parseBin= function(value,word){
    if(word==undefined){
        word=8;
    }
    var formated=[];
    while(value>0){
        formated.push(value%2);
        value=value-Math.round(value/2);
    }
    for(var i=formated.length;i<word;i++){
        formated.push('0');
    }
    var formatedFinal=[];
    for(var i=formated.length;i>0;i--){
        if(i==4){
            formatedFinal.push(" ");    
        }
        formatedFinal.push(formated[i-1]);
    }
    return formatedFinal.join('');
}
window.parseHexa=function(value){
    var hexacode={
        '0000':'0',
        '0001':'1',
        '0010':'2',
        '0011':'3',
        '0100':'4',
        '0101':'5',
        '0110':'6',
        '0111':'7',
        '1000':'8',
        '1001':'9',
        '1010':'A',
        '1011':'B',
        '1100':'C',
        '1101':'D',
        '1100':'E',
        '1101':'F',
    };
    var bin=parseBin(value);
    bin=bin.split(" ");
    var formated=[];
    bin.forEach(function(e){
        formated.push(hexacode[e]);
    })
    return formated.join('');
}


window.typeRender="hexa"; //hexa, binary
window.MotherBoard = function(config,processorConfigs,devicesConfig,program) {
    this.processorRender='[processorarea]';
    this.memoryRender='[memoryarea]';
    this.deviceRender='[devicearea]';
    if(program==undefined){
        program="0";
    }
    var memory=new Memory(config.memorySize,program);
    this.memory=memory;
    this.memorySize=config.memorySize;
    var devices=new Array();
    this.devices=devices;

    //devices
    devicesConfig.forEach(function(e){
        devices.push(new Devices(e));
    });
    //end devices

    //processors
    var processors=new Array();

    this.processors=processors;

    processorConfigs.forEach(function(e,i){
        processors[i]= new Processor(e, memory, devices);
    });
    //end processors

    // timmer
    this.controlUnit=new Clock(function(){
        processors.forEach(function(e){
            e.next();
        });
    });

    // emd timmer
    this.interval=1000;
}

MotherBoard.prototype.startProcessing = function(interval) {
    if(interval!=undefined){
        this.interval=interval;
    }else{
        interval=this.interval;
    }
    this.controlUnit.start(interval);
}
MotherBoard.prototype.stopProcessing = function() {
    this.controlUnit.pause();
}

MotherBoard.prototype.simpleDialog = function(w, h, onClose) {
    var overlay = $('<div>').addClass('overlay').css({'display': 'none'});
    var box = $('<div>').addClass('box').css({
        'width': w,
        'height': h,
        'margin-top': -h / 2,
        'margin-left': -w / 2
    });
    var content = $('<div>').addClass('contents').append($(this));
    var bar_top = $('<div>').addClass('bar_top');
    var btn_close = $('<button>').addClass('btn_close_dialog').click(function() {
        overlay.fadeOut(600, function() {
            overlay.remove();
            overlay = undefined;
            if ($.isFunction(onClose)) {
                onClose();
            }
        });
    }).html('Close');
    bar_top.append(btn_close);

    box.append(bar_top);
    box.append(content);
    overlay.append(box);
    $('body').append(overlay);
    overlay.fadeIn(600);
};
MotherBoard.prototype.render=function(){
    $(this.memoryRender).html('');
    this.memory.render(this.memoryRender);
    
    $(this.processorRender).html('');
    var processorRender=this.processorRender;

    this.processors.forEach(function(e){
        e.render(processorRender);
    });

    $(this.deviceRender).html('');
    var deviceRender=this.deviceRender;
    
    this.devices.forEach(function(e){
        e.render(deviceRender);
    });
};
MotherBoard.show = function(value){
    var returnValue="0";
    switch(window.typeRender){
        case 'decimal':
            returnValue = value;
            break
        case 'hexa':
            returnValue=parseHexa(value);
            break;
        case 'binary':
            returnValue=parseBin(value);
            break;
    }
    console.log(window.typeRender+" "+value+"=>"+returnValue);
    return returnValue;
};
MotherBoard.prototype.config = function(config){
    /*
    config:{
        processors:[
            '/sergium/cfg.js',
        ],
        memory: 30,
    }
    */

    this.processorList = config.processors;
    this.memory = new Memory(config.memory);
    this.clock = new Clock();
};
MotherBoard.prototype.renderMotherBoard= function(){
    this.renderMemory();
    this.renderProcessors();
};
MotherBoard.prototype.renderProcessors = function(){
    processorList.forEach(function(e,el){
        var cfg;
        $(cfg).load(e,function(){
           MotherBoard.processors[el]=new Processor(cfg); 
           MotherBoard.processors[el].render(this.processorRender);
        });
    });
};
MotherBoard.prototype.renderMemory=function(){
    console.log(this.memoryRender);
    this.memory.render(this.memoryRender);
};


////////////// CONFIG PANEL

MotherBoard.prototype.configPanel=function(){

    this.configModal = $('<div>').addClass('modal fade');
    this.configModalDialog = $('<div>').addClass('modal-dialog modal-lg');
    this.configModal.append(this.configModalDialog);

    this.configModalContent = $('<div>').addClass('modal-content');
    this.configModalDialog.append(this.configModalContent);

    this.configModalHeader = $('<div>').addClass('modal-header');
    this.configModalContent.append(this.configModalHeader);

    this.configMeaderLabel = $('<h4>').addClass('modal-title').text('Painel de configuração');
    this.configModalHeader.append(this.configMeaderLabel);

    this.configModalBody = $('<div>').addClass('modal-body');
    this.configModalContent.append(this.configModalBody);

    
    // content
    var processorsarea=$('<div>').addClass("row");
   
    ///PROCESSOR
        var processorsItems=$("<div>").addClass('col-sm-3');
        this.processors.forEach(function(el){
            processorsItems.append(el.getDescription());
        });
        processorsarea.append(processorsItems);
    ///END PROCESSOR

    //MEMORY
        var memoryarea = $("<div>").addClass('col-sm-3');

        var memoryLabel = $('<label>').html('Tamanho da memoria');
        var memoryInput = $('<input>').val(this.memorySize).css({
            'width':"100%"
        });;

        memoryarea.append(memoryLabel);
        memoryarea.append(memoryInput);
        processorsarea.append(memoryarea);

        
        var dataRender=$('<label>').html('Base de Exibição');
        var dataRenderselect=$('<select>').css({
            'width':"100%"
        });
        var opt=['hexa','binary','decimal'];
        opt.forEach(function(e){
            var dataRenderOpt=$('<option>').attr('value',e).html(e);
            if(e==window.typeRender){
                dataRenderOpt.prop('selected',true);
            }
            dataRenderselect.append(dataRenderOpt);
        });
        memoryarea.append(dataRender);
        memoryarea.append(dataRenderselect);

    //END MEMORY

    ///PROCESSOR
        var devicesItems=$("<div>").addClass('col-sm-3');
        this.devices.forEach(function(el){
            devicesItems.append(el.getDescription());
        });
        processorsarea.append(devicesItems);
    ///END PROCESSOR
    ///EDITOR
        var programArea=$('<div>').addClass('row');
        var programAreaLine=$('<div>').addClass('col-sm-12');
        var programAreaLabel=$('<label>').html('Program');
        var memoryProgram = $('<textarea>').val(this.memory.getProgram()).css({
            'width':'100%',
            'height':'200px'
        });
        programAreaLine.append(programAreaLabel);
        programAreaLine.append(memoryProgram);
        programArea.append(programAreaLine);

    ///EDITOR
    this.configModalBody.append(processorsarea);
    this.configModalBody.append(programArea);
    //END content



    this.configModalFooter = $('<div>').addClass('modal-footer');
    this.configModalContent.append(this.configModalFooter);


    var configModal=this.configModal;
    var btnSave= $('<button>').html('Salvar').click(function(){
        configModal.modal('hide');
        window.typeRender=dataRenderselect.val();
        motherBoard = new MotherBoard({
            'memorySize':memoryInput.val()
        },processorConfigs,devicesAvailable,memoryProgram.val());
        motherBoard.render();
        
    });
    this.configModalFooter.append(btnSave);



    this.configModal.modal();
}