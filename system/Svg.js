
window.Svg=function(){
  this.container = $('#bus_draw');
  this.busList = {};
};

Svg.prototype.addBus=function(id,posReg1,posReg2){
  this.busList[id]=this.makeLine
};

Svg.prototype.makeLine=function(id,x1,y1,x2,y2){
  var line=$('<line>').attr({
    'id':id,
    'x1':x1,
    'y1':y1,
    'x2':x2,
    'y2':y2,
    'stroke':"#FFE736",
    'stroke-width':"5"
  });
  this.container.append(line);
  return line;
};

