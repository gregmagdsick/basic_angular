describe('basic_angular e2e test', () => {
  it('should have 2 way binding', () => {
    browser.get('http://localhost:5050');
    element(by.model('hello')).sendKeys('Hey there!');
    element(by.css('h1')).getText().then((text) => {
      expect(text).toEqual('Hey there!'); // eslint-disable-line no-undef
    });
  });
});
