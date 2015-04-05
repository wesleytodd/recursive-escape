# Recursively Escape Objects/Arrays for HTML

Install:

```
$ npm install --save recursive-escape
```

Recursivly escapes strings in objects or arrays for safe output in HTML.  The most common use case for this is to pass data from a server rendered app to the front-end.  See [recursive-unescape](https://github.com/wesleytodd/recursive-unescape) for use on the front-end when loading in the escaped data.

Usage:

```javascript
var escape = require('recursive-escape');

var obj = {
	foo: 'My unsafe <script>alert("You have been hacked!!");</script> string.',
	number: 1,
	arr: ['foo', '<h1>Hi!!</h1>'],
	obj: {
		nested: {
			bar: '<'
		}
	}
};

var e = escape(obj);

console.log(e.toJSON(e, '\t'));
/*
Output:

{
	"foo": "My unsafe &lt;script&gt;alert(&quot;You have been hacked!!&quot;);&lt;/script&gt; string.",
	"number": 1,
	"arr": [
		"foo",
		"&lt;h1&gt;Hi!!&lt;/h1&gt;"
	],
	"obj": {
		"nested": {
			"bar": "&lt;"
		}
	}
}
*/
```
