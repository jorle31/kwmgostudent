import {Service} from "./service";
export {Service} from "./service";
import {User} from "./user";
export {User} from "./user";

export class Comment {
  constructor(
    public id: number,
    public service_id: number,
    public user_id: number,
    public text: string,
    public created_at: Date,
    public user?: User
  ) {}
}
