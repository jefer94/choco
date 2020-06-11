'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const _taggedTemplateLiteral = _interopDefault(require('@babel/runtime/helpers/taggedTemplateLiteral'));
const styled = _interopDefault(require('styled-components'));
const React = require('react');
const React__default = _interopDefault(React);
const PropTypes = _interopDefault(require('prop-types'));
const _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
const view = require('@codemirror/next/view');
const state = require('@codemirror/next/state');
require('@codemirror/next/gutter');
const reactFontawesome = require('@fortawesome/react-fontawesome');
const ServerLink = _interopDefault(require('next/link'));
const PulseLoader = _interopDefault(require('react-spinners/PulseLoader'));
const freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
const react = require('@monaco-editor/react');

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  padding: 10px;\n  outline: 0;\n  background-color: transparent;\n  border: 2px solid ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

const Button = styled.button(_templateObject(), function (v) {
  return v.color ? v.color : '#000';
});

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: inline;\n  float: left;\n  margin: {(v) => v.firstLine ? 0 : 'unset'};\n  padding: {(v) => v.firstLine ? '0 10px 0 0' : 'unset'};\n  color: {(v) => v.firstLine ? '#537f7e' : 'unset'};\n  margin-left: {(v) => !v.firstLine ? 0 : 'unset'};\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  font-family: monospace;\n  font-size: {(v) => v.theme.fontSize};\n  line-height: {(v) => v.theme.lineHeight};\n  white-space: pre-wrap;\n  word-break: normal;\n  word-wrap: break-word;\n  cursor: text;\n  padding: 0px 4px 0px 0px;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}

/** @module components/Console */

/**
 * @typedef {object} Line
 * @property {string} id - Line id.
 * @property {string} value - Line value.
 * @property {string} var - Line var.
 */

/**
 * @typedef {object} ConsoleProps
 * @property {Line} line - Line.
 * @property {number} lineNumber - Line number.
 */

var LineWrapper = styled.div(_templateObject$1());
var Line = styled.div(_templateObject2());
/**
 * Console component, base in C/C++ style.
 *
 * @param {ConsoleProps} props - Doc name.
 * @example
 * import React from 'react'
 * import Console from 'components/Console'
 *
 * const Component = () => <Console />
 * @returns {object} Doc.
 */

function ConsoleLine(_ref) {
  var theme = _ref.theme,
      line = _ref.line,
      lineNumber = _ref.lineNumber;
  return /*#__PURE__*/React__default.createElement(LineWrapper, {
    theme: theme
  }, lineNumber === 0 ? /*#__PURE__*/React__default.createElement(Line, {
    as: "p",
    firstLine: true
  }, "~ \u03BB") : '', /*#__PURE__*/React__default.createElement(Line, null, line.content ? /*#__PURE__*/React__default.createElement("p", null, line.content) : '', line["var"] ? /*#__PURE__*/React__default.createElement("p", {
    className: "var"
  }, line["var"]) : ''));
}

var line = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  "var": PropTypes.string
};
ConsoleLine.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  line: PropTypes.shape(line).isRequired,
  lineNumber: PropTypes.number.isRequired
};

/** @module components/Console */

/**
 * @typedef {object} Line
 * @property {string} id - Doc key.
 * @property {string} value - Doc name.
 * @property {string} var - Doc description.
 */

/**
 * @typedef {object} ConsoleProps
 * @property {Line[]} lines - Doc key.
 */

/**
 * Console component, base in C/C++ style.
 *
 * @param {ConsoleProps} props - Doc name.
 * @example
 * import React from 'react'
 * import Console from 'components/Console'
 *
 * const Component = () => <Console />
 * @returns {object} Doc.
 */

function Console(_ref) {
  var lines = _ref.lines,
      theme = _ref.theme;
  return /*#__PURE__*/React__default.createElement("main", {
    id: "content2",
    className: "tab"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "console"
  }, lines.map(function (line, key) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: line.id
    }, /*#__PURE__*/React__default.createElement(ConsoleLine, {
      line: line,
      lineNumber: key,
      theme: theme
    }), /*#__PURE__*/React__default.createElement("br", null));
  })));
}

