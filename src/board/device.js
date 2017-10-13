import Storage from 'storage';

default export class Device{
  constructor(callback, headerSize = 255){
    this.headerSize = headerSize;
    this.callback = callback;

    this.storage = new Storage(headerSize);
  }

  write(value){
    return this.storage.write(value);
  }

  read(){
    return this.storage.read();
  }

  load(){
    if(this.callback){
      this.callback(this.storage);
    }
  }
}
