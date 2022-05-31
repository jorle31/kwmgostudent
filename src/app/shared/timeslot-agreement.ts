import {User} from "./user";
import {Timeslot} from "./timeslot";
export {User} from "./user";

export class TimeslotAgreement {
  constructor(
    public id: number,
    public accepted: boolean,
    public timeslot_id: number,
    public user_id: number,
    public user: User,
    public timeslot?: Timeslot
  ) {}
}
