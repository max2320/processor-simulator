/**
* @param callback function to invoke all iterations
* return Clock 
*/
window.Clock = function(callback){
    this.timmer;

    if(callback == undefined ){
    	callback=function(){};;	
    }

	this.callback=callback;
    this.running=false;
};

/**
* start iteraion cicles
* @param ms duration time of iteration in ms
*/

Clock.prototype.start= function(ms){
    this.running=true;
    var clock=this;
    this.timmer=setInterval(function(){
        clock.pulse();
    },ms);
}
/**
* stop iterations cicle
*/
Clock.prototype.pause = function(){
    this.running=false;
    clearInterval(this.timmer);
}
/**
* iteration function, this invoke
*/

Clock.prototype.pulse=function(){
    this.callback();
}