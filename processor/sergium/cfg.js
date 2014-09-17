/**
 * @autor Anderson Rocha
 **/

addProcessor(
    {
        description:{
            name: "SERGIUM",
            descricao: "Computador Didatico",
            arquitetura: "simplificada",
        },
        default:{
            //Pointers of Memory
            memoryPointer:'em',
            memorydata:'dm',
            //Pointers of I/O
            ioPointer:'ees',
            ioData:'des',
            //pointer
            programPointer:'cod'
        },
        memory: {
            'size': 255,
        },
        functionalUnities: [{
                'name': 'ula',
                'showName': 'ULA',
                'css': {
                    'background-image': 'url("images/ula.png")',
                    'width': '200px',
                    'height': '165px',
                    'top': '220px',
                    'left': '235px'
                },
                'registers': [{
                        'name': 'a',
                        'showName': 'A',
                        'css': {
                            'width': '40px',
                            'height': '40px',
                            'top': '20px',
                            'left': '20px'
                        },
                        'bus': ''
                    }, {
                        'name': 'b',
                        'showName': 'B',
                        'css': {
                            'width': '40px',
                            'height': '40px',
                            'top': '20px',
                            'left': '140px'
                        },
                        'bus': ''
                    }, {
                        'name': 'c',
                        'showName': 'C',
                        'css': {
                            'width': '40px',
                            'height': '40px',
                            'top': '110px',
                            'left': '80px'
                        },
                        'bus': 'ac'
                    }, {
                        'name': 'z',
                        'showName': 'Z',
                        'css': {
                            'width': '30px',
                            'height': '30px',
                            'top': '80px',
                            'left': '160px'
                        },
                        'bus': ''
                    }, {
                        'name': 'p',
                        'showName': 'P',
                        'css': {
                            'width': '30px',
                            'height': '30px',
                            'top': '120px',
                            'left': '160px'
                        },
                        'bus': ''
                    }]
            }
        ],
        auxRegisters: [{
                'name': 'aux',
                'showName': 'AUX',
                'size': 4,
                'pointer': 'eaux',
                'css': {
                    'left': 20,
                    'top': 285
                },
                'bus': 'b,ac'
        }],
        registers: [{
            'name': 'epi',
            'showName': 'EPI',
            'css': {
                'left': 150,
                'top': 10
            },
            'bus': 'em'
        }, {
            'name': 'cod',
            'showName': 'COD',
            'size': 255,
            'arr': 0,
            'css': {
                'left': 140,
                'top': 160
                },
                'bus': ''
        },{
            'name': 'ope',
            'showName': 'OPE',
            'css': {
                'left': 220,
                'top': 80
            },
            'bus': 'dm,em,b,eaux,ac,ees,epi'
        },{
            'name': 'ac',
            'showName': 'AC',
            'css': {
                'left': 150,
                'top': 250
            },
            'bus': 'dm,aux,a,des'
        },{
            'name': 'eaux',
            'showName': 'EAUX',
            'css': {
                'left': 20,
                'top': 230
            },
            'bus': 'aux'
        },{
            'name': 'em',
            'showName': 'EM',
            'css': {
                'left': 30,
                'top': 10
            },
            'bus': 'mem'
        },{
            'name': 'dm',
            'showName': 'DM',
            'css': {
                'left': 30,
                'top': 65
            },
            'bus': 'mem,cod,ac,ope'
        },{
            'name': 'ees',
            'showName': 'E E/S',
            'css': {
                'left': 370,
                'top': 10
            },
            'bus': 'per'
        },{
            'name': 'des',
            'showName': 'D E/S',
            'css': {
                'left': 370,
                'top': 65
            },
            'bus': 'per,ac'
        }],
        functions: {
            init: [
                "mov epi em",
                "mov mem dm",
                "mov dm cod",
                "sumone epi ",
                "mov epi em",
                "mov mem dm",
                "mov dm ope",
                "sumone epi "
            ],
            0: [
                "mov ope ees",
                "mov per des",
                "mov des ac"
            ],
            1: [
                "mov ope ees",
                "mov ac des",
                "mov des per"
            ],
            2: [
                "mov ope eaux",
                "mov aux ac"
            ],
            3: [
                "mov ope eaux",
                "mov ac aux"
            ],
            4: [
                "mov ope em",
                "mov mem dm",
                "mov dm ac"
            ],
            5: [
                "mov ope em",
                "mov ac dm",
                "mov dm mem"
            ],
            6: [
                "mov ope ac"
            ],
            10: [
                "mov ac a",
                "mov ope eaux",
                "mov aux b",
                "SUM",
                "mov c ac"
            ],
            11: [
                "mov ac a",
                "mov ope eaux",
                "mov aux b",
                "SUB",
                "mov c ac"
            ],
            12: [
                "mov ac a",
                "mov ope b",
                "SUM",
                "mov c ac"
            ],
            13: [
                "mov ac a",
                "mov ope b",
                "SUB",
                "mov c ac"
            ],
            20: [
                "mov ope epi"
            ],
            21: [
                "GOZ"
            ],
            22: [
                "GOP"
            ],
            23: [
                "END"
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
    }
);