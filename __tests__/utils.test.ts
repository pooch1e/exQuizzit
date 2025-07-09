import { shuffleArray } from '../src/app/lib/utils/shuffleArray';
import { decodeHTML } from '../src/app/lib/utils/decodeHTML.ts';

describe('shuffling array util function', () => {
  test('when passed empty array, returns empty array', () => {
    const emptyArray: [] = [];
    const actual = shuffleArray(emptyArray);
    expect(actual).toEqual([]);
  });

  test('returns array of same length', () => {
    const testData = ['Australia', 'Japan', 'Mexico'];
    const actual = shuffleArray(testData);
    expect(actual).toHaveLength(3);
  });

  test('does not mutate original array', () => {
    const testData = ['Australia', 'Japan', 'Mexico'];
    const copy = [...testData];
    shuffleArray(testData);
    expect(testData).toEqual(copy);
  });
});

describe('testing decode HTML util', () => {
  test('returns empty string when passed empty string', () => {
    expect(decodeHTML('')).toBe('');
  });

  test('returns quote marks when passed /&quot;/g', () => {
    expect(decodeHTML('Hello &quot;world&quot;')).toBe('Hello "world"');
  });

  test('returns single quote when passed /&#039;/g', () => {
    expect(decodeHTML('this is my &#039;test&#039;')).toBe("this is my 'test'");
  });

  test('returns ampersand when passed &amp;', () => {
    expect(decodeHTML('I love coding &amp; my friends')).toBe(
      'I love coding & my friends'
    );
  });

  test('returns < when passed &lt;', () => {
    expect(decodeHTML('this is &lt; than this')).toBe('this is < than this');
  });

  test('returns > when passed &gt;', () => {
    expect(decodeHTML('2 is &gt; than 4')).toBe('2 is > than 4');
  });
});
