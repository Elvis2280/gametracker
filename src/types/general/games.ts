export interface plaformsType {
  CreatedAt: string;
  ID: number;
  UpdatedAt: string;
  iconName: string;
  name: string;
}

export interface tagsType {
  CreatedAt: string;
  ID: number;
  UpdatedAt: string;
  name: string;
}

export interface CreateGameType {
  id?: number;
  name: string;
  description: string;
  image: string;
  status: string;
  score: number;
  tags: string[] | [];
  platforms: string[] | [];
}

export interface UpdateGameType extends CreateGameType {
  id: number;
}
