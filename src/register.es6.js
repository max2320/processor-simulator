class Register {
  constructor(config) {
    /*
    {
        'name': 'epi',
        'showName': 'EPI',
        'orientation': {
            'x': 150,
            'y': 10
        },
        'bus': 'em'
    }
    */
    this.attributes = {
        'el': config.name,
        'l': config.css.left,
    }
    this.bus = config.bus
    if(config.size!=undefined){
        this.attributes['size']=config.size
    }
    this.name = config.showName
    this.css = config.css
    this.store=new Storage(this.name,config.size);
    return this;
  }

  render(selector){
    this.regObj = $('<div>').attr(this.attributes).addClass('registrador draggable').css(this.css);
    this.store.render(this.regObj);

    this.selector = selector;
    $(selector).append(this.regObj);
  }

  select(hide){
    $(this.regObj).highlight(hide);
  }

  read(){
    return this.store.read();
  }

  write(value){
    this.store.write(value);
  }
}
