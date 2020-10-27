/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { assert, expect } from 'chai';
import { deepCopy, deepExtend } from '../src/deepCopy';

describe('deepCopy()', () => {
  it('Scalars', () => {
    expect(deepCopy(true)).to.equal(true);
    expect(deepCopy(123)).to.equal(123);
    expect(deepCopy('abc')).to.equal('abc');
  });

  it('Date', () => {
    const d = new Date();
    assert.deepEqual(deepCopy(d), d);
  });

  it('Object', () => {
    assert.deepEqual(deepCopy({}), {});
    assert.deepEqual(deepCopy({ a: 123 }), { a: 123 });
    assert.deepEqual(deepCopy({ a: { b: 123 } }), { a: { b: 123 } });
  });

  it('Array', () => {
    assert.deepEqual(deepCopy([]), []);
    assert.deepEqual(deepCopy([123, 456]), [123, 456]);
    assert.deepEqual(deepCopy([123, [456]]), [123, [456]]);
  });
});

describe('deepExtend', () => {
  it('Scalars', () => {
    assert.strictEqual(deepExtend(1, true), true);
    assert.strictEqual(deepExtend(undefined, 123), 123);
    assert.strictEqual(deepExtend('was', 'abc'), 'abc');
  });

  it('Date', () => {
    const d = new Date();
    assert.deepEqual(deepExtend(new Date(), d), d);
  });

  it('Object', () => {
    assert.deepEqual(deepExtend({ old: 123 }, {}), { old: 123 });
    assert.deepEqual(deepExtend({ old: 123 }, { s: 'hello' }), {
      old: 123,
      s: 'hello'
    });
    assert.deepEqual(
      deepExtend({ old: 123, a: { c: 'in-old' } }, { a: { b: 123 } }),
      { old: 123, a: { b: 123, c: 'in-old' } }
    );
  });

  it('Array', () => {
    assert.deepEqual(deepExtend([1], []), []);
    assert.deepEqual(deepExtend([1], [123, 456]), [123, 456]);
    assert.deepEqual(deepExtend([1], [123, [456]]), [123, [456]]);
  });

  it('Array is copied - not referenced', () => {
    const o1 = { a: [1] };
    const o2 = { a: [2] };

    assert.deepEqual(deepExtend(o1, o2), { a: [2] });
    o2.a.push(3);
    assert.deepEqual(o1, { a: [2] });
  });

  it('Array with undefined elements', () => {
    const a: any = [];
    a[3] = '3';
    const b = deepExtend(undefined, a);
    assert.deepEqual(b, [, , , '3']);
  });

  it('Function', () => {
    const source: any = (): void => {
      /*_*/
    };
    const target: any = deepExtend(
      {
        a: () => {
          /*_*/
        }
      },
      { a: source }
    );
    assert.deepEqual({ a: source }, target);
    assert.strictEqual(source, target.a);
  });

  it.only('does not extend property __proto__', () => {
    const src = JSON.parse('{ "__proto__": { "polluted": "polluted" } }');
    const a = {};
    deepExtend(a, src);

    // @ts-expect-error
    expect(a.__proto__).to.equal(Object.prototype);

    // @ts-expect-error
    expect(a.polluted).to.be.undefined;
  });
});
