/**
*
*/
window.Storage = function(label){
    this.label = label;
    this.labelObj = $('<div>').addClass('name').html(label);
    this.value = 0;
    this.valueObj = $('<div>').addClass('value').html(MotherBoard.show(this.value));

};
Storage.prototype.render= function(selector){
    $(selector).append(this.labelObj);
    $(selector).append(this.valueObj);
    this.selector=selector
}
Storage.prototype.refresh = function(){
    this.valueObj.html(MotherBoard.show(this.value));
}
Storage.prototype.read=function(){
    return this.value;
}
Storage.prototype.write=function(value){
    this.value=value;
    this.refresh();
}