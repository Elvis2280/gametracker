/* eslint-disable react/react-in-jsx-scope */
import GameCard from '../../../components/gameCard/GameCard';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

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
      />
    );
    expect(component).toMatchSnapshot();
  });
});
