function copiar_valor(de, para) {
    var de_value = valor(de);
    valor(para, de_value);
    if (de === 'mem' || para === 'mem') {
        ativar_barramento(processador.memoria.apontador_endereco, 'mem', true);
        ativar_barramento(de, para, false);
    } else {
        if (de === 'per' || para === 'per') {
            stop_processamento();
            var pointer = $('[el="per"]').attr('pointer');
            var indicador = $('[el="' + pointer + '"]').ler();
            var tipo = $('[el="per"]').find('[arr="' + indicador + '"]').attr('tipo');
            if (tipo === undefined) {
                alert('Periférico não adicionado!');
            } else {
                console.log("$('[el=\"per\"]').find('[arr=\"'" + indicador + "'\"]')." + tipo + "('" + para + "');");
                eval("$('[el=\"per\"]').find('[arr=\"" + indicador + "\"]')." + tipo + "('" + para + "');");
                ativar_barramento('ees', 'per', true);
                ativar_barramento(de, para, false);
            }
        } else {
            ativar_barramento(de, para);
        }
    }
}
function valor(el, value) {
    if (value === undefined) {
        return parseInt($('[el="' + el + '"]').ler());
    } else {
        $('[el="' + el + '"]').gravar(value);
    }
}
function design_mode() {
    $('.draggable').draggable({
        containment: "#processador",
        scroll: false,
        grid: [20, 20],
    }).mouseup(function() {
        draw_barramento();
    });
}
function design_mode_end() {
    var positions = "";
    $('.draggable').each(function() {
        positions += $(this).attr('el') + ":\r\n";
        var offset = $(this).position();
        positions += "{\r\nleft:" + (Math.ceil(offset.left)) + "px;\r\ntop:" + offset.top + "px;\r\n}\r\n";
        $(this).draggable("destroy").attr('l', (Math.ceil(offset.left)));
    });
    $(window).resize();
    alert(positions);
}
function barramento_position(start, end) {
    var startobj = {};
    if (start === "per") {
        startobj = $('#aux_periferico_area');
    } else {
        if (start === "mem") {
            startobj = $('#aux_memoria_area');
        } else {
            startobj = $('[el="' + start + '"]');
        }
    }
    var endobj = {};
    if (end === "per") {
        endobj = $('#aux_periferico_area');
    } else {
        if (end === "mem") {
            endobj = $('#aux_memoria_area');
        } else {
            endobj = $('[el="' + end + '"]');
        }
    }
    var cpu = $('#processador').offset();
    return {
        'start': {
            'x': $(startobj).offset().left + ($(startobj).width() / 2) - cpu.left,
            'y': $(startobj).offset().top + ($(startobj).height() / 2) - cpu.top
        },
        'end': {
            'x': $(endobj).offset().left + ($(endobj).width() / 2) - cpu.left,
            'y': $(endobj).offset().top + ($(endobj).height() / 2) - cpu.top
        }
    };
}
var u;
function draw_barramento() {
    $('#fullcanvas').clearCanvas();
    $('[el]').each(function() {
        var id = $(this).attr('el');
        if ($(this).attr('barramento') !== "") {
            var barramento = $(this).attr('barramento').split(',');
            for (var i = 0; i < barramento.length; i++) {
                if (barramento[i].trim() !== "") {
                    //console.log(id + "_" + barramento[i]);
                    var positions = barramento_position(id, barramento[i]);
                    //var obj=$('<canvas></canvas>').addClass('linecanvas').attr({'id':id_barramento}).css(positions.position);

                    var canvas_line = positions;
                    $('#fullcanvas').drawLine({
                        strokeStyle: "#FFFC61",
                        strokeWidth: 3,
                        x1: canvas_line.start.x,
                        y1: canvas_line.start.y,
                        x2: canvas_line.end.x,
                        y2: canvas_line.end.y
                    });

                }
            }
        }
    });
}
function ativar_barramento(start, end, flush) {
    if (flush === undefined || flush) {
        draw_barramento();
    }
    var canvas_line = barramento_position(start, end);
    $('#fullcanvas').drawLine({
        strokeStyle: "#00AB22",
        strokeWidth: 3,
        x1: canvas_line.start.x,
        y1: canvas_line.start.y,
        x2: canvas_line.end.x,
        y2: canvas_line.end.y
    });
}
(function($) {
    $.fn.hightlight = function(remove) {
        if(remove==undefined){
            remove=true
        }
        if(remove){
            $('.hightlight').removeClass('hightlight');
        }
        $(this).addClass('hightlight');
        $(this)[0].scrollIntoView(false);
    }
    $.fn.simple_dialog = function(w, h, onClose) {

    };
    $.fn.registrador = function(reg) {
                var memoria = reg.size;
                var val = "0";
                var el_reg = $('<div></div>').attr({
                    'el': reg.nome,
                    'pointer': '',
                    l: reg.orientacao.x,
                    'barramento': reg.barramento
                }).addClass('registrador draggable').css({
                    'top': reg.orientacao.y,
                    'left': reg.orientacao.x
                });
                el_reg.append($('<div></div').addClass('nome').html(reg.nome_exibicao));
                el_reg.append($('<div></div>').addClass('valor').html(val));
                $(this).append(el_reg);
            };
    $.fn.gravar = function(value) {
        var pointer = $(this).attr('pointer');
        if (pointer !== '') {
            var indicador = $('[el="' + pointer + '"]').ler();
            $(this).find('[arr="' + indicador + '"]').hightlight(eval($('#clock').val()));
            $(this).find('[arr="' + indicador + '"]').html(value);
        } else {
            $(this).find('.valor').html(value);
        }
    };
    $.fn.ler = function() {
        var pointer = $(this).attr('pointer');
        if (pointer !== '') {
            var indicador = $('[el="' + pointer + '"]').ler();
            $(this).find('[arr="' + indicador + '"]').hightlight(eval($('#clock').val()));
            return $(this).find('[arr="' + indicador + '"]').html();
        } else {
            return $(this).find('.valor').html();
        }
    };
    $.fn.auxiliares = function(reg) {

        var memoria = reg.size;
        var val = "0";
        var el_reg = $('<div></div>').attr({
            'el': reg.nome,
            'pointer': reg.apontador_endereco,
            l: reg.orientacao.x,
            'barramento': reg.barramento
        }).addClass('registrador_auxiliar draggable').css({
            'top': reg.orientacao.y,
            'left': reg.orientacao.x
        });
        var reg_tbl = $('<table></table>').attr({
            'border': '0',
            'cellspacing': '0',
            'cellpadding': '0'
        });
        reg_tbl.append("<tr><td colspan='2'>" + reg.nome_exibicao + "</td></tr>");
        reg_tbl.append("<tr class='address'><td>ADD</td><td>VAL</td></tr>");

        for (var i = 0; i < reg.arr; i++) {
            reg_tbl.append("<tr><td>" + i + "</td><td arr='" + i + "'>" + val + "</td></tr");
        }
        el_reg.append(reg_tbl);
        $(this).append(el_reg);
    };
    $.fn.unidade_funcional = function(unidade) {
        var unidadeObj = $('<div></div>').attr({
            'el': unidade.nome,
            'pointer': '',
            l: unidade.style.left,
            'barramento': ''
        }).addClass('unidade_funcional draggable').css(unidade.style);
        var regs = unidade.elementos;
        for (var i = 0; i < regs.length; i++) {
            var memoria = regs[i].size;
            var val = "0";
            var min_reg = $('<div></div>')
                    .attr({
                        'el': regs[i].nome,
                        'pointer': '',
                        'barramento': regs[i].barramento
                    })
                    .addClass('registrador')
                    .css(regs[i].style);

            min_reg.append($('<div></div').addClass('nome').html(regs[i].nome_exibicao));
            min_reg.append($('<div></div>').addClass('valor').html(val));

            unidadeObj.append(min_reg);
        }
        $(this).append(unidadeObj);
    };
    $(window).resize(function() {
        var left = Math.ceil($('#processador').offset().left);
    });
})(jQuery);
var col = "";
$(document).ready(function() {
    $('#memoria').memoria(processador);
    var registradores = processador.registradores;
    for (var i = 0; i < registradores.length; i++) {
        $('#processador').registrador(registradores[i]);
    }
    var registradoresaux = processador.registradores_auxilixares;
    for (var i = 0; i < registradoresaux.length; i++) {
        $('#processador').auxiliares(registradoresaux[i]);
    }
    var unidades_funcionais = processador.unidades_funcional;
    for (var i = 0; i < unidades_funcionais.length; i++) {
        $('#processador').unidade_funcional(unidades_funcionais[i]);
    }
    $('[el="per"]').attr('pointer', processador.apontador_ees);
    draw_barramento();
    $(window).resize();
    $('.box_scrollbar').nanoScroller();
    $('[procinfo]').each(function() {
        $(this).append(eval("processador." + $(this).attr('procinfo')));
    });
});






////////////// MEMORY //////////////

////////////// END MEMORY //////////////





