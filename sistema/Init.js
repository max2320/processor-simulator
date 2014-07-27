var processorConfigs=[];
function addProcessor(config){
    processorConfigs.push(config);
}
var scripts=[
	"sistema/MotherBoard.js",
	"sistema/Clock.js",
	"sistema/Storage.js",
	"sistema/Memory.js",
	"sistema/Register.js",
	"sistema/FunctionalUnit.js",
	"sistema/AuxRegister.js",
	"sistema/Processor.js",
];
$(function(){
	scripts.forEach(function(src,e){
		console.log("Class::" + src);
		$('head').append($('<script>').attr('src',src));
	});
	window.motherBoard=new MotherBoard({
		'memorySize':100
	},processorConfigs);
	
})