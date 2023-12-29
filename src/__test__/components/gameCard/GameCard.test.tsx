import React from 'react';
import GameCard from '../../../components/gameCard/GameCard';
import { describe, it, expect } from 'vitest';
import { render } from 'react-dom';

describe('GameCard', () => {
  it('should match snapshot', () => {
    const component = render(
      <GameCard
        platforms={['deck', 'xbox']}
        status="Not started"
        title="Test game card"
        image="https://images.igdb.com/igdb/image/upload/t_cover_big/co1l0v.jpg"
        genres={['Action', 'Adventure']}
        editGameHandle={() => {}}
      />,
      null,
      () => {}
    );
    expect(component).toMatchSnapshot();
  });
});
