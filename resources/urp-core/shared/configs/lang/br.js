const br = {
    SERVER: {
        STARTING: 'O server está sendo iniciado...',
        LOCALE_STARTED: 'Internacionalização inicializada',
        DATABASE_STARTED: 'Database inicializada',
        STARTED: 'O server foi iniciado',
    },
    PLAYER: {
        NEW_CONNECTED: 'O Jogador {{ playerName }} foi conectado',
        CONNECTED_TOO_SOON:
            'Nossos servidores ainda não estão prontos, tente conectar mais tarde',
        MISSING_IDENTIFICATORS:
            'Não foi possivel encontrar seus identificadores',
    },
    ACCOUNT: {
        REGISTER_ERROR:
            'Tivemos um problema ao registrar sua conta, tente novamente mais tarde',
        LOGIN_ERROR:
            'Há um problema com o seu login, tente entrar em contato com um administrador',
        NEW_CREATED:
            'Uma nova conta foi criada para o player com socialID: {{ sID }}',
        BANNED: 'Você foi banido de nossos servidores',
        LOGIN: 'O player {{ playerName }} foi logado na conta com socialID: {{ sID }}',
    },
    CHARACTER: {
        CREATION_ERROR:
            'Ocorreu um erro ao criar novo personagem [socialID = {{ usrID }}]',
        CREATION_SUCCESS:
            'Um novo personagem foi criado [socialID = {{ usrID }}]',
    },
    VEHICLE: {
        INCORRECT_MODEL: '{{ model }} - não é um modelo valido!',
    },
    INVENTORY: {
        LABEL: 'INVENTÁRIO',
        ITEM_DOESNT_EXISTS: 'O item não existe',
        FULL: 'Seu inventario está cheio',
    },
    PERMISSIONS: {
        LABEL: 'SISTEMA DE PERMISSÃO',
        DONT_HAVE_PERM: 'Você NÃO tem as permissões necessarias!',
    },
    COMMANDS: {
        LABEL: 'COMANDOS',
        USER_ID_NOT_FOUND: 'ID do usuário não encontrado',
        USER_ID_WHITELISTED: 'O ID social foi colocado na lista de permissões',
        USER_ID_ALLREADY_WHITELISTED:
            'O ID social já está na lista de permissões',
        USER_ID_ALLREADY_BANNED: 'ID social já banido',
        USER_ID_BANNED: 'ID social banido',
        USER_ID_NOT_BANNED: 'ID social ainda não banido',
        USER_ID_UNBANNED: 'ID social desbanido com sucesso!',
    },
    SYSTEM: {
        LABEL: 'SISTEMA',
        TARGET_NEEDED_IDENTIFIER:
            'Você precisa fornecer um identificador para o TP ao jogador, como ssn ou id',
        NO_TARGET_FOUND: 'Não há nenhum jogador com esse identificador online',
    },
    VEHICLES: {
        LABEL: 'VEICULO',
        NO_FUEL: 'Seu veiculo não possui combustivel suficiente',
        ENGINE_ON: 'O motor do seu veiculo foi ligado',
        ENGINE_OFF: 'O motor do seu veiculo foi desligado',
        NOT_IN_A_VEH: 'Você precisa estar em um veículo para ligar o motor',
    },
    LICENSE: {
        LABEL: 'LICENÇA',
        LICENSE_ISSUED: '{{ licenseType }} licença foi emitida com sucesso!',
        LICENSE_REVOKED: '{{ licenseType }} licença foi revogada!',
    },
    HOSPITAL: {
        LABEL: 'MÉDICA',
        HEAL: 'Te curei',
        HEALLER: '{{ targetplayer }} foi curado.',
        REVIE: 'Avalie você',
        REVIVER: '{{ targetplayer }} foi revivido.',
    },
    JOB: {
        LABEL: '{{ jobname }}',
        UPDATED: 'Você agora é um {{ jobname }}',
        JOB_STARTED: 'Bem-vindo de volta ao trabalho!',
        JOB_ENDED: 'Obrigado pelo seu trabalho de hoje!.',
        PAYCHECK_RECIVED:
            'Você recebeu seu pagamento no valor de ${{ value }},',
    },
    HOMES: {
        LABEL: 'SISTEMA DE MORADIA',
        ALREADY_HAVE: 'Você já possui uma moradia',
        NO_VACANCY: 'Não existem vagas disponiveis nessa moradia',
        NO_HOME: 'Você não possui nenhuma residencia',
        NOT_HERE: 'Você não possui nenhuma residencia nesta localização',
        NOT_AVAILABLE: 'O dono não se encontra na residencia',
        REFUSED: 'Sua entrada foi recusada',
        REQUEST:
            '{{ name }} Está solicitando a entrada em sua residencia, deseja autorizar?',
        SUCCESS_PURCHASE: 'Você comprou sua residencia com sucesso!',
    },
    MONEY: {
        DONT_HAVE_ENOUGH: 'Você não tem dinheiro suficiente',
    },
    INTERACTION: {
        NEW: 'Uma nova interação foi criada',
        MULTIPLE_NEW: 'Foram criadas {{ interactions }} novas interações',
    },
    NO_PLAYERS_NEAR: 'Nenhum player próximo',
    WELCOME: 'Bem vindo ao {{ serverName }}',
};

export default br;
