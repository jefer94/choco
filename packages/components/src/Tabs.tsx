import React, { memo, ReactElement } from 'react'
import PropTypes from 'prop-types'
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons'
import Link from './Link'
// import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Tab from './Tab'
import TabButton from './TabButton'
import Icon from './Icon'
// import './Tabs.sass'
import styled from 'styled-components' // eslint-disable-line
import { Dictionary } from '@choco/types'

/** @module components/Tabs */

const SimpleTabButton = styled(TabButton)`
  width: 24px;
  height: 24px;
  overflow: hidden;
  content: "";
  /* float: left; */
`

const Nav = styled.nav`
  width: ${(v) => v.menuIsOpen ? 'calc(100vw - 48px)' : '100vw'};
  background-color: ${(v) => v.theme.tabSurface};
  display: table;
`

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 10px;
  height: 48px;
  overflow: hidden;
  display: table-cell;
  vertical-align: middle;
  box-sizing: content-box!important;
`

const Li = styled.li`
  margin: 1px 0px;
  width: 24px;
  padding: 10px 22px 10px 9px;
`

const SimpleButtonLi = styled(Li)`
  float: left;
`


/**
 * @callback AddTab
 */

/**
 * @callback ChangeTab
 */

/**
 * @callback RemoveTab
 */

/**
 * @typedef {object} AddTabButtonProps
 * @property {object} theme - Icon from theme.
 * @property {AddTab} add - Icon from FontAwesome.
 */

type AddTabButtonProps = {
  readonly theme: Dictionary
  readonly add: () => void
}

/**
 * Tab button element.
 *
 * @param {AddTabButtonProps} props - Tab button props.
 * @returns {object} Tab button element.
 */
function AddTabButton({ theme, add }: AddTabButtonProps): ReactElement {
  return add ? (
    <SimpleButtonLi>
      <SimpleTabButton onClick={add} onKeyUp={add} label="Add tab" theme={theme}>
        <Icon name={faPlus} theme={theme} />
      </SimpleTabButton>
    </SimpleButtonLi>
  ) : <></>
}
AddTabButton.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  add: PropTypes.func
}
AddTabButton.defaultProps = {
  add: () => {}
}

/**
 * @typedef {object} Tab
 * @property {string} id - Tab React key.
 * @property {string} name - Tab name.
 * @property {string} content - Tab content.
 * @property {string} active - Tab active.
 */

/**
 * @typedef {object} TabsProps
 * @property {Tab[]} tabs - Icon from FontAwesome.
 * @property {AddTab} add - Icon from FontAwesome.
 * @property {ChangeTab} change - Icon from FontAwesome.
 * @property {RemoveTab} remove - Icon from FontAwesome.
 * @property {object} theme - Icon from theme.
 * @property {boolean} menuIsOpen - Icon from menuIsOpen.
 */

type Tab = {
  readonly id: string
  readonly name: string
  readonly content: string
  readonly active: boolean
}

type Props = {
  readonly tabs: readonly Tab[]
  readonly add?: () => void
  readonly change?: () => void
  readonly remove?: () => void
  readonly theme?: Dictionary
  readonly menuIsOpen?: boolean
}

/**
 * Tabs component.
 *
 * @param {TabsProps} props - Tabs props.
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
function Tabs({ tabs, add, change, remove, theme = {}, menuIsOpen }: Props):
  ReactElement {
  // console.log(add, change, remove, multiTabsFeature)
  return (
    <Nav theme={theme} menuIsOpen={menuIsOpen}>
      <Ul theme={theme}>
        <SimpleButtonLi id="hamburger">
          <Link to="/console">
            <SimpleTabButton label="Menu" theme={theme}>
              <Icon name={faBars} theme={theme} />
              {' '}
            </SimpleTabButton>
          </Link>
        </SimpleButtonLi>
        {tabs.map((tab) => (
          <Tab
            active={tab.active}
            key={tab.id}
            name={tab.name}
            id={tab.id}
            theme={theme}
          /> // change, remove
        ))}
        <AddTabButton add={add} theme={theme} />
      </Ul>
    </Nav>
  )
}
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  add: PropTypes.func,
  change: PropTypes.func,
  remove: PropTypes.func,
  theme: PropTypes.objectOf(PropTypes.string)
}
Tabs.defaultProps = {
  add: () => {},
  change: () => {},
  remove: () => {},
  multiTabsFeature: false
}

export default Tabs
