import { UmbracoDropdown } from "../src/umbraco-dropdown";
import { assert } from '@open-wc/testing';

suite('umbraco-dropdown element', () => {
  test('dropdown element is defined', () => {
    const element = document.createElement('umbraco-dropdown');
    assert.instanceOf(element, UmbracoDropdown);
  });
});