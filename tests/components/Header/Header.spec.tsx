import React from 'react';
import renderer from 'react-test-renderer';

import { HeaderProps, Header } from '@components/Header/Header';

describe('Header component', () => {
  test('should render component properly', () => {
    // given
    const headerProps = {
      title: 'Tile',
      links: [{ text: 'Link', link: '/' }],
    } as HeaderProps;

    // when
    const componentRenderer = renderer.create(<Header {...headerProps} />);
    const tree = componentRenderer.toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
