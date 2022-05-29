export class Comment {
  constructor(
    public service_id: number,
    public user_id: number,
    public text: string,
    public id: number,
    public created_at: Date
  ) {}
}
