import { shuffleArray } from "@/app/lib/utils/shuffleArray.ts"
describe('shuffling array util function', () => {
  test('when passed empty array, returns emtpy array', () => {
    const testData = ['Australia', 'Japan', 'Mexico']
    const actual = shuffleArray(testData)
    expect(actual).toEqual()
  })
  test.todo('when passed array with single item, returns single item')
  test.todo('when passed array of multiple items, returns array with items shuffled')
})