addProcessor({
    description:{
        name: <NOME DO PROSESSADOR>,
        descricao: <DESCRIÇÃO DO PROCESSADOR>,
        arquitetura: <TIPO DE ARQUITETURA>,
    },
    default:{
        //Pointers of Memory
        memoryPointer:<REGISTRADOR DE PONTEIRO DA MEMÓRIA>,
        memorydata:<REGISTRADOR DE DADOS DA MEMÓRIA>,
        //Pointers of I/O
        ioPointer:<REGISTRADOR DE PONTEIRO DOS DISPOSITIVOS>,
        ioData:<REGISTRADOR DE DADOS DOS DISPOSITIVOS>,
        //pointer
        programPointer:<REGISTRADOR DE CODIGO DO PROGRAMA>
    },
    memory: {
        size: <TAMANHO DA MEMÓRIA>,
    },
    functionalUnities: [<UNIDADES FUNCIONAIS>],
    auxRegisters: [<REGISTRADORES AUXILIARES>],
    registers: [<RESGISTRADORES>],
    functions: {
        init: [<FUNÇÂO DE BUSCA OPERANDO/OPERADOR>],
        0: [<FUNÇÃO>],
        ...: [...],
    },
    logic: [<FUNÇÕES LÓGICAS ESPECIFICAS>],        
});