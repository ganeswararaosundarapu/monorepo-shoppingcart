const { default: manageTranslations } = require('react-intl-translations-manager')
const yargs = require('yargs')

const argv = yargs
  .option('languages', {
    alias: 'l',
    type: 'array',
    default: ['de', 'en', 'es', 'hi', 'ja', 'ru', 'ta', 'te', 'zh']
  })
  .argv

manageTranslations({
  messagesDirectory: './public/locales/extracted',
  translationsDirectory: './public/locales/compiled/',
  languages: argv.languages,
  singleMessagesFile: true
})