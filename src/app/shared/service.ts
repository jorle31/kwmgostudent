import { Image } from "./image";
export { Image } from "./image";
import { Comment } from "./comment";
export { Comment } from "./comment";

export class Service {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    /*public creator: User[],
    public subject: Subject[],
    public timeslots: Timeslot[],*/
    public images: Image[],
    public comments: Comment[],
    public published: Date,
    public subtitle?: string,
  ) {
  }
}
