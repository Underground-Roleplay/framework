const en = {
    SERVER: {
        STARTING: 'Server is starting...',
        LOCALE_STARTED: 'Internationalization started',
        DATABASE_STARTED: 'Database started',
        STARTED: 'Server has started',
    },
    PLAYER: {
        NEW_CONNECTED: 'Player {{ playerName }} has been connected',
        CONNECTED_TOO_SOON: "Our servers aren't ready yet, try connect later",
        MISSING_IDENTIFICATORS: 'Identificators not found',
    },
    ACCOUNT: {
        REGISTER_ERROR:
            'We had a problem registering your account, try again later',
        LOGIN_ERROR:
            "ER101 : There's a problem with your login, try contact an administrator",
        NEW_CREATED:
            'A new account has been created for a player with socialID: {{ sID }}',
        BANNED: 'You are banned from our servers',
        BAN: 'You are banned from our servers. Reason: {{ reason }}',
        LOGIN: 'The player {{ playerName }} has been logged into the account with socialID: {{ sID }}',
        NOT_ALLOW_LISTED:
            'Your [Player ID = {{ socialID }}] is not allow listed in this server, try contact an administrator',
    },
    CHARACTER: {
        CREATION_ERROR:
            'There was an error creating a new character [socialID = {{ socialID }}]',
        CREATION_SUCCESS:
            'A new character was created [socialID = {{ socialID }}]',
    },
    VEHICLE: {
        INCORRECT_MODEL: "{{ model }} - isn't a valid model!",
    },
    INVENTORY: {
        LABEL: 'INVENTORY',
        ITEM_DOESNT_EXISTS: 'This item does not exists',
        FULL: 'You inventory is full',
        WEIGHT_LIMIT: 'You inventory weight is too high',
    },
    PERMISSIONS: {
        LABEL: 'PERMISSION SYSTEM',
        DONT_HAVE_PERM: "You DON'T have the necessary permissions",
    },
    COMMANDS: {
        LABEL: 'COMMANDS',
        USER_ID_NOT_FOUND: 'User Id not found',
        USER_ID_WHITELISTED: 'Social Id has been Whitelisted',
        USER_ID_ALLREADY_WHITELISTED: 'Social id already whitelisted',
        USER_ID_ALLREADY_BANNED: 'Social id already banned',
        USER_ID_BANNED: 'Social id banned',
        USER_ID_NOT_BANNED: 'Social id not banned yet',
        USER_ID_UNBANNED: 'Social id unbanned successfully!',
    },
    SYSTEM: {
        LABEL: 'SYSTEM',
        TARGET_NEEDED_IDENTIFIER:
            'You need to give an identifier to TP to Player such as ssn or id',
        NO_TARGET_FOUND: "There's no player with that identifier online",
    },
    VEHICLES: {
        LABEL: 'VEHICLE',
        NO_FUEL: 'Your vehicle does not have enough fuel',
        ENGINE_ON: "Your vehicle's engine has been started",
        ENGINE_OFF: "Your vehicle's engine has been turned off",
        NOT_IN_A_VEH: 'You need to be in a vehicle to toggle engine',
    },
    LICENSE: {
        LABEL: 'LICENSE',
        LICENSE_ISSUED:
            '{{ licenseType }} license has been successfully issued!',
        LICENSE_REVOKED: '{{ licenseType }} license has been revoked!',
    },
    HOSPITAL: {
        LABEL: 'DOCTOR',
        HEAL: 'Heald you',
        HEALLER: '{{ targetplayer }} has been healed.',
        REVIE: 'Revied you',
        REVIVER: '{{ targetplayer }} has been revived.',
    },
    JOB: {
        LABEL: '{{ jobname }}',
        UPDATED: 'You are now a {{ jobname }}',
        JOB_STARTED: 'Welcome back to work!',
        JOB_ENDED: 'Thanks for your todays work!.',
        PAYCHECK_RECIVED: 'You received your paycheck of ${{ value }},',
    },
    HOMES: {
        LABEL: 'HOMES SYSTEM',
        ALREADY_HAVE: 'You already own an home',
        NO_VACANCY: 'There are no vacancies available at this location.',
        NO_HOME: 'You do not own any residence',
        NOT_HERE: 'You do not own any residence in this location',
        NOT_AVAILABLE: 'The owner is not at home',
        REFUSED: 'Your entry has been refused',
        REQUEST:
            '{{ name }} Is asking permission to enters into your residence, do you want to authorize?',
        SUCCESS_PURCHASE: 'You have successfully purchased your home!',
    },
    MONEY: {
        DONT_HAVE_ENOUGH: 'You do not have enough money',
    },
    INTERACTION: {
        NEW: 'A new interaction has been created',
        MULTIPLE_NEW:
            'A total of {{ interactions }} new interactions has been created',
    },
    NO_PLAYERS_NEAR: 'No players nearby',
    WELCOME: 'Welcome to {{ serverName }}',
};

export default en;
