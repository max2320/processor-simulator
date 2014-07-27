$(document).ready(function() {
    var started = false;
    $('[addclock]').click(function() {
        if (!started)
            $('#clock').val(parseInt($('#clock').val()) + 50);
    });
    $('[subclock]').click(function() {
        if (!started){
            if(parseInt($('#clock').val()) - 50>0){
                $('#clock').val(parseInt($('#clock').val()) - 50);
            }
        }
    });
    $('.button').each(function() {
        $(this).button({
            icons: {
                primary: "ui-icon-" + $(this).attr('icon')
            },
            text: false
        });
    });
});
var timmer;
function start_processamento() {
    $('[icon="play"]').css({'display':'none'});
    $('[icon="pause"]').css({'display':'inline'});
    if (parseInt($('[el="per"]').attr('qtd')) === 0) {
        if (!confirm("Seu programa realmente não possue perifericos?"))
            return false;
    }
    console.log("start");
    started = true;
    clock();
}
var controle_operacao = 0;
var startfunction = true;
function reset_processamento() {
    $('[icon="pause"]').css({'display':'none'});
    $('[icon="play"]').css({'display':'inline'});
    stop_processamento();
    $('[el]').each(function(){
        console.log("reset-"+$(this).attr('el'));
        $(this).gravar(0);
    });
    controle_operacao = 0;
    startfunction = true;  
    draw_barramento();
}
function stop_processamento() {
    $('[icon="pause"]').css({'display':'none'});
    $('[icon="play"]').css({'display':'inline'});
    console.log("stop");
    started = false;
    window.clearInterval(timmer);
}
function clock() {
    timmer = window.setInterval(function() {
        pulso();
    }, parseInt($('#clock').val()));
}
function pulso() {
    if (controle_operacao === 0) {
        if (startfunction) {
            controle_operacao = $(processador.startfunction).length - 1;
            console.log("processador.logica." + processador.startfunction[0]);
            eval("processador.logica." + processador.startfunction[0]);
            if (controle_operacao === 0) {
                startfunction = false;
            }
        } else {
            var func=processador.funcoes[valor(processador.registrador_operando)];
            if(func===undefined){
                stop_processamento();
                alert('Função "'+valor(processador.registrador_operando)+'" não suportada!');
            }else{
                controle_operacao = func.length - 1;
                console.log("processador.logica." + func[0]);
                eval("processador.logica." + func[0]);
                if (controle_operacao === 0) {
                    startfunction = true;
                }
            }
        }
    } else {
        if (startfunction) {
            var len = processador.startfunction.length;
            var posicao_atual = len - controle_operacao;
            console.log("processador.logica." + processador.startfunction[posicao_atual]);
            eval("processador.logica." + processador.startfunction[posicao_atual]);
            controle_operacao--;
            if (controle_operacao === 0) {
                startfunction = false;
            }
        } else {
            var func=processador.funcoes[valor(processador.registrador_operando)];
            if(func===undefined){
                stop_processamento();
                alert('Função "'+valor(processador.registrador_operando)+'" não suportada!');
            }else{
                var len = func.length;
                var posicao_atual = len - controle_operacao;
                console.log("processador.logica." + func[posicao_atual]);
                eval("processador.logica." + func[posicao_atual]);
                controle_operacao--;
                if (controle_operacao === 0) {
                    startfunction = true;
                }
            }
        }
    }
}
                    