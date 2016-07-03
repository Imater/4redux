import byPath from '../byPath';

const input = {
  some: {
    key: {
      value: true
    }
  }
};

describe('@helpers byPath', () => {
  it('should read from specified path', () => {
    const some = byPath('some');
    const key = byPath('some.key');
    const value = byPath('some.key.value');
    expect(some(input)).to.equal(input.some);
    expect(key(input)).to.equal(input.some.key);
    expect(value(input)).to.equal(input.some.key.value);
  });

  it('should cache view functions over path', () => {
    const valueLeft = byPath('some.key.value');
    const valueRight = byPath('some.key.value');
    expect(valueLeft).to.equal(valueRight);
  });
});

