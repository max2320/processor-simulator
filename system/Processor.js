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
}/**
* Get descriprion name
*/
Processor.prototype.getDescriptionName=function(){
    
    return this.desc.name;
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

    var processor=this;
    var regKeys=Object.keys(registers);
    
    regKeys.forEach(function(from){

        var reg = processor.findRegister(from);
        var x1=reg.css.left;
        var y1=reg.css.top;
    
        if(reg.bus != undefined){
            reg.bus.forEach(function(dest){
                if(from<dest){
                    var cod=from.split('.').join('_') + "_" + dest.split('.').join('_');
                }else{
                    var cod=dest.split('.').join('_') + "_" + from.split('.').join('_');
                }
                if(window.bus[cod] == undefined){
                    if(dest == 'mem'){
                        window.bus[cod] = new Bus(cod,x1,y1,x1-1000,y1);
                    }else{
                        if(dest=='dev'){
                            window.bus[cod] = new Bus(cod,x1,y1,x1+1000,y1);
                        }else{
                            if(dest.indexOf('.')!=-1){
                                var destSplited = dest.split('.');
                                var funcUnit = processor.findRegister(destSplited[0]);
                                var to = processor.findRegister(dest)
                                window.bus[cod] = new Bus(cod,x1,y1,to.css.left + funcUnit.css.left, to.css.top + funcUnit.css.top);
                            }else{
                                var to = processor.findRegister(dest)
                                window.bus[cod] = new Bus(cod,x1,y1,to.css.left,to.css.top);
                            }
                        }
                    }
                }
            });
        }else{
            if(reg.registers!=undefined){
                var subRegisters=Object.keys(reg.registers);
                subRegisters.forEach(function(el){
                    var subreg = processor.findRegister(from+"."+el);
                    var subx1=subreg.css.left+x1;
                    var suby1=subreg.css.top+y1;
                
                    if(subreg.bus != undefined){
                        subreg.bus.forEach(function(dest){
                            if(from<dest){
                                var cod=from.split('.').join('_') + "_" +el+ "_" + dest.split('.').join('_');
                            }else{
                                var cod=dest.split('.').join('_') + "_" +el+ "_" + from.split('.').join('_');
                            }
                            if(window.bus[cod] == undefined){
                                if(dest == 'mem'){
                                    window.bus[cod] = new Bus(cod,subx1,suby1,subx1-1000,suby1);
                                }else{
                                    if(dest=='dev'){
                                        window.bus[cod] = new Bus(cod,subx1,suby1,subx1+1000,suby1);
                                    }else{
                                        if(dest.indexOf('.')!=-1){
                                            var destSplited = dest.split('.');
                                            var funcUnit = processor.findRegister(destSplited[0]);
                                            var to = processor.findRegister(dest)
                                            window.bus[cod] = new Bus(cod,subx1,suby1,to.css.left + funcUnit.css.left, to.css.top + funcUnit.css.top);
                                        }else{
                                            var to = processor.findRegister(dest)
                                            window.bus[cod] = new Bus(cod,subx1,suby1,to.css.left,to.css.top);
                                        }
                                    }
                                }
                            }
                        });
                    }   
                })
            }
        }
    });
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
    if(this.functionsList[this.getFunctionPointer()]==undefined){
        motherBoard.stopProcessing();
        alert("ERRO : Função não encontrada!");   
    }
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
    this.busEnable('flush');
    motherBoard.stopProcessing();
}
Processor.prototype.busEnable = function(cod){
    console.log("BUS:"+cod);
    var k = Object.keys(window.bus);
    k.forEach(function(el){
        if(el == cod){
            window.bus[el].enable();
        }else{
            window.bus[el].disable();
        }
    });
    // window.bus[cod].enable();
}

/**
* copy data of register for other refister
* @param form Source register
* @param to Desitnation register 
*/
Processor.prototype.lock = function(from,to){
    if(from == 'dev' || from == 'mem'){
        if(to<from){
            var cod=to.split('.').join('_') + "_" + from.split('.').join('_');
        }else{
            var cod=from.split('.').join('_') + "_" + to.split('.').join('_');
        }
    }else{
        if(to<from){
            var cod=to.split('.').join('_') + "_" + from.split('.').join('_');
        }else{
            var cod=from.split('.').join('_') + "_" + to.split('.').join('_');
        }
    }
    this.busEnable(cod)
    

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
            if(! this.memory.selectAddress(data,false)){
                return false;
            }
            break;
        case 'dev':
            // this.device.selectAddress(regFrom.read(),false);
            break;
        default:
            var regTo = this.findRegister(to);
            if(regTo.pointer==undefined){
                regTo.select(false);
            }else{
                var regPointer=this.findRegister(regTo.pointer);
                regPointer.select(false);
                regTo.selectAddress(regPointer.read(),false);
            }
    }
}
Processor.prototype.mov = function(from,to){

    if(from == 'dev' || from == 'mem'){
        if(to<from){
            var cod=to.split('.').join('_') + "_" + from.split('.').join('_');
        }else{
            var cod=from.split('.').join('_') + "_" + to.split('.').join('_');
        }
    }else{
        if(to<from){
            var cod=to.split('.').join('_') + "_" + from.split('.').join('_');
        }else{
            var cod=from.split('.').join('_') + "_" + to.split('.').join('_');
        }
    }
    this.busEnable(cod);

    console.log(from + ">>" + to);
    var data =0;
    switch(from){
        case 'mem':
            this.memory.selectAddress(this.findRegister(this.pointers.memoryPointer).read());
            data = this.memory.read()
            break;
        case 'dev':
            if(this.device[this.findRegister(this.pointers.ioPointer).read()] == undefined){
                motherBoard.stopProcessing();
                alert("ERRO : Endereço não encontrado!");
                return false;
            }
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
            if(this.device[this.findRegister(this.pointers.ioPointer).read()] == undefined){
                motherBoard.stopProcessing();
                alert("ERRO : Endereço não encontrado!");
                return false;
            }
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
* @deprecated
*/
Processor.prototype.sumone=function(reg){
    this.inc(reg)
}

/**
* increment 1 for selected register
* @param reg Register Object()
*/
Processor.prototype.inc=function(reg){
    this.busEnable('flush');
    console.log(reg + "++");
    var reg=this.findRegister(reg);
    reg.select();
    reg.write(reg.read() + 1);
}

/**
* @deprecated
*/
Processor.prototype.subone=function(reg){
    this.dec(reg);
}

/**
* decrement 1 for selected register
* @param reg Register Object()
*/
Processor.prototype.dec=function(reg){

    this.busEnable('flush');
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