default export class Storage{
  constructor(headerSize = 255){
    this.headerSize = headerSize;
    this.value = 0;
  }

  write(value){
    this.beforeWrite(value);

    this.value = value;
    return this.read();
  }

  read(){
    return this.value;
  }

  beforeWrite(value){
    if(value > this.headerSize){
      console.error('Max Size error')
      return;
    }

    if(value < 0){
      console.error('Min Size error')
      return;
    }
  }
}
