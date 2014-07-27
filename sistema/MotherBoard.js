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





window.MotherBoard = function(config,processorConfigs) {
    this.typeRender="decimal"; //hexa, binary
    this.processorRender='[processorarea]';
    this.memoryRender='[memoryarea]';

    var memory=new Memory(config.memorySize);
    this.memory=memory;
    var devices=new Array();
    this.devices=devices;

    //processors
    var processors=new Array();

    this.processors=processors;

    console.log(this.processorList);
    
    processorConfigs.forEach(function(e,i){
        processors[i]= new Processor(e, memory, devices);
    });
    this.propertyIsEnumerable()
    //end processors
}

MotherBoard.call="MotherBoard";

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
    return returnValue;
}
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
}
MotherBoard.prototype.renderMotherBoard= function(){
    this.renderMemory();
    this.renderProcessors();
}
MotherBoard.prototype.renderProcessors = function(){
    processorList.forEach(function(e,el){
        var cfg;
        $(cfg).load(e,function(){
           MotherBoard.processors[el]=new Processor(cfg); 
           MotherBoard.processors[el].render(this.processorRender);
        });
    });
}
MotherBoard.prototype.renderMemory=function(){
    console.log(this.memoryRender);
    this.memory.render(this.memoryRender);
}
