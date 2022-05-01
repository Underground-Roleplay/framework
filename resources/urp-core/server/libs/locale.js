import i18n from 'i18n';
import br from '../../shared/configs/lang/br';
import en from '../../shared/configs/lang/en';

let provider;

const init = (lang) => {
    i18n.configure({
        locales: ['br', 'en'],
        defaultLocale: 'br',
        objectNotation: true,
        staticCatalog: {
            br: br,
            en: en,
        },
        api: {
            __: 'translate',
        },
    });
    provider = i18n;
    setLocale(lang);
};

const getLocales = () => {
    return provider.getLocales() || undefined;
};

const setLocale = (lang) => {
    if (getLocales().indexOf(lang) !== -1) {
        provider.setLocale(lang);
    }
};

const translate = (str, args) => {
    return provider.__(str, args);
};

export { init, translate };
