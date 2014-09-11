/**
 * @autor Anderson Rocha
 **/

var processador = {
    nome: "SERGIUM",
    descricao: "Computador Didatico",
    arquitetura: "simplificada",
    memoria: {
        'nome': 'mem',
        'size': 255,
        'apontador_endereco': 'em'
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
            'nome': 'ula',
            'nome_exibicao': 'ULA',
            'style': {
                'background-image': 'url("images/ula.png")',
                'width': '200px',
                'height': '165px',
                'top': '220px',
                'left': '235px'
            },
            'elementos': [{
                    'nome': 'a',
                    'nome_exibicao': 'A',
                    'size': 255,
                    'style': {
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '20px',
                        'margin-left': '20px'
                    },
                    'barramento': ''
                }, {
                    'nome': 'b',
                    'nome_exibicao': 'B',
                    'size': 255,
                    'style': {
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '20px',
                        'margin-left': '140px'
                    },
                    'barramento': ''
                }, {
                    'nome': 'c',
                    'nome_exibicao': 'C',
                    'size': 255,
                    'arr': 0,
                    'style': {
                        'width': '40px',
                        'height': '40px',
                        'margin-top': '110px',
                        'margin-left': '80px'
                    },
                    'barramento': 'ac'
                }, {
                    'nome': 'z',
                    'nome_exibicao': 'Z',
                    'size': 1,
                    'arr': 0,
                    'style': {
                        'width': '30px',
                        'height': '30px',
                        'margin-top': '80px',
                        'margin-left': '160px'
                    },
                    'barramento': ''
                }, {
                    'nome': 'p',
                    'nome_exibicao': 'P',
                    'size': 1,
                    'arr': 0,
                    'style': {
                        'width': '30px',
                        'height': '30px',
                        'margin-top': '120px',
                        'margin-left': '160px'
                    },
                    'barramento': ''
                }]
        }
    ],
    registradores_auxilixares: [{
            'nome': 'aux',
            'nome_exibicao': 'AUX',
            'size': 255,
            'apontador_endereco': 'eaux',
            'arr': 4,
            'orientacao': {
                'x': 20,
                'y': 285
            },
            'barramento': 'b,ac'
        }],
    registradores: [
        {
            'nome': 'epi',
            'nome_exibicao': 'EPI',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 150,
                'y': 10
            },
            'barramento': 'em'
        },
        {
            'nome': 'cod',
            'nome_exibicao': 'COD',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 140,
                'y': 160
            },
            'barramento': ''
        },
        {
            'nome': 'ope',
            'nome_exibicao': 'OPE',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 220,
                'y': 80
            },
            'barramento': 'dm,em,b,eaux,ac,ees,epi'
        },
        {
            'nome': 'ac',
            'nome_exibicao': 'AC',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 150,
                'y': 250
            },
            'barramento': 'dm,aux,a,des'
        },
        {
            'nome': 'eaux',
            'nome_exibicao': 'EAUX',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 20,
                'y': 230
            },
            'barramento': ''
        },
        {
            'nome': 'em',
            'nome_exibicao': 'EM',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 30,
                'y': 10
            },
            'barramento': 'mem'
        },
        {
            'nome': 'dm',
            'nome_exibicao': 'DM',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 30,
                'y': 65
            },
            'barramento': 'mem,cod,ac,ope'
        },
        {
            'nome': 'ees',
            'nome_exibicao': 'E E/S',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 370,
                'y': 10
            },
            'barramento': 'per'
        },
        {
            'nome': 'des',
            'nome_exibicao': 'D E/S',
            'size': 255,
            'arr': 0,
            'orientacao': {
                'x': 370,
                'y': 65
            },
            'barramento': 'per,ac'
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
    }
};