Console.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  lines: PropTypes.arrayOf(PropTypes.object).isRequired
};

// import keychain from '@choco/keychain'

/** @module components/Docs */

/**
 * @typedef {object} Doc
 * @property {number} id - Doc key.
 * @property {string} name - Doc name.
 * @property {string} description - Doc description.
 * @property {string} content - Doc content.
 */

/**
 * Generate doc object.
 *
 * @param {string} name - Doc name.
 * @param {string} description - Doc description.
 * @param {content} content - Doc content.
 * @example
 * addDoc('Awesome doc', 'Awesome description', 'Awesome content')
 * // return {
 * //   id: 'doc_0',
 * //   name: 'Awesome doc',
 * //   description: 'Awesome description',
 * //   content: 'Awesome content'
 * // }
 * @returns {Doc} Doc
 */
// function addDoc(name, description, content) {
//   return {
//     id: keychain('doc'),
//     name,
//     description,
//     content
//   }
// }

/**
 * Generate Docs component, with examples
 *
 * @todo store and load examples
 * @todo sync in the cloud algorithms
 * @example
 * import React from 'react'
 * import Docs from 'components/Docs'
 *
 * const Component = () => <Docs />
 * @returns {object} Docs
 */

function Docs () {
  // const docs = [
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa')
  // ]
  return /*#__PURE__*/React__default.createElement("div", {
    className: "algorithm-docs-wrapper"
  });
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  & > div {\n    height: ", ";\n    max-height: ", ";\n    outline: 0!important;\n    background-color: ", ";\n    color: ", ";\n    font-size: ", ";\n    padding-left: 15px;\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
//   & > div {
//     height: ${(v) => v.height};
//     max-height: ${(v) => v.height};
//     outline: 0!important;
//     background-color: ${(v) => v.theme.surface};
//     color: ${(v) => v.theme.white};
//     font-size: ${(v) => v.theme.fontSize};
//     padding-left: 15px;
//   }
// `

function CodemirrorWrapper(_ref) {
  var className = _ref.className,
      content = _ref.content;

  var _useState = React.useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var div = React.useRef();
  var editor = React.useRef();
  React.useEffect(function () {
    if (loading) {
      editor.current = new view.EditorView({
        state: state.EditorState.create({
          doc: content,
          extensions: []
        })
      });
      setLoading(false);
    } else if (div.current && editor.current) div.current.appendChild(editor.current.dom);
  }, [loading]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: className,
    ref: div
  });
}

const Codemirror = styled(CodemirrorWrapper)(_templateObject$2(), function (v) {
  return v.height;
}, function (v) {
  return v.height;
}, function (v) {
  return v.theme.surface;
}, function (v) {
  return v.theme.white;
}, function (v) {
  return v.theme.fontSize;
});

// export { ControlledEditor } from '@monaco-editor/react'
// import { ControlledEditor } from '@monaco-editor/react'
// import register from '../libs/algorithm/monaco'

/** @module components/Editor */

/**
 * Get height less navbar.
 *
 * @returns {number} Height less navbar.
 */

function windowHeight() {
  // return +window.innerHeight - 71
  return +window.innerHeight - 48;
}
/**
 * Get width less navbar.
 *
 * @returns {number} Width less navbar.
 */


function windowWidth() {
  return +window.innerWidth;
}
/**
 * @typedef {Object} EditorProps
 * @property {string} content - Value of editor
 * @property {callback} onChange - On change send current content
 */

/**
 * Edidor wrapper.
 *
 * @param {EditorProps} props
 * @example
 * // returns <Editor ... />
 * import React from 'react'
 * import Editor from '/components/Editor'
 *
 * export default function () {
 *   return <Editor content="Content" onChange={value => console.log(value) } />
 * }
 * @returns {object} <Editor ... />
 */


function Editor(_ref) {
  var content = _ref.content,
      onChange = _ref.onChange,
      theme = _ref.theme;

  var _useState = React.useState(windowHeight()),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  var _useState3 = React.useState(windowWidth()),
      _useState4 = _slicedToArray(_useState3, 2),
      width = _useState4[0],
      setWidth = _useState4[1]; // useEffect(register, [])


  var loop = setInterval(function () {
    var currentHeight = windowHeight();
    var currentWidth = windowWidth();

    if (currentHeight !== height) {
      clearInterval(loop);
      setHeight(currentHeight);
    }

    if (currentWidth !== width) {
      clearInterval(loop);
      setWidth(currentWidth);
    }
  });
  console.log(content, width, height, function () {
    return onChange;
  });
  return /*#__PURE__*/React__default.createElement("main", {
    id: "content1",
    className: "tab show-content"
  }, /*#__PURE__*/React__default.createElement(Codemirror, {
    height: "calc(100vh - 48px)",
    theme: theme,
    content: content
  }));
}

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: ", ";\n  bottom: ", ";\n  left: ", ";\n  right: ", ";\n  padding: 30px ", ";\n  border-radius: 30px;\n  background-color: #000;\n  z-index: 255;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
/** @module components/FloatingButton */

var FloatingButtonStyled = styled(Button)(_templateObject$3(), function (v) {
  return v.vertical === 'top' ? '20px' : 'unset';
}, function (v) {
  return v.vertical === 'bottom' ? '20px' : 'unset';
}, function (v) {
  return v.horizontal === 'left' ? '20px' : 'unset';
}, function (v) {
  return v.horizontal === 'right' ? '20px' : 'unset';
}, function (v) {
  return console.log(v.horizontal === 'right', v.vertical === 'bottom');
});

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["color: ", ";"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
/** @module components/Icon */

/**
 * @typedef {object} IconProps
 * @property {string} name - Icon from FontAwesome
 */

/**
 * Edidor wrapper
 * @param {IconProps} props
 * @example
 * <Icon name={FontAwesomeIcon} />
 * @returns {object} <Editor ... />
 */

function Icon(_ref) {
  var className = _ref.className,
      name = _ref.name;
  return /*#__PURE__*/React__default.createElement(reactFontawesome.FontAwesomeIcon, {
    className: className,
    icon: name
  });
}

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
};
const Icon$1 = styled(Icon)(_templateObject$4(), function (v) {
  return v.theme.white;
});

// const Link = typeof window !== 'undefined' ? BrowserLink : ServerLink
// export default function Link({ to, children }) {
//   const [isBrowserLink] = useState(typeof window !== 'undefined')
//   if (isBrowserLink) return (
//     <Link to={to}>
//       {children}
//     </Link>
//   )
//   else return (
//     <Link href={to}>
//       {children}
//     </Link>
//   )
// }

function Link(_ref) {
  var to = _ref.to,
      children = _ref.children;
  return /*#__PURE__*/React__default.createElement(ServerLink, {
    href: to
  }, children);
}
Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n  justify-content: center;\n  align-items: center;\n  background-color: ", "\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
/** @module components/Loading */

/**
 * Loading spinner component.
 *
 * @example
 * <Loading />
 * @returns {object} <Loading />
 */

function Loading(_ref) {
  var className = _ref.className,
      color = _ref.color;
  return /*#__PURE__*/React__default.createElement("div", {
    className: className
  }, /*#__PURE__*/React__default.createElement(PulseLoader, {
    color: color,
    loading: true
  }));
}

Loading.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
var LoadingStyled = styled(Loading)(_templateObject$5(), function (v) {
  return v.background;
});

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  filter: ", ";\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  filter: ", ";\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var BaseStyled = "\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  padding: 7px 0px;\n  line-height: 21px;\n  font-size: 16px;\n  color: #D7DAE0;\n";

function MenuLink(_ref) {
  var className = _ref.className,
      theme = _ref.theme,
      url = _ref.url,
      icon = _ref.icon;
  console.log(icon, 'icon');
  return /*#__PURE__*/React__default.createElement("div", {
    className: className
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: url
  }, /*#__PURE__*/React__default.createElement(Icon$1, {
    name: icon,
    theme: theme
  })));
}

