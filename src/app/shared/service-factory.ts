import {Service} from "./service";

export class ServiceFactory {
  static empty() : Service {
    return new Service(0, 0, 0,'', '',[{id: 0, url: '', title: ''}],[{id: 0, from: '', until: '', date: new Date(), status: 0, is_booked: false, service_id: 0, timeslot_agreement: {id: 0, accepted: false, timeslot_id: 0, user_id: 0, user: {id:0, name:'', degree: '', degree_description: '', email: '', telephone: '', is_coach: false}}}], [{id: 0, service_id: 0, user_id: 0,text: ''}],'');
  }

  static fromObject(rawService : any) : Service {
    return new Service(
      rawService.id,
      rawService.user_id,
      rawService.subject_id,
      rawService.title,
      rawService.description,
      rawService.images,
      rawService.timeslots,
      rawService.comments,
      rawService.subtitle
    )
  }
}
