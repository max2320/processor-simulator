window.Devices = function(config){
	this.pointerName = config.pointer;
	this.name = config.showName;
	this.functionUI = config.ui;
	this.callback = config.callback;
	this.store = new Storage();
}

Devices.prototype.render = function(selector){
	var devObj = $('<li>').addClass('device').attr({

	});

	this.nameObj = $('<div>').addClass('name').html(this.name);
	this.valueObj = $('<div>').addClass('value');
	
	devObj.append(this.nameObj);
	devObj.append(this.valueObj);

	this.store.render(this.valueObj);

	$(selector).append(devObj);

	this.devObj=devObj;
}
Devices.prototype.call = function(){
	this.modal = $('<div>').addClass('modal fade');
	this.modalDialog = $('<div>').addClass('modal-dialog modal-lg');
	this.modal.append(this.modalDialog);

	this.modalContent = $('<div>').addClass('modal-content');
	this.modalDialog.append(this.modalContent);

	this.modalHeader = $('<div>').addClass('modal-header');
	this.modalContent.append(this.modalHeader);

	this.headerLabel = $('<h4>').addClass('modal-title');
	this.modalHeader.append(this.headerLabel);

	this.modalBody = $('<div>').addClass('modal-body');
	this.modalContent.append(this.modalBody);

	this.modalFooter = $('<div>').addClass('modal-footer');
	this.modalContent.append(this.modalFooter);

 
	// 	<div class="modal fade" id="apresentacoes_sao_paulo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	// <div class="modal-dialog modal-lg">
	// <div class="modal-content">
	// <div class="modal-header">
	// <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	// <h4 class="modal-title" modaltitle>Apresentações</h4>
	// </div>
	// <div class="modal-body" modalbody>

	// </div>
	// <div class="modal-footer">
	// <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	// </div>
	// </div>
	// </div>
	// </div>
	this.functionUI();
	this.modal.modal();
}

Devices.prototype.addButton=function(name,click){
	this.modalFooter.append($('<button>').attr({
		'type':'button',
	}).addClass('btn btn-default').click(click));
}

Devices.prototype.activate=function(){
	motherBoard.stopProcessing();
	this.modal.modal();
}

Devices.prototype.read=function(){
    return this.store.read();
}
Devices.prototype.write=function(value){
    this.store.write(value);
}
