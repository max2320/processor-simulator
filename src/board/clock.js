default export class Clock{
  constructor(calback){
    this.callback = callback;

    this.timer = undefined;
    this.cicleSize = 1000;
  }

  setCicleSize(ms){
    this.cicleSize = ms;
  }

  start(){
    this.timer = setInterval(()=>{
      this.pulse();
    }, this.cicleSize);
  }

  stop(){
    clearInterval(this.timer);
  }

  pulse(){
    if(this.callback){
      this.callback();
    }
  }
}
