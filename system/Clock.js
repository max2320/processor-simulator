window.Clock = function(callback){
    this.timmer;

    if(callback == undefined ){
    	callback=function(){};;	
    }

	this.callback=callback;
    this.running=false;
};
Clock.prototype.start= function(ms){
    this.running=true;
    var clock=this;
    this.timmer=setInterval(function(){
        clock.pulse();
    },ms);
}
Clock.prototype.pause = function(){
    this.running=false;
    clearInterval(this.timmer);
}
Clock.prototype.pulse=function(){
    this.callback();
}