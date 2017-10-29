window.svgContainer = SVG($('#bus_draw').get(0))


window.bus_cat={}

window.Bus = function(id,x1,y1,x2,y2){
  this.id = id;
  var ids = id.split('_')


  this.from = ids[0];
  this.to = ids[1];

  var corretorXOrigin = 20;
  var corretorYOrigin = 20;
  var corretorXDest = 20;
  var corretorYDest = 20;

  var xOrigin = x1
  var xDest = x2

  if(xOrigin < xDest){
    corretorXOrigin = 30
    corretorXDest = 10
  }

  if(xOrigin > xDest){
    corretorXOrigin = 10
    corretorXDest = 30
  }

  var yOrigin = y1
  var yDest = y2

  if(yOrigin < yDest){
    corretorYOrigin = 30
    corretorYDest = 10
  }

  if(yOrigin > yDest){
    corretorYOrigin = 10
    corretorYDest = 30
  }

  xOrigin = x1 + corretorXOrigin
  xDest = x2 + corretorXDest

  yOrigin = y1 + corretorYOrigin
  yDest = y2 + corretorYDest

  console.log(this.from, this.to, corretorXOrigin, corretorXDest, corretorYOrigin, corretorYDest)

  var minX = x1;
  var xOperator = +1;
  if(minX > x2){
    xOperator = -1;
    minX = x2;
  }

  var minY = y1;
  var yOperator = +1;
  if(minY > y2){
    yOperator = -1;

    minY = y2;
  }

  var xDiff = Math.abs((x1 - x2)/2);
  var xMiddle = minX + xDiff;

  var yDiff = Math.abs((y1 - y2)/2);
  var yMiddle = minY + yDiff;

  var target = svgContainer.group(xOrigin, yOrigin,xDest, yDest);
  target.node.setAttribute('name', this.id);


  if(xDiff < yDiff){
    this.originLine= new BusLine(target, xOrigin, yOrigin, xOrigin, yMiddle);
    this.middleLine= new BusLine(target, xOrigin, yMiddle, xDest, yMiddle);
    this.destinationLine= new BusLine(target, xDest, yMiddle, xDest, yDest);
  }else{
    this.originLine= new BusLine(target, xOrigin,yOrigin, xMiddle, yOrigin);
    this.middleLine= new BusLine(target, xMiddle, yOrigin, xMiddle, yDest);
    this.destinationLine= new BusLine(target, xMiddle, yDest, xDest, yDest);
  }
}

Bus.prototype.enable = function(){
  console.log('BUSON:' + this.id)
  this.originLine.enable();
  this.middleLine.enable();
  this.destinationLine.enable();
}

Bus.prototype.disable = function(){
  console.log('BUSOFF:' + this.id)
  this.originLine.disable();
  this.middleLine.disable();
  this.destinationLine.disable();
}

var BusLine = function(target, x1,y1,x2,y2){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;

  this.line = target.line(x1, y1, x2, y2).stroke({
    color : "#EBF591",
    width : 3,
  });

  this.lineT;

};

BusLine.prototype.enable = function(){
  this.lineT = svgContainer.line(this.x1, this.y1, this.x2, this.y2).stroke({
    color : "#1BFF26",
    width : 3,
  });
}

BusLine.prototype.disable = function(){
  if(this.lineT){
    this.lineT.remove()
  }
}
