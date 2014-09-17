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





window.MotherBoard = function(config,processorConfigs,devicesConfig) {
    this.typeRender="decimal"; //hexa, binary
    this.processorRender='[processorarea]';
    this.memoryRender='[memoryarea]';
    this.deviceRender='[devicearea]';

    var memory=new Memory(config.memorySize);
    this.memory=memory;
    this.memorySize=config.memorySize;
    var devices=new Array();
    this.devices=devices;

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
    this.memory.render(this.memoryRender);
    
    var processorRender=this.processorRender;

    this.processors.forEach(function(e){
        e.render(processorRender);
    });
};
MotherBoard.show = function(value){
    var returnValue="0";
    switch(this.typeRender){
        case 'decimal':
            returnValue = value;
            break
        case 'hexa':
            break;
    }
    return value;
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
        var memoryInput = $('<input>').val(this.memorySize);

        memoryarea.append(memoryLabel);
        memoryarea.append(memoryInput);

        processorsarea.append(memoryarea);
    //END MEMORY


    this.configModalBody.append(processorsarea);
    //END content



    this.configModalFooter = $('<div>').addClass('modal-footer');
    this.configModalContent.append(this.configModalFooter);


    var configModal=this.configModal;
    var btnSave= $('<button>').html('Salvar').click(function(){
        configModal.modal('hide');
        motherBoard = new MotherBoard({
            'memorySize':memoryInput.val()
        },processorConfigs);
        motherBoard.render();
        
    });
    this.configModalFooter.append(btnSave);



    this.configModal.modal();
}