MenuLink.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
};
var MenuLinkStyled = styled(MenuLink)(_templateObject$6(), BaseStyled, function (v) {
  return v.active ? 'brightness(150%)' : 'unset';
});

function MenuItem(_ref2) {
  var className = _ref2.className,
      theme = _ref2.theme,
      url = _ref2.url,
      icon = _ref2.icon,
      active = _ref2.active,
      onClick = _ref2.onClick;
  console.log('click', onClick);
  return /*#__PURE__*/React__default.createElement("li", {
    className: className,
    onClick: onClick
  }, /*#__PURE__*/React__default.createElement(MenuLinkStyled, {
    url: url,
    icon: icon,
    active: active,
    theme: theme
  }));
}

MenuItem.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string,
  icon: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired,
  active: PropTypes.bool.isRequired
};
MenuItem.defaultProps = {
  url: '#'
};
const MenuItem$1 = styled(MenuItem)(_templateObject2$1(), BaseStyled, function (v) {
  return v.active ? 'brightness(150%)' : 'unset';
});

function _templateObject2$2() {
  var data = _taggedTemplateLiteral(["\n  top: 0px;\n  left: ", ";\n  width: ", ";\n  position: absolute;\n  display: inline-block;\n  height: 100vh;\n  overflow: hidden;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n  transform: ", ";\n  transition-duration: 0.1s;\n  width: 64px;\n  height: 100vh;\n  display: inline-block;\n  position: absolute;\n  background-color: ", ";\n  border-right: 1px solid ", ";\n  box-shadow: 1px 0 ", ";\n  background: #252526;\n  content: \" \";\n  ul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n  }\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}

/** @module components/Menu */

var MenuWrapper = styled.div(_templateObject$7(), function (v) {
  return v.show ? 'unset' : 'translateX(-64px)';
}, function (v) {
  return v.theme.surface;
}, function (v) {
  return v.theme.surfaceBorder;
}, function (v) {
  return v.theme.surfaceBorder;
});
var ContentWrapper = styled.div(_templateObject2$2(), function (v) {
  return v.menuIsOpen ? '64px' : 'unset';
}, function (v) {
  return v.menuIsOpen ? 'calc(100vw - 64px)' : '100vw';
});
/**
 * App Menu.
 *
 * @param {object} children - Children of menu.
 * @todo Color of tabs menu
 * @todo Hide menu when click an icon
 */

function Menu(_ref) {
  var theme = _ref.theme,
      children = _ref.children,
      items = _ref.items,
      isOpen = _ref.isOpen,
      toggle = _ref.toggle;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(MenuWrapper, {
    theme: theme,
    show: isOpen
  }, /*#__PURE__*/React__default.createElement("ul", null, /*#__PURE__*/React__default.createElement(MenuItem$1, {
    icon: freeSolidSvgIcons.faBars,
    active: true,
    theme: theme,
    onClick: function onClick(v) {
      return toggle();
    }
  }), items.map(function (_ref2) {
    var id = _ref2.id,
        url = _ref2.url,
        icon = _ref2.icon,
        active = _ref2.active;
    return /*#__PURE__*/React__default.createElement(MenuItem$1, {
      key: id,
      url: url,
      icon: icon,
      active: !!active,
      theme: theme
    });
  }))), /*#__PURE__*/React__default.createElement(ContentWrapper, {
    theme: theme,
    menuIsOpen: isOpen
  }, children));
}

var menuShape = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
};
Menu.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(menuShape)).isRequired
};

