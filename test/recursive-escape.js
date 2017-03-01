/* global describe, it */
var _escape = require('../');
var assert = require('assert');

var htmlString = 'My <span>html</span> string.';
var escapedHtmlString = 'My &lt;span&gt;html&lt;/span&gt; string.';

describe('recursive-escape', function () {
	it('should escape strings', function () {
		assert.equal(_escape(htmlString), escapedHtmlString);
		assert.equal(_escape('My clean string.'), 'My clean string.');
	});

	it('should escape objects', function () {
		assert.equal(
			_escape({
				foo: htmlString
			}).foo,
			escapedHtmlString
		);
	});

	it('should escape arrays', function () {
		assert.equal(_escape([htmlString])[0], escapedHtmlString);
	});

	it('should escape nested objects', function () {
		assert.equal(_escape({
			obj: {
				nested: htmlString
			}
		}).obj.nested, escapedHtmlString);
		assert.equal(_escape({
			obj: {
				nestedArr: [htmlString]
			}
		}).obj.nestedArr[0], escapedHtmlString);
	});

	it('should escape nested arrays', function () {
		assert.equal(_escape([
			[htmlString]
		])[0][0], escapedHtmlString);
		assert.equal(_escape([
			{foo: [htmlString]}
		])[0].foo[0], escapedHtmlString);
	});

	it('should escape objects with undefined or null values', function () {
		var e = _escape({
			myNull: null,
			myUndefined: undefined,
			foo: htmlString
		});
		assert.equal(e.myNull, null);
		assert.equal(e.myUndefined, undefined);
		assert.equal(e.foo, escapedHtmlString);
	});

	it('should escape complex objects', function () {
		var e = _escape({
			foo: 'foo',
			bar: {
				baz: 'baz',
				num: 1
			},
			empty: '',
			arr: [1, 2, htmlString],
			unsafe: htmlString,
			myNull: null,
			nested: {
				arr: [
					{
						message: htmlString
					},
					{
						message: htmlString,
						code: 2
					}
				]
			}
		});
		assert.equal(e.foo, 'foo');
		assert.equal(e.bar.baz, 'baz');
		assert.equal(e.bar.num, 1);
		assert.equal(e.empty, '');
		assert.equal(e.arr[0], 1);
		assert.equal(e.arr[2], escapedHtmlString);
		assert.equal(e.unsafe, escapedHtmlString);
		assert.equal(e.myNull, null);
		assert.equal(e.nested.arr.length, 2);
		assert.equal(e.nested.arr[0].message, escapedHtmlString);
		assert.equal(e.nested.arr[1].code, 2);
	});

	it('should not mutate the original object', function () {
		var o = { foo: htmlString };
		assert(_escape(o) !== o);
		assert.equal(_escape(o).foo, escapedHtmlString);

		var a = [htmlString];
		assert(_escape(a) !== a);
		assert.equal(_escape(a)[0], escapedHtmlString);
	});

	it('should return null or undefined when passed either', function () {
		assert.equal(_escape(), undefined);
		assert.equal(_escape(null), null);
	});
});
