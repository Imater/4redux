import Event from '../models/event'

export default function loadEvents() {
  return new Promise((resolve, reject) => {
    Event.find({}).exec((error, events) => {
      if (error) {
        return reject(error)
      }
      return resolve(events)
    })
  })
}
