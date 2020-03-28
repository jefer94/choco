import React from 'react'
import PropTypes from 'prop-types'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components' // eslint-disable-line
import TabButton from './TabButton'
import Icon from './Icon'

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

function CloseTab({ theme, name, remove }) {
  return remove ? (
    <TabButton label={`Remove tab: ${name}`} click={remove} theme={theme}>
      <Icon name={faTimes} theme={theme} />
    </TabButton>
  ) : <></>
}
CloseTab.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  remove: PropTypes.func
}
CloseTab.defaultProps = {
  remove: () => {}
}

function TitleAndSelectTab({ theme, name, change }) {
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
TitleAndSelectTab.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func
}
TitleAndSelectTab.defaultProps = {
  change: () => {}
}

function Tab({ theme, active, name, id, change, remove }) {
  const InnerLi = active ? ActiveTab : InactiveTab
  return (
    <InnerLi theme={theme}>
      <div>
        <TitleAndSelectTab name={name} id={id} change={change} theme={theme} />
        <CloseTab name={name} remove={remove} theme={theme} />
      </div>
    </InnerLi>
  )
}
Tab.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  change: PropTypes.func,
  remove: PropTypes.func
}
Tab.defaultProps = {
  change: () => {},
  remove: () => {}
}

export default Tab
