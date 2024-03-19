export interface loginResponseDto {
  data: {
    token: string;
    userdata: RootObjectUserdata;
  };
}
export interface RootObjectUserdata {
  email: string;
  username: string;
}
