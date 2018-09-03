var expect = require('expect');

var {generateMessage} = require('./message.js'); //.js extension is optional

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'EdR';
    var text = 'some random message';
    var message = generateMessage(from, text);
    // expect(message.from).toBe(from); //could do this
    // expect(message.text).toBe(text); //couuld do this
    expect(message).toInclude({
      from, //ES6 syntax equiv to from: from
      text  //ES6 syntax equiv to text: text
    })
    expect(typeof message.createdAt).toBe('number');
  });
});
