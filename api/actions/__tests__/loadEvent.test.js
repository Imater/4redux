import request from 'supertest'
import { expect } from 'chai'

describe('loadEvents', () => {
  it('test get', (done) => {
    request('http://localhost:3031')
      .get('/loadEvents')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        return done()
      })
  })
  it('create Event', (done) => {
    request('http://localhost:3031')
      .post('/loadEvents')
      .send({
        title: 'Hello, i am from test second time',
        repeat: 'YEARLY'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        return done()
      })
  })
})
