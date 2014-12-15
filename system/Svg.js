
window.Svg=function(id,x1,y1,x2,y2){
  var corretor=20;
  this.container = $('#bus_draw');
    this.id=id;
  var line=$('<line>').attr({
    'id':id,
    'x1':x1+corretor,
    'y1':y1+corretor,
    'x2':x2+corretor,
    'y2':y2+corretor,
  }).css({
    'stroke':"#FFE736",
    'stroke-width':"5"
  });
  this.container.append(line);
  this.line = line;
  this.enabled = false;
  this.refresh();
};
Svg.prototype.enable=function(){
  this.enabled = true;
  $('#bus_draw line').css('stroke','#FFE736')
  $('#bus_draw line#'+this.id).css('stroke','#1BFF26');
  this.refresh();
}
Svg.prototype.disable=function(){
  this.enabled = false;
  $('#bus_draw line').css('stroke','#FFE736')
  this.refresh();
}
Svg.prototype.refresh=function(){
  this.container.html(this.container.html())
}
