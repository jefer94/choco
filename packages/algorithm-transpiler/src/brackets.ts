import locale from '@choco/i18n'

export default function brackets(keywords, currentJS) {
  let js = currentJS
  Object.keys(keywords).map(Number).forEach((key) => {
    js += bracketsLine(keywords[key])
  })
  return js
}

function bracketsLine(keyword) {
  const { openBracket, closeBracket, transpiler, tokens } = locale.all()
  if (openBracket.indexOf(keyword) !== -1) return '{ '
  else if (closeBracket.indexOf(keyword) !== -1) return '}'
  else if (transpiler[keyword]) return `${transpiler[keyword]} `
  else if (tokens[keyword]) return `${tokens[keyword]} `
  else return `${keyword} `
}