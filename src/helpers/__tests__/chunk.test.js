import { expect } from 'chai';
import chunk from 'helpers/chunk';

describe('@helpers chunk', () => {
  it('chunk arrays', () => {
    const myArray = [1, 2, 3, 4, 5, 6, 7];
    expect(chunk(3)(myArray)).to.deep.equal([[1, 2, 3], [4, 5, 6], [7]]);
  });
});
