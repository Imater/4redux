import Event from '../models/event'

export default function loadEvents({ method, body, query }) {
  if (method === 'GET') {
    return new Promise((resolve, reject) => {
      Event.find({}).limit(1).exec((error, events) => {
        if (error) {
          return reject(error)
        }
        return resolve(events)
      })
    })
  }
  if (method === 'POST') {
    return new Promise((resolve, reject) => {
      Event.findOrCreate(body, (error, event) => {
        if (error) {
          return reject(error)
        }
        return resolve(event)
      })
    })
  }
  if (method === 'PUT') {
    return new Promise((resolve, reject) => {
      Event.update({
        _id: body.id
      }, body, (error, event) => {
        if (error) {
          return reject(error)
        }
        return resolve(event)
      })
    })
  }
  if (method === 'DELETE') {
    return new Promise((resolve, reject) => {
      Event.remove({
        _id: query.id
      }, (error, event) => {
        if (error) {
          return reject(error)
        }
        return resolve(event)
      })
    })
  }
  return new Promise().reject('not implemented')
}
