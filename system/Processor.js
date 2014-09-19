window.Processor = function(config,memory,device){


	this.desc=config.description;

    this.memory = memory;
    this.device = device;
	this.pointers=config.default;

	this.registersConf=config.registers;

	this.auxRegistersConf=config.auxRegisters;

	this.functionalUnitConf=config.functionalUnities;

	this.functionsList=config.functions;

    var thisProcessor=this;

    config.logic.forEach(function(e){
        thisProcessor[e.name]=e.fn;
    });

	this.buffer=[];
	this.selector="";
    this.registers;
};
Processor.prototype.getDescription=function(){
    var container=$('<div>').addClass('alert alert-info');

    var desc=this.desc;

    var keys = Object.keys(desc);

    keys.forEach(function(el,e){
        console.log(desc[el])
        var line=$('<div>')
        var label=$('<label>').html(keys[e]+": ");
        line.append(label);
        line.append(desc[el]);
        container.append(line);
    });
    return container;
}
Processor.prototype.setSelector=function(selector){
	this.selector = selector;
};
Processor.prototype.getSelector=function(){
	return this.selector;
};
Processor.prototype.render=function(selector){
	this.setSelector(selector);
	var registers = {};
	this.registersConf.forEach(function(reg){
		registers[reg.name]=new Register(reg);
		registers[reg.name].render(selector);
	});
	
	this.auxRegistersConf.forEach(function(reg){
		registers[reg.name]=new AuxRegister(reg);
		registers[reg.name].render(selector);
	});

	this.functionalUnitConf.forEach(function(reg){
		registers[reg.name]=new FunctionalUnit(reg);
		registers[reg.name].render(selector);
		
	});
	this.registers=registers;
};
Processor.prototype.getProgramCode = function(){
	var programCodeRegister = this.registers[this.pointers.programPointer];
    programCodeRegister.select();
    return ""+programCodeRegister.read();
}

Processor.prototype.isStartFunction=function(){
	if(this.startfunction==undefined || this.startfunction==true){
		return true;
	}
	return false;
}
Processor.prototype.setFunctionPointer=function(name){
    this.functionPointer=name;
}
Processor.prototype.getFunctionPointer=function(){
    return this.functionPointer;
} 
Processor.prototype.getFunctionIntruction=function(step){
    if(this.functionsList[this.getFunctionPointer()][step]!=undefined){
        return this.functionsList[this.getFunctionPointer()][step];
    }
    return false;
}
Processor.prototype.nextStepFunction=function(){
    if(this.getFunctionPointer()==undefined){
        this.setFunctionPointer('init');
    }
    if(this.functionStep==undefined){
        this.functionStep=0;
    }else{
        this.functionStep++;
    }
    var step = this.getFunctionIntruction(this.functionStep);
    if(step){
        return step; 
    }else{
        this.functionStep=undefined;
        if(this.getFunctionPointer()=='init'){
            this.setFunctionPointer(this.getProgramCode());
            this.startfunction=false;
        }else{
            this.setFunctionPointer('init');
            this.startfunction=true;
        }
        return this.nextStepFunction();
    }
}
Processor.prototype.findRegister=function(name){
    if(name.indexOf('.')!=-1){
        var name=name.split('.');

        var reg=this.findRegister(name[0]);

        name[0]=undefined;
        return reg.findRegister(name.join(''));
    }else{
        return this.registers[name];
    }
}
Processor.prototype.end=function(){
    motherBoard.stopProcessing();
}
Processor.prototype.mov=function(from,to){
    console.log(from + ">>" + to);
    var data =0;
    switch(from){
        case 'mem':
            this.memory.selectAddress(this.findRegister(this.pointers.memoryPointer).read(),false);
            data = this.memory.read()
            break;
        case 'dev':
            var dev=this.device[this.findRegister(this.pointers.ioPointer).read()];
            var reg=this.findRegister(to);
            reg.select(false);
            
            dev.activate(function(value){
                reg.write(value);
                return true;
            });
            break;
        default:
            var regFrom=this.findRegister(from);
            if(regFrom.pointer==undefined){
                regFrom.select();
            }else{
                var regPointer=this.findRegister(regFrom.pointer);
                regPointer.select();
                regFrom.selectAddress(regPointer.read(),false);
            }
            data = regFrom.read();
            break;
    }
    switch(to){
        case 'mem':
            this.memory.selectAddress(this.findRegister(this.pointers.memoryPointer).read(),false);
            this.memory.write(data);
            break;
        case 'dev':
            var dev=this.device[this.findRegister(this.pointers.ioPointer).read()];
            dev.write(data);
            
            dev.activate(function(value){
                return true;
            });
            break;
        default:
            var regTo=this.findRegister(to);
            if(regTo.pointer==undefined){
                regTo.select(false);
            }else{
                var regPointer=this.findRegister(regTo.pointer);
                regPointer.select(false);
                regTo.selectAddress(regPointer.read(),false);
            }
            regTo.write(data);
            break;
    }
}

Processor.prototype.sumone=function(reg){
    console.log(reg + "++");
    var reg=this.findRegister(reg);
    reg.select();
    reg.write(reg.read() + 1);
}

Processor.prototype.subone=function(reg){
    console.log(reg + "--");
    var reg=this.findRegister(reg);
    reg.select();
    reg.write(reg.read() - 1);
}

Processor.prototype.next=function(){
    var action=this.nextStepFunction().split(' ');
   
    switch(action.length){
        case 1:
            this[action[0]]();
        case 2:
            this[action[0]](action[1]);
            break;
        case 3:
            this[action[0]](action[1],action[2]);
            break;
    }
};