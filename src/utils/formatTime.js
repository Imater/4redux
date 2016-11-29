import moment from 'moment'

function formatTime(seconds) {
  if (!seconds) {
    return ''
  }
  return moment()
    .startOf('day')
    .seconds(seconds)
    .format('H ч mm м')
}

export default formatTime
