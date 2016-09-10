import React from 'react'
import { shallow } from 'enzyme'
import Tabs from '.'
import styles from './Tabs.styl'

const sampleTabs = [
  {
    id: 1,
    title: 'First tab'
  },
  {
    id: '2',
    title: 'Second tab'
  },
  {
    id: '3',
    title: 'Third tab'
  }
]

describe.only('@component Tabs', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Tabs />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Tabs>Tabs</Tabs>)).to.have.length(1)
  })
  it('should render titles from props', () => {
    const tabs = shallow(
      <Tabs
        tabs={sampleTabs}
      />
    )
    expect(tabs).to.have.length(1)
    expect(tabs.find(`.${styles.tabTitle}`)).to.have.length(sampleTabs.length)
  })
  it('should render content for first tab', () => {
    const renderer = activeId => <b>{activeId}</b>
    const index = 0
    const tabs = shallow(
      <Tabs
        tabs={sampleTabs}
        activeId={sampleTabs[index].id}
        renderer={renderer}
      />
    )
    expect(tabs.find('b').text()).to.be.equal(String(sampleTabs[index].id))
  })
  it('should give newActiveId on tab title click', () => {
    const renderer = activeId => <b>{activeId}</b>
    const index = 0
    const clickSpy = sinon.spy()
    const tabs = shallow(
      <Tabs
        tabs={sampleTabs}
        activeId={sampleTabs[index].id}
        renderer={renderer}
        onChange={clickSpy}
      />
    )
    tabs.find(`.${styles.tabTitle}`).at(index).simulate('click')
    expect(clickSpy.calledOnce).to.be.equal(true)
    expect(clickSpy.calledWith(sampleTabs[index].id)).to.be.equal(true)
  })
})

