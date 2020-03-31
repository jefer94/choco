import locale from '@choco/i18n'

const lang = 'es'

export default function() {
  locale.set(lang, 'menu', 'Menu')
  locale.set(lang, 'addTab', 'Add tab')
  locale.set(lang, 'removeTab', 'Remove tab')
  locale.set(lang, 'editor', 'Editor')
}
