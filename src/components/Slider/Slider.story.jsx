import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import stateDecorator from '../../helpers/decorators/stateDecorator.js';
import Slider from '.';

const DecoratedSlider = stateDecorator('current', 0)(Slider);
const urls = [
  'http://15858-presscdn-0-65.pagely.netdna-cdn.com/wp-content/uploads/2015/08/Kate-Upton.jpg',
  'https://pbs.twimg.com/profile_images/1155002637/hotboobs2_.jpg',
  'http://images2.fanpop.com/images/soapbox/hot-women_30217_1.jpg?cache=1254157824',
  'http://halfguarded.com/wp-content/uploads/2015/08/image7.jpg'
];
const slides = urls.map((url, index) => (
  <div
    style={{
      backgroundImage: `url(${url})`,
      height: '100%',
      width: '100%',
      backgroundSize: 'cover',
      position: 'relative'
    }}
  >
    <div style={{
      position: 'absolute',
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      fontSize: '22px',
      textShadow: '1px 1px 2px #000'
    }}>с днем рождения! {index}</div>
  </div>
));

storiesOf('Slider')
  .addWithInfo('Default without props', () => (
    <Slider />
  ))
  .addWithInfo('Default with children', () => (
    <Slider>Slider</Slider>
  ))
  .addWithInfo('Default with Hello word', () => (
    <Slider>Hello</Slider>
  ))
  .addWithInfo('Default with DecoratedSlider', () => (
    <div style={{
      height: 300,
      width: 400
    }}>
      <DecoratedSlider
        slides={slides}
      />
    </div>
  ));
