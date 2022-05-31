import {Timeslot} from "./timeslot";

export class TimeslotFactory {
  static empty() : Timeslot {
    return new Timeslot(0, '', '', new Date(), 0,false, {id: 0, accepted: false, timeslot_id: 0, user_id: 0, user: {id:0, name:'', degree: '', degree_description: '', email: '', telephone: '', is_coach: false}});
  }

  static fromObject(rawTimeslot : any) : Timeslot {
    return new Timeslot(
      rawTimeslot.id,
      rawTimeslot.from,
      rawTimeslot.until,
      rawTimeslot.date,
      rawTimeslot.status,
      rawTimeslot.is_booked,
      rawTimeslot.timeslot_agreement
    )
  }
}
