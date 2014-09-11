/**
 * @autor Anderson Rocha
 **/
var body,timmer;

$(document).ready(function(){   
    GUIconstructor(processador);
});
/**
 *@author Anderson Rocha
 *@desc para o contador de programa
 *
 **/
function pararprocessamento(){
    clearTimeout(timmer);
    timmer=0;
}
/**
*valor 
*@param e : id element
*@return int
**/
function valor(e){
    return parseInt($('#'+e).val());
}
/**
*valor 
*@param e : id element
*@param value : valor
**/
function valor(e,value){
    $('#'+e).val(value)
}
/**
*@author Anderson Rocha
*@desc criador da interface

*
**/
var el;
var GUIel;
function GUIconstructor(processador){
    /* Memoria */
    var mem = $('<table>',{'id':'bancomemoria'});
    $('#memoria').append(mem);
    var i=0;
    while(i<parseInt(processador.memoria_suportada)){
        mem.append($('<tr><td>'+i+'</td><td id="'+i+'">000</td></tr>'));
        i++;
    }
    
    /* Registradores */
    el = processador.registradores;
    GUIel= new Array();
    for(var i=0;i<el.length;i++){
        var nome = el[i].nome;
        if(nome.indexOf('.')!=-1){
            nome=nome.split('.');
            qtd=nome[1];
            for(var qtdarray=0;qtdarray<qtd;qtdarray++){
                $('#processador').append($('<div id="'+nome[0]+"["+qtdarray+"]"+'"><p>'+nome[0]+"["+qtdarray+"]"+'</p><span class="pointer"></span><p>000</p></div>'));
            }
        }else{
            $('#processador').append($('<div id="'+nome+'"><p>'+nome+'</p><span class="pointer"></span><p>000</p></div>'));
        }
    }
    
            
    return GUIel;
}
        
        
        
jQuery.fn.sistema= {
    iniciar_processador:function(){},
    interpretar_funcao:function(processador, funcao){
        var minemonico = processador.funcoes[funcao];
        for(i=0;i<minemonico.length;i++){
            acao_atual=minemonico[i].split(" ");
                
        }
    },
    interpretar_minemonico:function(acao){
        var valor= $('#'.acao[0]).val();
            
    },
    construir_interface: function(){
        	
        var i;
        for(i=0;i<size;i++){
            $("table#memoria").append("<tr addmem='"+i+"'><td>"+i+"</td><td></td></tr>");
        }
        	
        	
    },
    construir_registradores: function(){
        	
    }
}


