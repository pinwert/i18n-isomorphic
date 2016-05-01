import Immutable from 'immutable';
import {I18n} from 'react-i18nify';
const locale = 'es'
export const PruebaState = Immutable.Record({
  datos: "Pruebita",
  locale: locale
})

I18n.loadTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!'
    },
    date: {
      long: 'MMMM Do, YYYY'
    }
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!'
    },
    date: {
      long: 'D MMMM YYYY'
    }
  },
  es: {
    application: {
      title: 'Increible aplicación con i18n!',
      hello: 'Hola, %{name}!'
    },
    date: {
      long: 'D MMMM YYYY'
    }
  }
});

export function setLocale(locale){
  console.log(I18n.setLocale);
  I18n.setLocale(locale);
}

setLocale(locale);
