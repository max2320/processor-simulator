function getAssembly(){
    var keys=Object.keys(processador.montador);
    var operations = new Array();
    var params=new Array();
    var fn=undefined;
    var qtd_params=0;
    var param_null=false;
    $('[el="mem"]').find('[arr]').each(function(){
        if(fn==undefined && qtd_params==0){
            fn=keys[$(this).html()];
            qtd_params=processador.montador[fn].length;
            console.log(fn+"-"+qtd_params);
        }else{
            if(qtd_params>0){
                params.push($(this).html());
                qtd_params--;
            
                if(qtd_params==0){
                    operations.push(fn + " " + params.join(" "));
                    fn=undefined;
                    qtd_params=0;
                    params=new Array();
                }
            }else{
                operations.push(fn + " " + params.join(" "));
                fn=undefined;
                qtd_params=0;
                params=new Array();
            }
        }
    });
    return operations.join("\n");
    
}
function aplicar_assembly(assembly){
    valor('em',0);
    var stack = assembly.split("\n");
    console.log(stack);
    for(var i=0; i<stack.length; i++){
        operacao=stack[i].split(" ");
        console.log(operacao);
        var fn=processador.montador[operacao[0]];
        operacao.splice(0, 1);
        console.log(fn);
        if(operacao.length > 0){
            fn(operacao);
        }else{
            fn();
        }
        valor('em',valor('em')+1);
    }
}
function editor_assembly(){
    reset_processamento();
    var container=$('<div>');
    var textarea=$('<textarea>').addClass('box-assembly').val(getAssembly());
    container.append(textarea);
    container.dialog({
        'width':700,
        'height':500,
        'modal':true,
        'draggable':false,
        'resizable':false,
        'buttons':[
        { 
            'text':'Gravar', 
            'HTML':'Gravar',
            'click':function(){
                aplicar_assembly(textarea.val());
                container.dialog('destroy');
            }
        },
        {
            'text':'Cancelar',
            'html':'Cancelar',
            'click':function(){
                container.dialog('destroy');
            }
        }
        ]
    })
    
}

