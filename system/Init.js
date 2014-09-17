var processorConfigs=[];
function addProcessor(config){
    processorConfigs.push(config);
}
var devicesAvailable=[];
function addDevice(config){
	devicesAvailable.push(config)
}

var scripts=[
	"system/MotherBoard.js",
	"system/Clock.js",
	"system/Storage.js",
	"system/Memory.js",
	"system/Register.js",
	"system/FunctionalUnit.js",
	"system/AuxRegister.js",
	"system/Processor.js",
	"system/Devices.js",
];
var motherBoard;






$(function(){
	scripts.forEach(function(src,e){
		console.log("Class::" + src);
		$('head').append($('<script>').attr('src',src));
	});
	motherBoard=new MotherBoard({
		'memorySize':100
	},processorConfigs);
	motherBoard.render();
})

addDevice({
	"pointer":"Display",
	"showName":"Display", 
	ui:function (store,selector){
		var container=$('<div>');
        var dataLine = $('<div>').css({'text-align':'center','font-size':30}).addClass('row');

		container.append(dataLine);

		var dataField = $('<div>').addClass('col-sm-10').html(store.read());
		dataLine.append(dataField);

		$(selector).append(container);

	},
	callback:function(){
		return true;
	},
});
addDevice({
	"pointer":"Teclado Numérico",
	"showName":"Teclado Numérico", 
	ui:function (store,selector){
		store.write("");
		function addNumber(n){
			var str = store.read()+""+n;
			store.write(parseInt(str));
			dataField.html(str);
		}  
		function removeNumber(){
			var str = store.read()+"";
			str = str.split("");
			str.pop();
			str=str.join("");
			store.write(str);
			dataField.html(str);
		}
		var container=$('<div>');

		var dataLine = $('<div>').css({'text-align':'center','font-size':30}).addClass('row');
		container.append(dataLine);

		var dataField = $('<div>').addClass('col-sm-10');
		var backspaceButton = $('<div>').addClass('col-sm-2');
		var backspaceButtonBtn = $('<button>').append('<<<').click(removeNumber);
		backspaceButton.append(backspaceButtonBtn);
		dataLine.append(dataField);
		dataLine.append(backspaceButton);
		var keypad = $('<div>').addClass('row');
		container.append(keypad);

		for(var i = 0 ; i < 10 ; i++){
			var btn=$('<div>').addClass('col-sm-2 col-md-2 col-lg-2').append($('<button>').attr({val:i}).html(i).click(function(){
				addNumber($(this).attr('val'));
			}));
			keypad.append(btn)
		}

		container.append(keypad);

		$(selector).append(container);
	},
	callback:function(){
		return true;
	},
})