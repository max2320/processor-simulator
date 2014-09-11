var processorConfigs=[];
function addProcessor(config){
    processorConfigs.push(config);
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