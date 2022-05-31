import {Service} from "./service";
import {TimeslotAgreement} from "./timeslot-agreement";
export {TimeslotAgreement} from "./timeslot-agreement";
export {Service} from "./service";

export class Timeslot {
  constructor(
    public id: number,
    public from: string,
    public until: string,
    public date: Date,
    public status: number,
    public is_booked: boolean,
    public timeslot_agreement: TimeslotAgreement,
    public service?: Service
  ) {}
}
