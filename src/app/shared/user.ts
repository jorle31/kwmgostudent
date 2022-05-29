export class User {
  constructor(
    public id: number,
    public name: string,
    public degree: string,
    public degree_description: string,
    public email: string,
    public telephone: string,
    public is_coach: boolean
  ) {}
}
