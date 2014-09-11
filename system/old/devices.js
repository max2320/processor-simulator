$('#ADD_periferico').click(function(){
    var tipo = $('#tipo_periferico').val();
    new_periferico(tipo);
});
var perifericos_name={
    'display':"Display",
    'numberkeypad':"Tecl. num."
};

function new_periferico(tipo){
    var atu=parseInt($('[el="per"]').attr('qtd'));
    if(atu<10){
        var li= $('<li>');
        var span_title=$('<span>').addClass('title').html(atu+':'+perifericos_name[tipo]);
        li.append(span_title);
        var span_value=$('<span>').addClass('value').attr({'arr':atu,'tipo':tipo}).html(0);
        li.append(span_value);
        var btn_remove = $('<a>').addClass('btn_devices').attr('icon','minus').click(function(){
            li.remove();
            renumerate_perifericos();
        });
        li.append(btn_remove);
        $('[el="per"]').append(li);
        $('[el="per"]').attr('qtd',++atu);
    }
    $('.btn_devices').each(function() {
        $(this).button({
            icons: {
                primary: "ui-icon-" + $(this).attr('icon')
            },
            text: false
        });
    });
    $('[el="per"]').sortable({
        'stop': function( event, ui ) {
            renumerate_perifericos();
        }
    });
}
function renumerate_perifericos(){
    $('[el="per"]').attr('qtd',0);
    $('[el="per"]').find('li').each(function(){
        var atu=parseInt($('[el="per"]').attr('qtd'));
        var title=$(this).find('.title');
        var value=$(this).find('.value');
        title.html(title.html().replace(value.attr('arr'),atu));
        value.attr('arr',atu);
        $('[el="per"]').attr('qtd',++atu);
    })
}
$.fn.display=function(){
    stop_processamento();
    var value = $(this).html();
    
    var box= $('<div>').addClass('device_display');
    var value_el= $('<span>').addClass('text').html(value);
    box.append(value_el);
    
    box.simple_dialog(500,200,'start_processamento');
};
$.fn.numberkeypad=function(para){
    stop_processamento();
    var obj=$(this);
    $(this).html(0);
    
    var box=$('<div>');
    
    var input = $('<input>').attr({
        'disabled':true,
        'type':'text'
    }).css({
        'width':110
    });
    box.append(input);
    
    var keypad=$('<div>').addClass('keypad');
    for(var i=0;i<10;i++){
        var btn = $('<button>').html(i).click(function(){
            input.val(input.val()+""+$(this).html()); 
        });
        keypad.append(btn);
    }
    box.append(keypad);
        
    var button = $('<button>').html('Confirmar').click(function(){
        obj.html(input.val());
        $('[el="'+para+'"]').gravar(input.val());
        $('.btn_close_dialog').click();
        start_processamento();
    });
    box.append(button);
    
    box.simple_dialog(126,170);
};



                                