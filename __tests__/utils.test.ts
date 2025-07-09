import { shuffleArray } from "../src/app/lib/"
describe('shuffling array util function', () => {
  test('when passed empty array, returns emtpy array', () => {
    const testData = ['Australia', 'Japan', 'Mexico']
    const actual = shuffleArray(testData)
    expect(actual).toHaveLength(3)
  })
  test.todo('when passed array with single item, returns single item')
  test.todo('when passed array of multiple items, returns array with items shuffled')
})