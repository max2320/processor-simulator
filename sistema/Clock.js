window.Clock = function(){
    this.timmer;
};
Clock.prototype.start= function(ms){
    this.timmer=setInterval(function(){
        this.pulse();
    },ms);
}
Clock.prototype.pause = function(){
    clearInterval(this.timmer);
}
Clock.prototype.pulse=function(){
    Core.processors.forEach(function(el,e){
        el.next();
    });
}