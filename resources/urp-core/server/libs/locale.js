import i18n from 'i18n'
import br from '../../shared/configs/lang/pt-br.json'
import en from '../../shared/configs/lang/en.json'

let provider;

const init = (lang) => {
    i18n.configure({
        locales: ['pt-br', 'en'],
        defaultLocale: 'pt-br',
        objectNotation: true,
        staticCatalog: {
            "pt-br": br,
            "en": en
        },
        api: {
            '__': 'translate',
        }
    });
    provider = i18n
    setLocale(lang)
}

const getLocales = () =>{ 
    return provider.getLocales() || undefined
}

const setLocale = (lang) => {
    if (getLocales().indexOf(lang) !== -1) {
        provider.setLocale(lang)
    }
}

const translate = (str, args) => {
    return provider.__(str, args)
}


export { init, translate }