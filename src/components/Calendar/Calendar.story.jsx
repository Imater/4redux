import React from 'react'
import storiesOf from '../../utils/storiesOf.js'
import Calendar from '.'

const holidays = {
  '01-08': {
    title: 'День рождения'
  },
  '01-29': {
    title: 'На работу'
  }
}

storiesOf('Calendar')
  .addWithInfo('Default without props', () => (
    <Calendar />
  ))
  .addWithInfo('Default with children', () => (
    <Calendar>Calendar</Calendar>
  ))
  .addWithInfo('Default with holidays', () => (
    <Calendar holidays={holidays}>Calendar</Calendar>
  ))

