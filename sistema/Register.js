window.Register = function(config) {
    /*
    {
        'name': 'epi',
        'showName': 'EPI',
        'orientation': {
            'x': 150,
            'y': 10
        },
        'bus': 'em'
    }
    */
    this.attributes = {
        'el': config.name,
        'l': config.css.left,
        'bus': config.bus,
    }
    this.name = config.showName
    this.css = config.css
    this.store=new Storage(this.name);
    return this;
}
Register.prototype.render= function(selector){
    this.regObj = $('<div>').attr(this.attributes).addClass('registrador draggable').css(this.css);
    this.store.render(this.regObj);
    
    this.selector = selector;
    $(selector).append(this.regObj);
}
Register.prototype.select=function(){
    $(this.regObj).highlight();
}
Register.prototype.read=function(){
    return this.store.read();
}
Register.prototype.write=function(value){
    this.store.write(value);
}