function _templateObject$8() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  background-color: unset;\n  outline: 0;\n  margin: 0;\n  border: 0;\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}

var TabButtonStyled = styled.button(_templateObject$8(), function (v) {
  return v.theme.white;
});

function TabButton(_ref) {
  var theme = _ref.theme,
      label = _ref.label,
      click = _ref.click,
      children = _ref.children,
      className = _ref.className;
  return /*#__PURE__*/React__default.createElement(TabButtonStyled, {
    type: "button",
    "aria-label": label,
    onClick: click,
    className: className,
    theme: theme
  }, children);
}

TabButton.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  click: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
TabButton.defaultProps = {
  // children: [],
  click: function click() {},
  className: ''
};

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  border-left: 3px solid ", ";\n  background-color: ", ";\n  color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$3() {
  var data = _taggedTemplateLiteral(["\n  border-radius: 0;\n  border-right: 2px solid ", ";\n  border-left: 3px solid ", ";\n  background-color: ", ";\n  color: ", ";\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  float: left;\n  width: 100px;\n  text-align: center;\n  border-radius: 3px 3px 0px 0px;\n  padding: 11px 50px;\n  font-size: 16px;\n  margin-top: 6px;\n  line-height: 20px;\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
// console.log('aaaaaaaaa', props)
// function a(...rest) {
//   console.log('arguments', rest)
// }

var Li = styled.li(_templateObject$9());
var InactiveTab = styled(Li)(_templateObject2$3(), function (v) {
  return v.theme.surface;
}, function (v) {
  return v.theme.tabSurface;
}, function (v) {
  return v.theme.tabSurface;
}, function (v) {
  return v.theme.tabTextOpaque;
});
var ActiveTab = styled(Li)(_templateObject3(), function (v) {
  return v.theme.tabHighlighter;
}, function (v) {
  return v.theme.surface;
}, function (v) {
  return v.theme.white;
});

function CloseTab(_ref) {
  var theme = _ref.theme,
      name = _ref.name,
      remove = _ref.remove;
  return remove ? /*#__PURE__*/React__default.createElement(TabButton, {
    label: "Remove tab: ".concat(name),
    click: remove,
    theme: theme
  }, /*#__PURE__*/React__default.createElement(Icon$1, {
    name: freeSolidSvgIcons.faTimes,
    theme: theme
  })) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
}

CloseTab.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  remove: PropTypes.func
};
CloseTab.defaultProps = {
  remove: function remove() {}
};

function TitleAndSelectTab(_ref2) {
  var theme = _ref2.theme,
      name = _ref2.name,
      change = _ref2.change;
  return change ? /*#__PURE__*/React__default.createElement(TabButton, {
    label: "Change to: ".concat(name),
    click: change,
    theme: theme
  }, name) : /*#__PURE__*/React__default.createElement(TabButton, {
    label: "Tab: ".concat(name),
    theme: theme
  }, name);
}

TitleAndSelectTab.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func
};
TitleAndSelectTab.defaultProps = {
  change: function change() {}
};

function Tab(_ref3) {
  var theme = _ref3.theme,
      active = _ref3.active,
      name = _ref3.name,
      id = _ref3.id,
      change = _ref3.change,
      remove = _ref3.remove;
  var InnerLi = active ? ActiveTab : InactiveTab;
  return /*#__PURE__*/React__default.createElement(InnerLi, {
    theme: theme
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(TitleAndSelectTab, {
    name: name,
    id: id,
    change: change,
    theme: theme
  }), /*#__PURE__*/React__default.createElement(CloseTab, {
    name: name,
    remove: remove,
    theme: theme
  })));
}

Tab.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  change: PropTypes.func,
  remove: PropTypes.func
};
Tab.defaultProps = {
  change: function change() {},
  remove: function remove() {}
};

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  float: left;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  margin: 1px 0px;\n  width: 24px;\n  padding: 10px 22px 10px 9px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  list-style-type: none;\n  margin: 0;\n  padding: 0 10px;\n  height: 48px;\n  overflow: hidden;\n  display: table-cell;\n  vertical-align: middle;\n  box-sizing: content-box!important;\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  background-color: ", ";\n  display: table;\n"]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = _taggedTemplateLiteral(["\n  width: 24px;\n  height: 24px;\n  overflow: hidden;\n  content: \"\";\n  /* float: left; */\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}

