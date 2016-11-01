import request from 'supertest'
import { expect } from 'chai'

describe('loadSettings', () => {
  it('test get', (done) => {
    request('http://localhost:3031')
      .get('/loadSettings')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        return done()
      })
  })
})
