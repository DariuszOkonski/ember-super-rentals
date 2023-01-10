import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
// import ENV from 'super-rentals/config/environment';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified parameters', async function (assert) {
    await render(hbs`<Map 
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
    />`);

    await render(hbs`<Map />`);
    assert.dom('.map img').exists();
    assert.dom('.map img').hasAttribute('alt');
    assert.dom('.map img').hasAttribute('src');

    let { src } = find('.map img');
    // let token = encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);

    assert.ok(
      src.startsWith('https://api.mapbox.com/'),
      'the src starts with "https://api.mapbox.com/"'
    );
    // assert.ok(
    //   src.includes('-122.4184, 37.7797,10'),
    //   'the src should include the lng,lat,zoom parameter'
    // );

    // assert.ok(
    //   src.includes('150x120@2x'),
    //   'the src should include the width,height and @2x parameter'
    // );
  });

  test('the default alt attribute can be overridden', async function (assert) {
    await render(hbs`<Map 
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
      alt="A map of San Francisco"
    />`);

    assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
  });
});