/** @module components/Tabs */

/**
 * @typedef {Object} Tab
 * @property {string} id - Tab React key
 * @property {string} name - Tab name
 * @property {string} content - Tab content
 * @property {string} active - Tab active
 */

/**
 * @typedef {Object} TabsProps
 * @property {Tab[]} tabs - Icon from FontAwesome
 * @property {callback} add - Icon from FontAwesome
 * @property {callback} change - Icon from FontAwesome
 * @property {callback} remove - Icon from FontAwesome
 * @property {bool} multiTabsFeature - Icon from FontAwesome
 */

var SimpleTabButton = styled(TabButton)(_templateObject$a());
var Nav = styled.nav(_templateObject2$4(), function (v) {
  return v.menuIsOpen ? 'calc(100vw - 48px)' : '100vw';
}, function (v) {
  return v.theme.tabSurface;
});
var Ul = styled.ul(_templateObject3$1());
var Li$1 = styled.li(_templateObject4());
var SimpleButtonLi = styled(Li$1)(_templateObject5());

function AddTabButton(_ref) {
  var theme = _ref.theme,
      add = _ref.add;
  return add ? /*#__PURE__*/React__default.createElement(SimpleButtonLi, null, /*#__PURE__*/React__default.createElement(SimpleTabButton, {
    onClick: add,
    onKeyUp: add,
    label: "Add tab",
    theme: theme
  }, /*#__PURE__*/React__default.createElement(Icon$1, {
    name: freeSolidSvgIcons.faPlus,
    theme: theme
  }))) : '';
}

