'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lezerJavascript = require('lezer-javascript');
var syntax = require('../../syntax');
var state = require('../../state');
var highlight = require('../../highlight');

const statementIndent = syntax.continuedIndent({ except: /^{/ });
/// A syntax provider based on the [Lezer JavaScript
/// parser](https://github.com/lezer-parser/javascript), extended with
/// highlighting and indentation information.
const javascriptSyntax = new syntax.LezerSyntax(lezerJavascript.parser.withProps(syntax.indentNodeProp.add(type => {
    if (type.name == "IfStatement")
        return syntax.continuedIndent({ except: /^({|else\b)/ });
    if (type.name == "TryStatement")
        return syntax.continuedIndent({ except: /^({|catch|finally)\b/ });
    if (type.name == "LabeledStatement")
        return syntax.flatIndent;
    if (type.name == "SwitchBody")
        return context => {
            let after = context.textAfter, closed = after[0] == "}", isCase = /^(case|default)\b/.test(after);
            return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
        };
    if (type.name == "TemplateString" || type.name == "BlockComment")
        return () => -1;
    if (/(Statement|Declaration)$/.test(type.name) || type.name == "Property")
        return statementIndent;
    return undefined;
}), syntax.foldNodeProp.add({
    Block(tree) { return { from: tree.start + 1, to: tree.end - 1 }; }
}), state.languageData.add({
    Script: { closeBrackets: ["(", "[", "{", "'", '"', "`"] }
}), highlight.styleTags({
    "get set async static": "modifier",
    "for while do if else switch try catch finally return throw break continue default case": "keyword control",
    "in of await yield void typeof delete instanceof": "operatorKeyword",
    "export import let var const function class extends": "keyword definition",
    "with debugger from as": "keyword",
    TemplateString: "string#2",
    "BooleanLiteral Super": "atom",
    this: "self",
    null: "null",
    Star: "modifier",
    VariableName: "variableName",
    VariableDefinition: "variableName definition",
    Label: "labelName",
    PropertyName: "propertyName",
    PropertyNameDefinition: "propertyName definition",
    "PostfixOp UpdateOp": "updateOperator",
    LineComment: "lineComment",
    BlockComment: "blockComment",
    Number: "number",
    String: "string",
    ArithOp: "arithmeticOperator",
    LogicOp: "logicOperator",
    BitOp: "bitwiseOperator",
    CompareOp: "compareOperator",
    RegExp: "regexp",
    Equals: "operator definition",
    Spread: "punctuation",
    "Arrow :": "punctuation definition",
    "( )": "paren",
    "[ ]": "squareBracket",
    "{ }": "brace",
    ".": "derefOperator",
    ", ;": "separator"
})));
/// Returns an extension that installs the JavaScript syntax provider.
function javascript() { return javascriptSyntax.extension; }

/// Connects an [ESLint](https://eslint.org/) linter to CodeMirror's
/// [lint](#lint) integration. `eslint` should be an instance of the
/// [`Linter`](https://eslint.org/docs/developer-guide/nodejs-api#linter)
/// class, and `config` an optional ESLint configuration. The return
/// value of this function can be passed to [`linter`](#lint.linter)
/// to create a JavaScript linting extension.
///
/// Note that ESLint targets node, and is tricky to run in the
/// browser. The [eslint4b](https://github.com/mysticatea/eslint4b)
/// and
/// [eslint4b-prebuilt](https://github.com/marijnh/eslint4b-prebuilt/)
/// packages may help with that.
function esLint(eslint, config) {
    if (!config) {
        config = {
            parserOptions: { ecmaVersion: 2019, sourceType: "module" },
            env: { browser: true, node: true, es6: true, es2015: true, es2017: true, es2020: true },
            rules: {}
        };
        eslint.getRules().forEach((desc, name) => {
            if (desc.meta.docs.recommended)
                config.rules[name] = 2;
        });
    }
    function range(state, from = 0, to = state.doc.length) {
        let fromLine = state.doc.lineAt(from), offset = { line: fromLine.number - 1, col: from - fromLine.start, pos: from };
        return eslint.verify(state.doc.slice(from, to), config)
            .map((val) => translateDiagnostic(val, state.doc, offset));
    }
    return (view) => {
        let [syntax$1] = view.state.facet(state.EditorState.syntax);
        if (syntax$1 == javascriptSyntax)
            return range(view.state);
        if (!syntax$1 || !(syntax$1 instanceof syntax.LezerSyntax && syntax$1.parser.hasNested))
            return [];
        let found = [];
        // FIXME move to async parsing?
        syntax$1.getTree(view.state).iterate({
            enter(type, start, end) {
                if (type == javascriptSyntax.docNodeType) {
                    for (let d of range(view.state, start, end))
                        found.push(d);
                    return false;
                }
                return undefined;
            }
        });
        return found;
    };
}
function mapPos(line, col, doc, offset) {
    return doc.line(line + offset.line).start + col + (line == 1 ? offset.col - 1 : -1);
}
function translateDiagnostic(input, doc, offset) {
    let start = mapPos(input.line, input.column, doc, offset);
    let result = {
        from: start,
        to: input.endLine != null && input.endColumn != 1 ? mapPos(input.endLine, input.endColumn, doc, offset) : start,
        message: input.message,
        source: input.ruleId ? "jshint:" + input.ruleId : "jshint",
        severity: input.severity == 1 ? "warning" : "error",
    };
    if (input.fix) {
        let { range, text } = input.fix, from = range[0] + offset.pos - start, to = range[1] + offset.pos - start;
        result.actions = [{
                name: "fix",
                apply(view, start) {
                    view.dispatch(view.state.t().replace(start + from, start + to, text).scrollIntoView());
                }
            }];
    }
    return result;
}

exports.esLint = esLint;
exports.javascript = javascript;
exports.javascriptSyntax = javascriptSyntax;
