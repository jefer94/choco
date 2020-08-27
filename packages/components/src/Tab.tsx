import React, { ReactElement } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components' // eslint-disable-line
import { Dictionary } from '@chocolab/types'
import { TabButton } from './TabButton'
import { Icon } from './Icon'
import theme from './theme'

// const styled = require('styled-component')
// console.log('aaaaaaaaa', props)

// function a(...rest) {
//   console.log('arguments', rest)
// }

const Li = styled.li`
  position: relative;
  float: left;
  text-align: center;
  padding: 13px 32px;
  /* height: 64px; */
  font-size: 16px;
  line-height: 20px;
`

const InactiveTab = styled(Li)`
  border-radius: 0;
  border-right: 2px solid ${(v) => v.theme.surface};
  border-left: 3px solid ${(v) => v.theme.tabSurface};
  background-color: ${theme.gray2};
  color: ${theme.white};
  font-size: 18px;
  line-height: 21px;
`

const ActiveTab = styled(Li)`
  /* border-left: 3px solid ${(v) => v.theme.tabHighlighter}; */
  background-color: ${theme.gray3};
  color: ${theme.white};
  font-size: 18px;
  line-height: 21px;
`
type CloseTabProps = {
  readonly theme: Record<string, string>
  readonly name: string
  readonly remove?: () => void
}

/**
 * Close tabs element.
 *
 * @param props - Close tab props.
 * @returns Close tab element.
 */
function CloseTab({ theme, name, remove }: CloseTabProps): ReactElement {
  return remove ? (
    <TabButton label={`Remove tab: ${name}`} click={remove} theme={theme}>
      <Icon name={faTimes} theme={theme} />
    </TabButton>
  ) : <></>
}

type TitleAndSelectTabProps = {
  readonly theme: Record<string, string>
  readonly name: string
  readonly change?: () => void
}

/**
 * Close tabs element.
 *
 * @param props - Close tab props.
 * @returns Close tab element.
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
 * @param props - Close tab props.
 * @returns Close tab element.
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