AddTabButton.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  add: PropTypes.func
};
AddTabButton.defaultProps = {
  add: function add() {}
};
/**
 * Tabs component
 * @param {TabsProps} props
 * @example
 * <Tabs
 *   tabs={[]}
 *   add={() => addCallback()}
 *   change={id => changeCallback(id)}
 *   remove={id => removeCallback(id)}
 *   multiTabsFeature={false}
 * />
 * @returns {object} <Tabs ... />
 */

function Tabs(_ref2) {
  var tabs = _ref2.tabs,
      add = _ref2.add,
      change = _ref2.change,
      remove = _ref2.remove,
      multiTabsFeature = _ref2.multiTabsFeature,
      theme = _ref2.theme,
      menuIsOpen = _ref2.menuIsOpen;
  // console.log(add, change, remove, multiTabsFeature)
  return /*#__PURE__*/React__default.createElement(Nav, {
    theme: theme,
    menuIsOpen: menuIsOpen
  }, /*#__PURE__*/React__default.createElement(Ul, {
    theme: theme
  }, /*#__PURE__*/React__default.createElement(SimpleButtonLi, {
    id: "hamburger"
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: "/console"
  }, /*#__PURE__*/React__default.createElement(SimpleTabButton, {
    label: "Menu",
    theme: theme
  }, /*#__PURE__*/React__default.createElement(Icon$1, {
    name: freeSolidSvgIcons.faBars,
    theme: theme
  }), ' '))), tabs.map(function (tab) {
    return /*#__PURE__*/React__default.createElement(Tab, {
      active: tab.active,
      key: tab.id,
      name: tab.name,
      id: tab.id,
      theme: theme
    }) // change, remove
    ;
  }), /*#__PURE__*/React__default.createElement(AddTabButton, {
    add: add,
    theme: theme
  })));
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  add: PropTypes.func,
  change: PropTypes.func,
  remove: PropTypes.func,
  multiTabsFeature: PropTypes.bool,
  theme: PropTypes.objectOf(PropTypes.string).isRequired
};
Tabs.defaultProps = {
  add: function add() {},
  change: function change() {},
  remove: function remove() {},
  multiTabsFeature: false
};

Object.defineProperty(exports, 'FontAwesomeWrapper', {
  enumerable: true,
  get: function () {
    return reactFontawesome.FontAwesomeIcon;
  }
});
Object.defineProperty(exports, 'MonacoWrapper', {
  enumerable: true,
  get: function () {
    return react.ControlledEditor;
  }
});
exports.Button = Button;
exports.Console = Console;
exports.ConsoleLine = ConsoleLine;
exports.Docs = Docs;
exports.Editor = Editor;
exports.FloatingButton = FloatingButtonStyled;
exports.Icon = Icon$1;
exports.Link = Link;
exports.Loading = LoadingStyled;
exports.Menu = Menu;
exports.MenuItem = MenuItem$1;
exports.Tab = Tab;
exports.TabButton = TabButton;
exports.Tabs = Tabs;
//# sourceMappingURL=components.cjs.js.map
