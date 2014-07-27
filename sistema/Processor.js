window.Processor = function(config,memory,device){


	this.attributes={
		description:config.description,
	};

	this.pointers=config.default;

	this.registersConf=config.registers;

	this.auxRegistersConf=config.auxRegisters;

	this.functionalUnitConf=config.functionalUnities;
	
	this.buffer=[];
	this.selector="";
};
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
Processor.prototype.getFunctionPointer=function(){
	
}
Processor.prototype.isStartFuncion=funtion(){
	if(this.startfunction==undefined || this.startfunction==true){
		return true;
	}
	return false;
}
Processor.prototype.next=function(){
	//////
	if (controle_operacao === 0) {
        if (startfunction) {
            controle_operacao = $(processador.startfunction).length - 1;
            console.log("processador.logica." + processador.startfunction[0]);
            eval("processador.logica." + processador.startfunction[0]);
            if (controle_operacao === 0) {
                startfunction = false;
            }
        } else {
            var func=processador.funcoes[valor(processador.registrador_operando)];
            if(func===undefined){
                stop_processamento();
                alert('Função "'+valor(processador.registrador_operando)+'" não suportada!');
            }else{
                controle_operacao = func.length - 1;
                console.log("processador.logica." + func[0]);
                eval("processador.logica." + func[0]);
                if (controle_operacao === 0) {
                    startfunction = true;
                }
            }
        }
    } else {
        if (startfunction) {
            var len = processador.startfunction.length;
            var posicao_atual = len - controle_operacao;
            console.log("processador.logica." + processador.startfunction[posicao_atual]);
            eval("processador.logica." + processador.startfunction[posicao_atual]);
            controle_operacao--;
            if (controle_operacao === 0) {
                startfunction = false;
            }
        } else {
            var func=processador.funcoes[valor(processador.registrador_operando)];
            if(func===undefined){
                stop_processamento();
                alert('Função "'+valor(processador.registrador_operando)+'" não suportada!');
            }else{
                var len = func.length;
                var posicao_atual = len - controle_operacao;
                console.log("processador.logica." + func[posicao_atual]);
                eval("processador.logica." + func[posicao_atual]);
                controle_operacao--;
                if (controle_operacao === 0) {
                    startfunction = true;
                }
            }
        }
    }
};