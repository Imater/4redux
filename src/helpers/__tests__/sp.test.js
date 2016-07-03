import sp from '../sp';

describe('@helpers sp', () => {
  it('should not check input arguments', () => {
    expect(() => sp()).to.throw(TypeError);
  });
  it('should split input string by `.`', () => {
    expect(sp('q.e')).to.deep.equal(['q', 'e']);
  });
  it('should return array with empty string for empty string', () => {
    expect(sp('')).to.deep.equal(['']);
  });
  it('should return array single element if no delimiter found', () => {
    expect(sp('asd')).to.deep.equal(['asd']);
  });
  it('should cache result of each call', () => {
    const input = 'some.long.selector';
    const expected = ['some', 'long', 'selector'];
    const first = sp(input);
    const second = sp(input);
    expect(first).to.deep.equal(expected);
    expect(second).to.deep.equal(expected);
    expect(first).to.equal(second);
  });
});
