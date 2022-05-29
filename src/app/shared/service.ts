import { Image } from "./image";
export { Image } from "./image";
import { Comment } from "./comment";
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
    /*public comments: Comment[],*/
    public created_at: Date,
    public images: Image[],
    public timeslots: Timeslot[],
    public subtitle?: string,
  ) {
  }
}
