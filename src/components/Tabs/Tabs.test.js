import React from 'react';
import { shallow } from 'enzyme';
import Tabs from '.';
import styles from './Tabs.styl';

const renderer = active => <b>{active}</b>;

const sampleTabs = [{
  id: 1,
  title: 'First tab'
}, {
  id: 2,
  title: 'Second tab'
}];

describe('@component Tabs', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Tabs />)).to.have.length(1);
  });
  it('should render normal with children content', () => {
    expect(shallow(<Tabs>Tabs</Tabs>)).to.have.length(1);
  });
  it('should change active on click', () => {
    const clickSpy = sinon.spy();
    const tabs = shallow(
      <Tabs
        tabs={sampleTabs}
        active={1}
        onChange={clickSpy}
        renderer={renderer}
      />
    );
    tabs.find(`.${styles.tabTitle}`).at(1).simulate('click');
    console.info(clickSpy);
    expect(clickSpy.calledOnce).to.be.equal(true);
    expect(clickSpy.calledWith(2)).to.be.equal(true);
  });
});

