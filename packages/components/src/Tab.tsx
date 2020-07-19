import React, { ReactElement } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components' // eslint-disable-line
import { Dictionary } from '@choco/types'
import { TabButton } from './TabButton'
import { Icon } from './Icon'

// const styled = require('styled-component')
// console.log('aaaaaaaaa', props)

// function a(...rest) {
//   console.log('arguments', rest)
// }

const Li = styled.li`
  position: relative;
  float: left;
  width: 100px;
  text-align: center;
  border-radius: 3px 3px 0px 0px;
  padding: 11px 50px;
  font-size: 16px;
  margin-top: 6px;
  line-height: 20px;
`

const InactiveTab = styled(Li)`
  border-radius: 0;
  border-right: 2px solid ${(v) => v.theme.surface};
  border-left: 3px solid ${(v) => v.theme.tabSurface};
  background-color: ${(v) => v.theme.tabSurface};
  color: ${(v) => v.theme.tabTextOpaque};
`

const ActiveTab = styled(Li)`
  border-left: 3px solid ${(v) => v.theme.tabHighlighter};
  background-color: ${(v) => v.theme.surface};
  color: ${(v) => v.theme.white};
`

/**
 * @callback TabRemove
 */

/**
 * @typedef {object} CloseTabProps
 * @property {object} theme - Close tab theme.
 * @property {string} name - Close tab name.
 * @property {TabRemove} remove - Close tab remove.
 */

type CloseTabProps = {
  readonly theme: Record<string, string>
  readonly name: string
  readonly remove?: () => void
}

/**
 * Close tabs element.
 *
 * @param {CloseTabProps} props - Close tab props.
 * @returns {object} Close tab element.
 */
function CloseTab({ theme, name, remove }: CloseTabProps): ReactElement {
  return remove ? (
    <TabButton label={`Remove tab: ${name}`} click={remove} theme={theme}>
      <Icon name={faTimes} theme={theme} />
    </TabButton>
  ) : <></>
}

/**
 * @callback TabChange
 */

/**
 * @typedef {object} TitleAndSelectTabProps
 * @property {object} theme - Title and select tab theme.
 * @property {string} name - Title and select tab name.
 * @property {TabChange} change - Title and select tab change.
 */

type TitleAndSelectTabProps = {
  readonly theme: Record<string, string>
  readonly name: string
  readonly change?: () => void
}

/**
 * Close tabs element.
 *
 * @param {TitleAndSelectTabProps} props - Close tab props.
 * @returns {object} Close tab element.
 */
function TitleAndSelectTab({ theme, name, change }: TitleAndSelectTabProps): ReactElement {
  return change ? (
    <TabButton label={`Change to: ${name}`} click={change} theme={theme}>
      {name}
    </TabButton>
  ) : (
    <TabButton label={`Tab: ${name}`} theme={theme}>
      {name}
    </TabButton>
  )
}

/**
 * @typedef {object} TabProps
 * @property {object} theme - Tab theme.
 * @property {boolean} active - Tab name.
 * @property {string} name - Tab name.
 * @property {string} id - Tab id.
 * @property {TabChange} change - Tab change.
 * @property {TabRemove} remove - Tab remove.
 */

type TabProps = {
  readonly theme: Dictionary
  readonly active: boolean
  readonly name: string
  readonly id: string
  readonly change?: () => void
  readonly remove?: () => void
}

/**
 * Close tabs element.
 *
 * @param {TabProps} props - Close tab props.
 * @returns {object} Close tab element.
 */
export function Tab({ theme, active, name, id, change, remove }: TabProps): ReactElement {
  const InnerLi = active ? ActiveTab : InactiveTab
  return (
    <InnerLi theme={theme}>
      <div>
        {/* <TitleAndSelectTab name={name} id={id} change={change} theme={theme} /> */}
        <TitleAndSelectTab name={name} change={change} theme={theme} />
        <CloseTab name={name} remove={remove} theme={theme} />
      </div>
    </InnerLi>
  )
}
