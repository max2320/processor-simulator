window.Memory = function(size) {
    this.selector = '';
    this.memory_array = new Array();
    this.attributes = {
        'el': 'mem',
        'pointer': 0,
        'barramento': '',
    };
    this.size = size;
    var dataArray = new Array();

    for(var i=0 ; i < size ; i++){
        dataArray.push(new Storage(i));
    }

    this.dataArray=dataArray;
    this.UIArray=new Array();
}
Memory.prototype.render = function(selector) {
    
    var memoryObj = $('<ul>').addClass('memory').attr({
        'id': 'memoria_principal',
    });
    var li_head = $('<li>').attr({

    });

    var div_address = $('<div>').addClass('lable').html('ADD');
    var div_value = $('<div>').addClass('value').html('VAL');

    li_head.append(div_address);
    li_head.append(div_value);

    memoryObj.append(li_head);

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
Memory.prototype.selectAddress = function(address){
    // console.log(this.UIArray[address]);
    $(this.UIArray[address]).highlight();
    this.selectedAddress=address;
};

Memory.prototype.read=function(){
    return this.dataArray[this.selectedAddress].read();
}
Memory.prototype.write=function(value){
    this.dataArray[this.selectedAddress].write(value);
}
