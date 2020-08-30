/**
 * @autor Anderson Rocha
 **/

var processador = {
    name: "SERGIUM",
    descricao: "Computador Didatico",
    arquitetura: "simplificada",
    memoria: {
        'name': 'mem',
        'size': 255,
        'pointer': 'em'
    },
    apontador_ees: 'ees',
    registrador_operando: 'cod',
    startfunction: [
        "MOV('epi','em')",
        "MOV('mem','dm')",
        "MOV('dm','cod')",
        "SUMEPI()",
        "MOV('epi','em')",
        "MOV('mem','dm')",
        "MOV('dm','ope')",
        "SUMEPI()"
    ],
    unidades_funcional: [
        {
            'name': 'ula',
            'name_exibicao': 'ULA',
            'style': {
                'background-image': 'url("/images/ula.png")',
                'width': '200px',
                'height': '165px',
                'top': '220px',
                'left': '235px'
            },
            'elementos': [{
                    'name': 'a',
                    'name_exibicao': 'A',
                    'size': 255,
                    'style': {
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '20px',
                        'margin-left': '20px'
                    },
                    'bus': ''
                }, {
                    'name': 'b',
                    'name_exibicao': 'B',
                    'size': 255,
                    'style': {
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '20px',
                        'margin-left': '140px'
                    },
                    'bus': ''
                }, {
                    'name': 'c',
                    'name_exibicao': 'C',
                    'size': 255,
                    'arr': 0,
                    'style': {
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '110px',
                        'margin-left': '80px'
                    },
                    'bus': 'ac'
                }, {
                    'name': 'z',
                    'name_exibicao': 'Z',
                    'size': 1,
                    'arr': 0,
                    'style': {
                        'width': '30px',
                        'height': '30px',
                        'margin-top': '80px',
                        'margin-left': '160px'
                    },
                    'bus': ''
                }, {
                    'name': 'p',
                    'name_exibicao': 'P',
                    'size': 1,
                    'arr': 0,
                    'style': {
                        'width': '30px',
                        'height': '30px',
                        'margin-top': '120px',
                        'margin-left': '160px'
                    },
                    'bus': ''
                }]
        }
    ],
    registradores_auxilixares: [
        {
            'name': 'aux',
            'name_exibicao': 'AUX',
            'size': 255,
            'pointer': 'eaux',
            'arr': 4,
            'orientation': {
                'x': 20,
                'y': 285
            },
            'bus': 'b,ac'
        }
    ],
    registradores: [
        {
            'name': 'epi',
            'name_exibicao': 'EPI',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 150,
                'y': 10
            },
            'bus': 'em'
        },
        {
            'name': 'cod',
            'name_exibicao': 'COD',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 140,
                'y': 160
            },
            'bus': ''
        },
        {
            'name': 'ope',
            'name_exibicao': 'OPE',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 220,
                'y': 80
            },
            'bus': 'dm,em,b,eaux,ac,ees,epi'
        },
        {
            'name': 'ac',
            'name_exibicao': 'AC',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 150,
                'y': 250
            },
            'bus': 'dm,aux,a,des'
        },
        {
            'name': 'eaux',
            'name_exibicao': 'EAUX',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 20,
                'y': 230
            },
            'bus': 'aux'
        },
        {
            'name': 'em',
            'name_exibicao': 'EM',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 30,
                'y': 10
            },
            'bus': 'mem'
        },
        {
            'name': 'dm',
            'name_exibicao': 'DM',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 30,
                'y': 65
            },
            'bus': 'mem,cod,ac,ope'
        },
        {
            'name': 'ees',
            'name_exibicao': 'E E/S',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 370,
                'y': 10
            },
            'bus': 'per'
        },
        {
            'name': 'des',
            'name_exibicao': 'D E/S',
            'size': 255,
            'arr': 0,
            'orientation': {
                'x': 370,
                'y': 65
            },
            'bus': 'per,ac'
        }
    ],
    funcoes: {
        0: [
            "MOV('ope','ees')",
            "MOV('per','des')",
            "MOV('des','ac')"
        ],
        1: [
            "MOV('ope','ees')",
            "MOV('ac','des')",
            "MOV('des','per')"
        ],
        2: [
            "MOV('ope','eaux')",
            "MOV('aux','ac')"
        ],
        3: [
            "MOV('ope','eaux')",
            "MOV('ac','aux')"
        ],
        4: [
            "MOV('ope','em')",
            "MOV('mem','dm')",
            "MOV('dm','ac')"
        ],
        5: [
            "MOV('ope','em')",
            "MOV('ac','dm')",
            "MOV('dm','mem')"
        ],
        6: [
            "MOV('ope','ac')"
        ],
        10: [
            "MOV('ac','a')",
            "MOV('ope','eaux')",
            "MOV('aux','b')",
            "SUM()",
            "MOV('c','ac')"
        ],
        11: [
            "MOV('ac','a')",
            "MOV('ope','eaux')",
            "MOV('aux','b')",
            "SUB()",
            "MOV('c','ac')"
        ],
        12: [
            "MOV('ac','a')",
            "MOV('ope','b')",
            "SUM()",
            "MOV('c','ac')"
        ],
        13: [
            "MOV('ac','a')",
            "MOV('ope','b')",
            "SUB()",
            "MOV('c','ac')"
        ],
        20: [
            "MOV('ope','epi')"
        ],
        21: [
            "GOZ()"
        ],
        22: [
            "GOP()"
        ],
        23: [
            "END()"
        ]
    },
    logica: {
        'MOV': function(de, para) {
            copiar_valor(de, para);
        },
        'SUM': function() {
            var a = parseInt(valor('a'));
            var b = parseInt(valor('b'));
            var c = a + b;
            valor('c', c);
            if (c === 0) {
                valor('z', 1);
            } else {
                valor('z', 0);
            }
            if (c > 0) {
                valor('p', 1);
            } else {
                valor('p', 0);
            }
        },
        'SUB': function() {
            var a = parseInt(valor('a'));
            var b = parseInt(valor('b'));
            var c = a - b;
            valor('c', c);
            if (c === 0) {
                valor('z', 1);
            } else {
                valor('z', 0);
            }
            if (c > 0) {
                valor('p', 1);
            } else {
                valor('p', 0);
            }
        },
        'GOZ': function() {
            var z = valor('z');
            if (z === 1) {
                var ope = valor('ope');
                valor('epi', ope);
            }
        },
        'GOP': function() {
            var p = valor('p');
            if (p === 1) {
                var ope = valor('ope');
                valor('epi', ope);
            }
        },
        'MINEPI': function() {
            var epi = valor('epi');
            epi--;
            valor('epi', epi);
        },
        'SUMEPI': function() {
            var epi = valor('epi');
            epi++;
            valor('epi', epi);
        },
        'END': function() {
            stop_processamento();
        }
    },
    montador:{
        'ENT_PORTA_AC':function(operando){
            //parse to 0
            var i=valor('em');
            valor('em',i);
            valor('mem',0);

            i++;
            valor('em',i);
            valor('mem',operando);
        },
        'SAI_AC_PORTA':function(operando){
            //parse to 1
            var i=valor('em');
            valor('em',i);
            valor('mem',1);

            i++;
            valor('em',i);
            valor('mem',operando);
        },
        'COP_AUX_AC':function(operando){
            //parse to 2
            var i=valor('em');
            valor('em',i);
            valor('mem',2);

            i++;
            valor('em',i); 
            valor('mem',operando);
        },
        'COP_AC_AUX':function(operando){
            //parse to 3
            var i=valor('em');
            valor('em',i);
            valor('mem',3);

            i++;
            valor('em',i); 
            valor('mem',operando);
        },
        'COP_MEM_AC':function(operando){
            //parse to 4
            var i=valor('em');
            valor('em',i);
            valor('mem',4);

            i++;
            valor('em',i);
            valor('mem',operando);
        },
        'COP_AC_MEM':function(operando){
            //parse to 5
            var i=valor('em');
            valor('em',i);
            valor('mem',5);

            i++;
            valor('em',i); 
            valor('mem',operando);
        },
        'COP_VAL_AC':function(){
            //parse to 6
            var i=valor('em');
            valor('em',i);
            valor('mem',6);

            i++;
            valor('em',i);
            valor('mem',0);
        },
        'NULL7':function(){},
        'NULL8':function(){},
        'NULL9':function(){},
        'SOM_AC_AUX_AC':function(){
            //parse to 10
            var i=valor('em');
            valor('em',i);
            valor('mem',10);

            i++;
            valor('em',i);
            valor('mem',0);
        },
        'SUB_AC_AUX_AC':function(){
            //parse to 11
            var i=valor('em');
            valor('em',i);
            valor('mem',0);

            i++;
            valor('em',i); 
            valor('mem',0);
        },
        'SOM_AC_VAL_AC':function(){
            //parse to 12
            var i=valor('em');
            valor('em',i);
            valor('mem',12);

            i++;
            valor('em',i);
            valor('mem',0);
        },
        'SUB_AC_VAL_AC':function(){
            //parse to 13
            var i=valor('em');
            valor('em',i);
            valor('mem',13);

            i++;
            valor('em',i);
            valor('mem',0);
        },
        'NULL14':function(){},
        'NULL15':function(){},
        'NULL16':function(){},
        'NULL17':function(){},
        'NULL18':function(){},
        'NULL19':function(){},
        'VAI':function(operando){
            //parse to 20
            var i=valor('em');
            valor('em',i);
            valor('mem',20);

            i++;
            valor('em',i);
            valor('mem',operando);
        },
        'VAI_SE_Z_1':function(operando){
            //parse to 21
            var i=valor('em');
            valor('em',i);
            valor('mem',21);

            i++;
            valor('em',i); 
            valor('mem',operando);
        },
        'VAI_SE_P_1':function(operando){
            //parse to 22
            var i=valor('em');
            valor('em',i++);
            valor('mem',22);

            i++;
            valor('em',i);
            valor('mem',operando);
        },
        'PARA':function(){
            //parse to 23
            var i=valor('em');
            valor('em',i);
            valor('mem',23);

            i++;
            valor('em',i);
            valor('mem',0);
        }
    }
};
