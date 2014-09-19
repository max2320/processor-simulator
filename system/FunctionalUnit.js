window.FunctionalUnit = function(config){
    this.attributes = {
        'el': config.name,
        'l': config.css.left,
        'bus': config.bus,
        'size': config.size,
    }
    this.name = config.showName
    
    this.css=config.css;

    this.registersConf=config.registers;

    this.registers={};
};

FunctionalUnit.prototype.render=function(selector){
	var regObj = $('<div>').attr(this.attributes).addClass('functional-unit draggable').css(this.css);
    
    var regContainer=$('<div>').addClass('relative');

    var registers={};

    this.registersConf.forEach(function(reg){
        registers[reg.name]=new Register(reg);
        registers[reg.name].render(regContainer);
        this[reg.name]=registers[reg.name];
    });
    
    regObj.append(regContainer);
    
    this.regObj=regObj;

    this.registers=registers;

    this.selector = selector;
    $(selector).append(this.regObj);    
};
FunctionalUnit.prototype.findRegister=function(name){
    if(name.indexOf('.')!=-1){
        var name=name.split('.');

        var reg=this.findRegister(name[0]);

        name[0]=undefined;
        return reg.findRegister(name.join(''));
    }else{
        return this.registers[name];
    }
}