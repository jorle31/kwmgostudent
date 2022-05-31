import { Image } from "./image";
export { Image } from "./image";
import {Comment, User} from "./comment";
export { Comment } from "./comment";
import { Timeslot } from "./timeslot";
export { Timeslot } from "./timeslot";


export class Service {
  constructor(
    public id: number,
    public user_id: number,
    public subject_id: number,
    public title: string,
    public description: string,
    public images: Image[],
    public timeslots: Timeslot[],
    public comments: Comment[],
    public subtitle?: string,
    public user?: User,
    public created_at?: Date,
  ) {
  }
}
