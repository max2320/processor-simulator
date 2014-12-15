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
                    'width': 200,
                    'height': 165,
                    'top': 220,
                    'left': 235
                },
                'registers': [{
                        'name': 'a',
                        'showName': 'A',
                        'css': {
                            'width': 40,
                            'height': 40,
                            'top': 20,
                            'left': 20
                        },
                        'bus': []
                    }, {
                        'name': 'b',
                        'showName': 'B',
                        'css': {
                            'width': 40,
                            'height': 40,
                            'top': 20,
                            'left': 140
                        },
                        'bus': []
                    }, {
                        'name': 'c',
                        'showName': 'C',
                        'css': {
                            'width': 40,
                            'height': 40,
                            'top': 110,
                            'left': 80
                        },
                        'bus': ['ac']
                    }, {
                        'name': 'z',
                        'showName': 'Z',
                        'css': {
                            'width': 30,
                            'height': 30,
                            'top': 80,
                            'left': 160
                        },
                        'size':1,
                        'bus': []
                    }, {
                        'name': 'p',
                        'showName': 'P',
                        'css': {
                            'width': 30,
                            'height': 30,
                            'top': 120,
                            'left': 160
                        },
                        'size':1,
                        'bus': []
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
                'bus': ['ula.b','ac']
        }],
        registers: [{
            'name': 'epi',
            'showName': 'EPI',
            'css': {
                'left': 150,
                'top': 10
            },
            'bus': ['em']
        }, {
            'name': 'cod',
            'showName': 'COD',
            'css': {
                'left': 140,
                'top': 160
                },
                'bus':[]
        },{
            'name': 'ope',
            'showName': 'OPE',
            'css': {
                'left': 220,
                'top': 80
            },
            'bus': ['dm','em','ula.b','eaux','ac','ees','epi']
        },{
            'name': 'ac',
            'showName': 'AC',
            'css': {
                'left': 150,
                'top': 250
            },
            'bus': ['dm','aux','ula.a','des']
        },{
            'name': 'eaux',
            'showName': 'EAUX',
            'css': {
                'left': 20,
                'top': 230
            },
            'bus': ['aux']
        },{
            'name': 'em',
            'showName': 'EM',
            'css': {
                'left': 30,
                'top': 10
            },
            'bus': ['mem']
        },{
            'name': 'dm',
            'showName': 'DM',
            'css': {
                'left': 30,
                'top': 65
            },
            'bus': ['mem','cod','ac','ope']
        },{
            'name': 'ees',
            'showName': 'E E/S',
            'css': {
                'left': 370,
                'top': 10
            },
            'bus': ['dev']
        },{
            'name': 'des',
            'showName': 'D E/S',
            'css': {
                'left': 370,
                'top': 65
            },
            'bus': ['dev','ac']
        }],
        functions: {
            init: [
                "mov epi em",
                "lock em mem",
                "mov mem dm",
                "mov dm cod",
                "sumone epi ",
                "mov epi em",
                "lock em mem",
                "mov mem dm",
                "mov dm ope",
                "sumone epi "
            ],
            0: [
                "mov ope ees",
                "mov dev des",
                "mov des ac"
            ],
            1: [
                "mov ope ees",
                "mov ac des",
                "mov des dev"
            ],
            2: [
                "mov ope eaux",
                "lock eaux aux",
                "mov aux ac"
            ],
            3: [
                "mov ope eaux",
                "lock eaux aux",
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
                "mov ac ula.a",
                "mov ope eaux",
                "lock eaux aux",
                "mov aux ula.b",
                "SUM",
                "mov ula.c ac"
            ],
            11: [
                "mov ac ula.a",
                "mov ope eaux",
                "lock eaux aux",
                "mov aux ula.b",
                "SUB",
                "mov ula.c ac"
            ],
            12: [
                "mov ac ula.a",
                "mov ope ula.b",
                "SUM",
                "mov ula.c ac"
            ],
            13: [
                "mov ac ula.a",
                "mov ope ula.b",
                "SUB",
                "mov ula.c ac"
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
                "end"
            ]
        },
        logic: [
            {
                name:"SUM",
                fn: function() {
                    console.log('ULA-SUM')

                    var a = this.findRegister('ula.a');
                    var b = this.findRegister('ula.b');
                    var c = this.findRegister('ula.c');
                    var z = this.findRegister('ula.z');
                    var p = this.findRegister('ula.p');
                    
                    a.select()
                    var aValue=a.read();

                    b.select(false)
                    var bValue=b.read();

                    var cVal=aValue+bValue;

                    c.select(false);
                    c.write(cVal);

                    if(cVal==0){
                        z.select(false);
                        z.write(1);
                    }else{
                        z.select(false);
                        z.write(0);
                    }
                    if(cVal>0){
                        p.select(false);
                        p.write(1);   
                    }else{
                        p.select(false);
                        p.write(0);   
                    }
                }
            },{
                name:"SUB",
                fn: function() {
                    console.log('ULA-SUB')

                    var a = this.findRegister('ula.a');
                    var b = this.findRegister('ula.b');
                    var c = this.findRegister('ula.c');
                    var z = this.findRegister('ula.z');
                    var p = this.findRegister('ula.p');
                    
                    a.select()
                    var aValue=a.read();

                    b.select(false)
                    var bValue=b.read();

                    var cVal=aValue-bValue;

                    c.select(false);

                    if(cVal==0){
                        z.select(false);
                        z.write(1);
                    }else{
                        z.select(false);
                        z.write(0);
                    }
                    if(cVal>0){
                        p.select(false);
                        p.write(1);   
                    }else{
                        p.select(false);
                        p.write(0);   
                    }
                    if(cVal<0){
                        cVal*=-1;
                    }
                    c.write(cVal);

                }
            },{
                name:"GOZ",
                fn: function() {
                    console.log('ULA-GOZ')

                    var z = this.findRegister('ula.z');
                    var ope = this.findRegister('ope');
                    var epi = this.findRegister('epi');

                    z.select();
                    var zVal=z.read();

                    if (zVal === 1) {
                        ope.select(false)
                        epi.select(false)

                        epi.write(ope.read());
                    }
                }
            },{
                name:"GOP",
                fn: function() {
                    console.log('ULA-GOP')

                    var p = this.findRegister('ula.p');
                    var ope = this.findRegister('ope');
                    var epi = this.findRegister('epi');

                    p.select();
                    var pVal=p.read();

                    if (pVal === 1) {
                        ope.select(false)
                        epi.select(false)

                        epi.write(ope.read());
                    }
                },
            }
        ],
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
