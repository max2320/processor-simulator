var processorConfigs=[];
function addProcessor(config){
    processorConfigs.push(config);
}
var devicesAvailable=[];
var devicesIndex=0
function addDevice(config){
	config.showName = devicesIndex + " : " + config.showName
	devicesAvailable.push(config)
	devicesIndex++;
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
	"system/Svg.js",
];
var motherBoard;






$(function(){
	scripts.forEach(function(src,e){
		console.log("Class::" + src);
		$('head').append($('<script>').attr('src',src));
	});
	motherBoard=new MotherBoard({
		'memorySize':100
	},processorConfigs,devicesAvailable);
	motherBoard.render();
})

addDevice({
	"pointer":"Teclado Numérico",
	"showName":"Teclado Numérico",  
	"dialogSize":"sm",
	ui:function (store,selector){
		store.write("");
		function addNumber(n){
			var str = store.read()+""+n;
			
			if(parseInt(str)>255){
				str="255";
			}

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

		var dataLine = $('<div>').css({
			'text-align': 'center',
			'font-size': 30,
			'border': '1px solid #6f6f6f',
			'border-radius': 5
		}).addClass('row');
		container.append(dataLine);

		var dataField = $('<div>').addClass('col-sm-9');
		var backspaceButton = $('<div>').addClass('col-sm-2');
		var backspaceButtonBtn = $('<button>').append('<<<').click(removeNumber);
		backspaceButton.append(backspaceButtonBtn);
		dataLine.append(dataField);
		dataLine.append(backspaceButton);
		var keypad = $('<div>').addClass('row').css({'text-align':'center'});
		container.append(keypad);

		for(var i = 0 ; i < 10 ; i++){
			var btn=$('<button>').attr({val:i}).html(i).click(function(){
				addNumber($(this).attr('val'));
			})
			keypad.append(btn);
			if((i + 1) % 4 == 0 && i != 0){
				keypad.append('<br clear="both">');
			} 
		}

		container.append(keypad);

		$(selector).append(container);
	},
	callback:function(){
		return true;
	},
});
addDevice({
	"pointer":"Display",
	"showName":"Display", 
	"dialogSize":"lg",
	ui:function (store,selector){
		var container=$('<div>');
        var dataLine = $('<div>').css({'text-align':'center','font-size':30}).addClass('row');

		container.append(dataLine);

		var dataField = $('<div>').addClass('col-sm-10').html(MotherBoard.show(store.read()));
		dataLine.append(dataField);

		$(selector).append(container);

	},
	callback:function(){
		return true;
	},
});
addDevice({
	"pointer":"Impressora",
	"showName":"Impressora", 
	"dialogSize":"lg",
	ui:function (store,selector){
		var container=$('<div>');
        var dataLine = $('<div>').css({'text-align':'center','font-size':30}).addClass('row');

		container.append(dataLine);

		var dataField = $('<div>').addClass('col-sm-10').html(MotherBoard.show(store.read()));
		dataLine.append(dataField);

		$(selector).append(container);

	},
	callback:function(){
		return true;
	},
});