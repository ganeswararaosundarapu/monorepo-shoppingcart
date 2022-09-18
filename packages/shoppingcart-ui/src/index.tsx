import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { IntlProvider } from 'react-intl'
//polyfills for intl locale
import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-datetimeformat/polyfill'

import App from './App'
import './app.scss'

type IntlProviderProps = React.ComponentProps<typeof IntlProvider>

interface MainProps {
  locale: IntlProviderProps['locale']
  messages: IntlProviderProps['messages']
}

let messages = {}

const Main: FC<MainProps> = ({ locale, messages }) => {
  return (
    <IntlProvider
      locale={locale}
      defaultLocale='en'
      messages={messages}
    >
      <App />
    </IntlProvider>
  )
}

async function importVendorLocaleData (localeLanguage: string) {
  await import(/* webpackPreload: true, webpackMode: "lazy-once", webpackChunkName: "all-i18n-vendor-locale-data" */ `@formatjs/intl-pluralrules/locale-data/${localeLanguage}`)
  await import(/* webpackPreload: true, webpackMode: "lazy-once", webpackChunkName: "all-i18n-vendor-locale-data" */ `@formatjs/intl-numberformat/locale-data/${localeLanguage}`)
  await import(/* webpackPreload: true, webpackMode: "lazy-once", webpackChunkName: "all-i18n-vendor-locale-data" */ `@formatjs/intl-datetimeformat/locale-data/${localeLanguage}`)
  messages = await import(/* webpackPreload: true, webpackMode: "lazy-once", webpackChunkName: "all-i18n-locales-messages" */ `../public/locales/compiled/${localeLanguage}.json`)
}

async function configureLocaleData (locale: string) {
  let loadedLocale = ''
  const DEFAULT_LANGUAGE = 'en'
  // Define user's language - cross browsers support
  const language: string = (locale ||
    navigator?.languages[0] ||
    navigator.language ||
    navigator.userLanguage).toLowerCase()

  // Split locales with a region code
  const languageWithoutRegionCode: string = language.toLowerCase().split(/[_-]+/)[0]
   //  Try full locale, try locale without region code, fallback to 'en'
  try {
    await importVendorLocaleData(language)
    loadedLocale = language
    console.log(`Loaded vendor locale data with user locale ${language}`)
  } catch (err) {
    console.warn('Error while loading formatjs vendor locale data with user locale', err)
    try {
      await importVendorLocaleData(languageWithoutRegionCode)
      loadedLocale = languageWithoutRegionCode
      console.log(`Loaded vendor locale data without user locale region code  ${languageWithoutRegionCode}`)
    } catch (fallbackErr) {
      console.warn('Error while loading formatjs vendor locale data without region code', fallbackErr)
      try {
        await importVendorLocaleData(DEFAULT_LANGUAGE)
        loadedLocale = DEFAULT_LANGUAGE
      } catch (fallbackErr1) {
        console.warn('Error while loading formatjs vendor with defaultlocale data ', fallbackErr1)
      }
    }
  }
  // Basic information for locale at runtime
  console.log('browser locale', language)
  console.log('loaded locale language', loadedLocale)
  return {
    locale: language,
    messages
  }
}

async function bootstrapApplication () {
  const setLocale = '' // add specific locale to test
  const { locale, messages } = await configureLocaleData(setLocale)
  const root = createRoot(document.getElementById('root'))
  root.render(<Main locale={locale} messages={messages} />)
}

bootstrapApplication()