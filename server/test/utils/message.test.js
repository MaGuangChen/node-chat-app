var expect = require('expect');

const { generateMessage } = require('../../utils/message');

describe('Message test case', () => {
    it('Should generate the correct message object', () => {
        const from = 'Paul', text = 'Hello World!';
        const messageObject =  generateMessage(from, text);

        expect(messageObject.createdAt).toBeA('string');
        expect(messageObject).toInclude({ from, text });
        // expect(messageObject.createdAt).toBeA('string')
        // expect(messageObject).toInclude({ from, text })
    });
})