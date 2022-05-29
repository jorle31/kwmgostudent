import {User} from "./user";

export class UserFactory {
  static empty() : User {
    return new User(0, '', '','', '', '', false);
  }

  static fromObject(rawUser : any) : User {
    return new User(
      rawUser.id,
      rawUser.name,
      rawUser.degree,
      rawUser.degree_description,
      rawUser.email,
      rawUser.telephone,
      rawUser.is_coach
    )
  }
}
