window.svgContainer = SVG($('#bus_draw').get(0))

window.Bus = function(id,x1,y1,x2,y2){
  var corretor=20;

  this.id = id;
  var ids = id.split('_')
  
  this.from = ids[0];
  this.to = ids[1];
  this.line = svgContainer.line(x1 + corretor, y1 + corretor, x2 + corretor, y2 + corretor).stroke({ 
    color : "#FFE736",
    width : 5 
  });
  this.lineT = svgContainer.line(x1 + corretor, y1 + corretor - 3, x2 + corretor, y2 + corretor - 3).stroke({ 
    color : "#FFE736",
    width : 2,
    opacity : 0
  });
  this.lineB = svgContainer.line(x1 + corretor, y1 + corretor + 3, x2 + corretor, y2 + corretor + 3).stroke({ 
    color : "#FFE736",
    width : 2,
    opacity : 0 
  });
}

Bus.prototype.enable = function(){
  console.log('BUSON:' + this.id)
  this.line.stroke('#1BFF26');
  this.lineT.stroke({opacity : 1});
  this.lineB.stroke({opacity : 1});
}

Bus.prototype.disable = function(){
  console.log('BUSOFF:' + this.id)
  this.line.stroke('#FFE736');
  this.lineT.stroke({opacity : 0});
  this.lineB.stroke({opacity : 0});
}
