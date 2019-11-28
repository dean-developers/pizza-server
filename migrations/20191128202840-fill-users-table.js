module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            login: 'admin',
            type: 'admin'
        }, {
            login: 'operator',
            type: 'operator'
        }, {
            login: 'driver',
            type: 'driver'
        }].map(it => Object.assign(it, {
            salt: 'JCfaGGYrKVixHMKiHorr7KlaTNYOoAntC6CiigtHIywMPBNoMvyGSt52K6iTBE8n8f3AU85Pcc/HWdNYykwiygQgFwH+2mdJsSaHUF1KGUR6AstGpdvotaJM41yGwmXa0fQ9I4gwhp/X6KUij3KoaZwEy3kL1kE18P4SFFWUMms=',
            password: 'fPne0F6lBthxrVV3MkMutt2rbPlRIl0j+iS3GQd3smsMZrWmoDkNN6KTrbgXU0v0mFPI0XpiwmzqDbxDUAZyARn39SZYxR0o0yFWZsrcHRMpoKTksNq0x/teri/4j7D6oBuGuVDOXw/fGUbCXbfke/1if0lxyiXJMMIUDXY+mTc=',
            createdAt: new Date(),
            updatedAt: new Date()
        })));
        // password - 123123
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', {
            login: {
                [Sequelize.Op.in]: [
                    'admin',
                    'operator',
                    'driver'
                ]
            }
        })
    }
};
