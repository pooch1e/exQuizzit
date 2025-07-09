import { shuffleArray } from "../src/app/lib/utils/shuffleArray"
describe('shuffling array util function', () => {
  test('when passed empty array, returns empty array', () => {
    const emptyArray : [] = [];
    const actual = shuffleArray(emptyArray)
    expect(actual).toEqual([]);
  })
  test('returns array of same length', () => {
    const testData = ['Australia', 'Japan', 'Mexico']
    const actual = shuffleArray(testData)
    expect(actual).toHaveLength(3)
  })
  test('does not mutate original array', () => {
    const testData = ['Australia', 'Japan', 'Mexico']
    const copy = [...testData]
    shuffleArray(testData)
    expect(testData).toEqual(copy);
  })
})