// const shuffle = require("../src/shuffle");

// describe("shuffle should...", () => {
//   // CODE HERE


// });


const shuffle = require('../src/shuffle');

describe('shuffle function', () => {
  // Test to check if shuffle returns an array
  test('should return an array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(inputArray);
    expect(Array.isArray(shuffledArray)).toBe(true);
  });

  // Test to check if shuffle returns an array of the same length as the input array
  test('should return an array of the same length as the input array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(inputArray);
    expect(shuffledArray).toHaveLength(inputArray.length);
  });

  // Add more tests based on the ideas provided in the prompt
  // Test to check if all the same items are in the array
  test('should contain all the same items as the input array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(inputArray);
    expect(shuffledArray.sort()).toEqual(inputArray.sort());
  });

  // Test to check if the items have been shuffled around
  test('should not be in the same order as the input array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(inputArray);
    expect(shuffledArray).not.toEqual(inputArray);
  });
});