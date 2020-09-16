const dummy = require('../utils/list_helpers').dummy;

test('dummy works', () => {
    expect(dummy([])).toBe(1);
});