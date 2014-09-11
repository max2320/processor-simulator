window.Clock = function(callback){
    this.timmer;

    if(callback == undefined ){
    	callback=function(){};;	
    }

	this.callback=callback;
};
Clock.prototype.start= function(ms){
	var clock=this;
    this.timmer=setInterval(function(){
        clock.pulse();
    },ms);
}
Clock.prototype.pause = function(){
    clearInterval(this.timmer);
}
Clock.prototype.pulse=function(){
    this.callback();
}