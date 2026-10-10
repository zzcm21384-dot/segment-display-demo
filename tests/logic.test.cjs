const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const htmlPath = path.join(__dirname, '..', 'index.html');
let model;
test('offline HTML supplies the segment model', () => {
  assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const script = html.match(/<script id="segment-model">([\s\S]*?)<\/script>/);
  assert.ok(script, 'embedded pure model must exist');
  const context = vm.createContext({});
  vm.runInContext(script[1], context);
  model = context.SegmentModel;
  assert.ok(model);
});
const expected = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];
expected.forEach((segments, digit) => test(`digit ${digit} illuminates ${segments}`, () => {
  const mask = model.decode(String(digit));
  const lit = 'abcdefg'.split('').filter((_, bit) => mask & (1 << bit)).join('');
  assert.equal(lit, segments);
  assert.equal(model.recognize(mask), String(digit));
}));
test('reject empty, multi-digit, signed, fractional, and non-ASCII input', () => {
  for (const value of ['', '10', '-1', '1.5', 'a', ' ', ' 5', '５']) {
    assert.equal(model.validate(value), false, value);
    assert.throws(() => model.decode(value), undefined, value);
  }
});
test('decimal point preserves the recognized digit', () => {
  for (let digit = 0; digit < 10; digit++) {
    const mask = model.decode(String(digit), true);
    assert.equal(mask & 128, 128);
    assert.equal(model.recognize(mask), String(digit));
  }
});
test('polarity complements all eight output levels without changing the pattern', () => {
  for (let mask = 0; mask < 256; mask++) {
    assert.equal(model.encode(mask, 'cathode'), mask);
    assert.equal(model.encode(mask, 'anode'), 255 - mask);
  }
});
test('non-digit patterns remain custom', () => {
  assert.equal(model.recognize(0), null);
  assert.equal(model.recognize(1), null);
  assert.equal(model.recognize(128), null);
});
