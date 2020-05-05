function design_mode() {
  $('.draggable').draggable({
    containment: "#processador",
    scroll: false,
    grid: [20, 20],
  });
}

function design_mode_end() {
  let positions = {};
  $('.draggable').each(function() {
    var offset = $(this).position();
    positions[$(this).attr('el')] = {
      left: Math.ceil(offset.left),
      top: Math.ceil(offset.top)
    };
    $(this).draggable("destroy").attr('l', (Math.ceil(offset.left)));
  });

  $(window).resize();

  console.log(positions);
  alert(JSON.stringify(positions));
}
