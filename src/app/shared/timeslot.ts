export class Timeslot {
  constructor(
    public id: number,
    public from: Date,
    public until: Date,
    public date: Date,
    public is_booked: boolean,
    public service_id: number
  ) {}
}
