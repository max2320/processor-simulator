import Storage from './storage.es6'

class Memory {
  constructor(size,program) {
    this.selector = '';
    this.memory_array = [];
    this.attributes = {
        'el': 'mem',
        'pointer': 0,
        'barramento': '',
    };

    this.size = size;
    this.program=program;

    var dataArray = [];

    for(var i=0 ; i < size ; i++){
        dataArray.push(new Storage(i));
    }

    this.dataArray=dataArray;
    this.UIArray=[];

    this.setProgram(program);
  }

  render(selector) {
    var memoryObj = $('<ul>').addClass('memory').attr({
        'id': 'memoria_principal',
    });

    var UIArray = [];
    var val = 0;

    this.dataArray.forEach(function(obj,add){
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

  }

  selectAddress(address,hide){
    if(this.UIArray[address] == undefined){
      motherBoard.stopProcessing();
      alert("ERRO : Endereço não encontrado!");
      return false;
    }
    $(this.UIArray[address]).highlight(hide);
    this.selectedAddress=address;
  };

  read(){
    return this.dataArray[this.selectedAddress].read();
  }

  write(value){
    this.dataArray[this.selectedAddress].write(value);
  }

  getProgram(){
    var program=[];
    this.dataArray.forEach(function(obj,add){
      program.push(obj.read());
    });
    return program.join("\n");
  }

  setProgram(str){
    var program=str.split("\n");
    var thisMem=this

    program.forEach(function(cod,add){
        thisMem.dataArray[add].write(cod);
    });
  }
}
