import <%= camelEntityName %> from '../../src/modules/<%= camelEntityName %>'

describe('<%= camelEntityName %>', () => {
  it('should return initialState', () => {
    expect(<%= camelEntityName %>(undefined, {}).to.be.ok)
  })
})
