import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const game = pgTable('game', {
  id: serial('id').primaryKey(),
  created_at: timestamp('created_at'),
  game_title: text('game_title'),
  game_description: text('game_description'),
  game_picture: text('game_picture'),
  status: text('status'),
  user_id: integer('user_id'),
});
