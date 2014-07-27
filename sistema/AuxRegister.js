window.AuxRegister = function(config) {
    /*
    {
        'name': 'epi',
        'showName': 'EPI',
        'size': 255,
        'orientation': {
            'x': 150,
            'y': 10
        },
        'bus': 'em'
    }
    */
    var size =config.size
    this.attributes = {
        'el': config.name,
        'l': config.css.left,
        'bus': config.bus,
        'pointer': config.pointer,
        'size': size,
    }
    this.size= size;
    this.name = config.showName
    this.css = config.css
    var dataArray = new Array();

    for(var i=0 ; i < size ; i++){
        dataArray.push(new Storage(i));
    }

    this.dataArray=dataArray;
    this.UIArray=new Array();
    return this;
}
AuxRegister.prototype.render= function(selector){
    this.regObj = $('<div>').attr(this.attributes).addClass('registrador_auxiliar draggable').css(this.css);


    var auxRegisterObj = $('<ul>');
    var li_head = $('<li>').attr({

    });

    var div_address = $('<div>').addClass('lable').html('ADD');
    var div_value = $('<div>').addClass('value').html('VAL');

    li_head.append(div_address);
    li_head.append(div_value);

    auxRegisterObj.append(li_head);

    var UIArray = [];
    var val = 0;
    this.dataArray.forEach(function(obj,add){
        // console.log(obj);
        var li = $('<li>').attr({
            'arr':add,
        });
        obj.render(li);
        UIArray.push(li);
        auxRegisterObj.append(li);
    });
    this.regObj.append(auxRegisterObj);
    $(selector).append(this.regObj);
    this.UIArray=UIArray;
    this.selector=selector;
    this.auxRegisterObj = auxRegisterObj;
}
AuxRegister.prototype.selectAddress = function(address){
    $(this.UIArray[address]).highlight();
    this.selectedAddress=address;
};
AuxRegister.prototype.read=function(){
    return this.dataArray[this.selectedAddress].read();
}
AuxRegister.prototype.write=function(value){
    this.dataArray[this.selectedAddress].write(value);
}
