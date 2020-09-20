import React, { ReactElement } from 'react'
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from './Link'
// import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Tab } from './Tab'
import { TabButton } from './TabButton'
import { Icon } from './Icon'
// import './Tabs.sass'
import styled from 'styled-components' // eslint-disable-line
import { StyledMenu } from './types'
import theme from './theme'

const SimpleTabButton = styled(TabButton)`
  width: 24px;
  height: 24px;
  overflow: hidden;
  content: "";
  /* float: left; */
`

const Nav = styled.nav`
  width: calc(100vw - 63px);
  background-color: ${theme.gray1};
  display: table;
`

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
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

type AddTabButtonProps = {
  readonly theme: Record<string, string>
  readonly add: () => void
}

/**
 * Tab button element.
 * @param props - Tab button props.
 * @returns Tab button element.
 */
function AddTabButton({ theme, add }: AddTabButtonProps): ReactElement {
  return add ? (
    <SimpleButtonLi>
      <SimpleTabButton click={add} label="Add tab" theme={theme}>
        <Icon name={faPlus} theme={theme} />
      </SimpleTabButton>
    </SimpleButtonLi>
  ) : <></>
}

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
  readonly theme?: Record<string, string>
}

/**
 * Tabs component.
 * @param props - Tabs props.
 * @example
 * ```
 * <Tabs
 *   tabs={[]}
 *   add={() => addCallback()}
 *   change={id => changeCallback(id)}
 *   remove={id => removeCallback(id)}
 *   multiTabsFeature={false}
 * />
 * ```
 * @returns Tabs component.
 */
export function Tabs({ tabs, add, change, remove, theme = {} }: Props):
  ReactElement {
  return (
    <Nav theme={theme}>
      <Ul theme={theme}>
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
