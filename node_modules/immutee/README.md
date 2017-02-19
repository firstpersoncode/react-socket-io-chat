# immutee
Simple utility for changing object using dot notation string without mutate it.

## Install 
`npm install immutee --save`

## Usage

```javascript
const Immutee = require('immutee');
// import Immutee from 'immutee';

const object = {
  inner: {
    deeper: {
      deepest: "got it!"
    }
  },
  shallow: [
    {
      zero: "shallow zero"
    }, {
      one: "shallow one"
    }, {
      two: [
        "deep zero",
        [
          "deeper zero",
          "deeper one",
          "deeper two", {
            deep: {
              deepest: "It Works!"
            }
          },
        ],
      ]
    },
  ],
};

const newObject = Immutee(object)
  .set('inner.deeper.deepest', 'nice!')
  .set('shallow.0.zero', 'shallow zero modified') // Usage with array
  .set('shallow.2.two.1.1', (result) => {
    return `${result} modified`;
  })
  .merge('shallow', [{ three: 'shallow three' }])
  .delete('shallow.1') // Remove array key 1 of shallow
  .done(); // always call done() in order to return the new object

console.log(newObject);
```

It will create new object like this:
```javascript
{
  inner: {
    deeper: {
      deepest: 'nice!'
    }
  },
  shallow: [
    {
      zero: 'shallow zero modified'
    }, {
      two: [
        'deep zero',
        [
          'deeper zero',
          'deeper one modified',
          'deeper two', {
            deep: {
              deepest: 'It Works!'
            }
          },
        ],
      ]
    }, {
      three: 'shallow three'
    },
  ],
}
```

## Chainable Properties

### .set
Modify a nested property by a dot path
```javascript
// Setter
var obj = {foo: {bar: 'a'}};

var obj1 = Immutee(obj).set('foo.bar', 'b').done();
//obj1 => {foo: {bar: 'b'}}

var obj2 = Immutee(obj).set('foo.baz', 'x').done();
//obj2 => {foo: {bar: 'b', baz: 'x'}}
```
where `obj`, `obj1`, `obj2`, `obj3` all are different objects.

Use a function to modify the selected property, where first argument is the old value.

```javascript
// Setter
var obj = {foo: {bar: 'a'}};

// Setter where value is a function (get and set current value)
Immutee(obj).set('foo.bar', (v) => v + 'bc').done();
//=> {foo: {bar: 'abc'}}
```

Modify a nested array

```javascript
var obj = {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']};

// Index into array
Immutee(obj).set('foo.1', 'platin-unicorn').done();
//=> {foo: [{bar: 'gold-unicorn'}, 'platin-unicorn', 'silver-unicorn']}

Immutee(obj).set('foo.0.bar', 'platin-unicorn').done();
//=> {foo: [{bar: 'platin-unicorn'}, 'white-unicorn', 'silver-unicorn']}

// Index into array with $end
Immutee(obj).set('foo.$end', 'platin-unicorn').done();
//=> {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'platin-unicorn']}

```

### .delete

Delete a nested property/array by a dot path

```javascript
var obj = {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn', 'silver-unicorn']};

// delete
Immutee(obj).delete('foo.$end').done();
//=> {foo: [{ bar: 'gold-unicorn'}, 'white-unicorn']}

Immutee(obj).delete('foo.0.bar').done();
//=> {foo: [{}, 'white-unicorn', 'silver-unicorn']}
```

### toggle

Toggle a boolean a value by a dot path.

```javascript
var obj = {foo: { bar: true } };

// toggle
Immutee(obj).toggle('foo.bar').done();
//=> {foo: { bar: false } }
```
### merge

Merge a value by a dot path.
> The target value must be an object, array, null, or undefined.

 * If target is an object, Object.assign({}, target, param) is used.
 * If target an array, target.concat(param) is used.
 * If target is null or undefined, the value is simply set.

```javascript
var obj = {foo: { bar: {a:1, b:2 } };

// merge object
Immutee(obj).merge('foo.bar', {c:3}).done();
//=> {foo: { bar:{ a:1, b:2, c:3} } }

var arr = {foo: { bar: [1, 2] } };

// merge array
Immutee(arr).merge('foo.bar', [3, 4]).done();
//=> {foo: { bar:[1, 2, 3, 4 ] }
```
