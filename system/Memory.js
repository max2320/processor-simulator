window.Memory = function(size,program) {
    this.selector = '';
    this.memory_array = new Array();
    this.attributes = {
        'el': 'mem',
        'pointer': 0,
        'barramento': '',
    };
    this.size = size;
    this.program=program;
    var dataArray = new Array();

    for(var i=0 ; i < size ; i++){
        dataArray.push(new Storage(i));
    }

    this.dataArray=dataArray;
    this.UIArray=new Array();

    this.setProgram(program);
}
Memory.prototype.render = function(selector) {
    
    var memoryObj = $('<ul>').addClass('memory').attr({
        'id': 'memoria_principal',
    });
    // var li_head = $('<li>').attr({

    // });

    // var div_address = $('<div>').addClass('lable').html('ADD');
    // var div_value = $('<div>').addClass('value').html('VAL');

    // li_head.append(div_address);
    // li_head.append(div_value);

    // memoryObj.append(li_head);
    var UIArray = [];
    var val = 0;
    this.dataArray.forEach(function(obj,add){
        // console.log(obj);
        var li = $('<li>').attr({
            'arr':add,
        });
        obj.render(li);
        UIArray.push(li);
        memoryObj.append(li);
    });
    
    $(selector).html('');
    $(selector).append(memoryObj);
    this.UIArray=UIArray;
    this.selector=selector;
    this.memoryObj = memoryObj;
};
Memory.prototype.selectAddress = function(address,hide){
    // console.log(this.UIArray[address]);
    if(this.UIArray[address] == undefined){
        motherBoard.stopProcessing();
        alert("ERRO : Endereço não encontrado!");
        return false;
    }
    $(this.UIArray[address]).highlight(hide);
    this.selectedAddress=address;
};

Memory.prototype.read=function(){
    return this.dataArray[this.selectedAddress].read();
}
Memory.prototype.write=function(value){
    this.dataArray[this.selectedAddress].write(value);
}
Memory.prototype.getProgram=function(){
    var program=[];
    this.dataArray.forEach(function(obj,add){
        program.push(obj.read());
    });
    return program.join("\n");
}
Memory.prototype.setProgram=function(str){
    var program=str.split("\n");
    var thisMem=this
    program.forEach(function(cod,add){
        thisMem.dataArray[add].write(cod);
    });
}