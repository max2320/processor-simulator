/**
* @param config {description:<>,defautl:<>, register:<>, auxRegister:<>, functionalUnities:<>, functions:<>, logic:<>}
* @param memory Memory() 
* @param device Device Array()
* return Precessor 
*/

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
/**
* Generate processor description HTML format
*/
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
/**
* Set DOMElemnt or CSSSeletor for render structure
* @param selector DOMElement or CSSSelector
*/
Processor.prototype.setSelector=function(selector){
    this.selector = selector;
};

/**
* Return DOMElement or CSSSelector
*/
Processor.prototype.getSelector=function(){
	return this.selector;
};
/**
* render all structures on selected container
* @param selector DOMElement or CSSSelector (optional) 
*/
Processor.prototype.render=function(selector){
    
    if(selector==undefined){
	   this.setSelector(selector); 
    }

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
/**
* return value of program code register(settings on processor cfg)
*/
Processor.prototype.getProgramCode = function(){
	var programCodeRegister = this.registers[this.pointers.programPointer];
    programCodeRegister.select();
    return ""+programCodeRegister.read();
}
/**
* return progress pointer of the processor excution cicle 
*/
Processor.prototype.isStartFunction=function(){
	if(this.startfunction==undefined || this.startfunction==true){
		return true;
	}
	return false;
}
/**
* set function pointer for execution 
* @param name Processor function code
*/
Processor.prototype.setFunctionPointer=function(name){
    this.functionPointer=name;
}
/**
* get function pointer for execution 
*/
Processor.prototype.getFunctionPointer=function(){
    return this.functionPointer;
} 
/**
* get function for step process
* @param step index of process step 
*/
Processor.prototype.getFunctionInstruction=function(step){
    if(this.functionsList[this.getFunctionPointer()][step]!=undefined){
        return this.functionsList[this.getFunctionPointer()][step];
    }
    return false;
}
/**
* return function for next step process 
*/
Processor.prototype.nextStepFunction=function(){
    if(this.getFunctionPointer()==undefined){
        this.setFunctionPointer('init');
    }
    if(this.functionStep==undefined){
        this.functionStep=0;
    }else{
        this.functionStep++;
    }
    var step = this.getFunctionInstruction(this.functionStep);
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
/**
* return register objec by name
* @param name Register name
*/
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
/**
* stop the proessor process 
*/
Processor.prototype.end=function(){
    motherBoard.stopProcessing();
}
/**
* copy data of register for other refister
* @param form Source register
* @param to Desitnation register 
*/
Processor.prototype.lock = function(from,to){
    console.log("LK::"+from + ">>" + to);
    var data = 0;
    switch(from){
        case 'mem':
            break;
        case 'dev':
            break;
        default:
            var regFrom=this.findRegister(from);
            regFrom.select();
            data = regFrom.read();  
    }
    switch(to){
        case 'mem':
            this.memory.selectAddress(data,false);
            break;
        case 'dev':
            // this.device.selectAddress(regFrom.read(),false);
            break;
        default:
            var regTo = this.findRegister(to);
            regTo.select();
    }
}
Processor.prototype.mov = function(from,to){
    console.log(from + ">>" + to);
    var data =0;
    switch(from){
        case 'mem':
            this.memory.selectAddress(this.findRegister(this.pointers.memoryPointer).read());
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

/**
* decrement +1 for selected register
* @param reg Register Object()
*/
Processor.prototype.sumone=function(reg){
    console.log(reg + "++");
    var reg=this.findRegister(reg);
    reg.select();
    reg.write(reg.read() + 1);
}

/**
* increment +1 for selected register
* @param reg Register Object()
*/
Processor.prototype.subone=function(reg){
    console.log(reg + "--");
    var reg=this.findRegister(reg);
    reg.select();
    reg.write(reg.read() - 1);
}
/**
* invoke next function on pipeline
*/
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