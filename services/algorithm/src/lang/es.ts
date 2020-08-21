import locale from '@choco/i18n'

const lang = 'es'

export default function() {
  locale.set(lang, 'menu', 'Menú')
  locale.set(lang, 'addTab', 'Agregar pestaña')
  locale.set(lang, 'removeTab', 'Eliminar pestaña')
  locale.set(lang, 'editor', 'Editor')
}
