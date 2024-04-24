import {testFun} from '../../src/libraries/aes.algo.library'

test('test fun testing', () => {
  const result = testFun(2,3);
  expect(result).toBe(5);
});