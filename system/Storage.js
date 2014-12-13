/**
*
*/
window.Storage = function(label,size){
    this.label = label;
    this.labelObj = $('<div>').addClass('name').html(label);
    this.value = 0;
    this.allowSize=size!=undefined ;
    this.size = size

    if(this.allowSize){
        this.valueObj = $('<div>').addClass('value').html(MotherBoard.show(this.value,this.size));
    }else{
        this.valueObj = $('<div>').addClass('value').html(MotherBoard.show(this.value));
    }
};
Storage.prototype.render= function(selector){
    $(selector).append(this.labelObj);
    $(selector).append(this.valueObj);
    this.selector=selector
}
Storage.prototype.refresh = function(){
    if(this.allowSize){
        this.valueObj.html(MotherBoard.show(this.value,this.size));
    }else{
        this.valueObj.html(MotherBoard.show(this.value));
    }
}
Storage.prototype.read=function(){
    return parseInt(this.value);
}
Storage.prototype.write=function(value){
    if(this.allowsize && this.size > value){
        motherBoard.stopProcessing();
        alert("ERRO : Overflow!");
        return false;
    }else{
        if(window.maxRegisterValue<value){
            motherBoard.stopProcessing();
            alert("ERRO : Overflow!");
            return false;
        }
    }
    if(value==undefined || value==""){
        value=0;
    }
    this.value=value;
    this.refresh();
}