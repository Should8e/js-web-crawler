import { test, expect } from "@jest/globals";
import { sortReports } from "./report.js";

describe('Test sortReports', () => {
    const testCases = [
        {
            'input': {'d': 10, 'c': 12, 'e': 1, 'b': 50, 'a': 99999},
            'output': [['a', 99999], ['b', 50], ['c', 12], ['d', 10], ['e', 1]]
        },
        {
            'input': {'a': 1, 'b': 2},
            'output': [['b', 2], ['a', 1]]
        },
        {
            'input': {'x': 1},
            'output': [['x', 1]]
        }
    ];
    
    test.each(testCases)('Sort object in descending order. Return list', ({ input, output }) => {
        expect(sortReports(input)).toEqual(output);
    });
});

