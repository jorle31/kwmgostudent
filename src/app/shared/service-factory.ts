import {Service} from "./service";

export class ServiceFactory {
  static empty() : Service {
    return new Service(0, 0, 0,'', '', new Date(),[{id: 0, url: '', title: ''}],[{id: 0, from: new Date(), until: new Date(), date: new Date(), is_booked: false, service_id: 0}], '');
  }

  static fromObject(rawService : any) : Service {
    return new Service(
      rawService.id,
      rawService.user_id,
      rawService.subject_id,
      rawService.title,
      rawService.description,
      typeof(rawService.created_at) === 'string' ? new Date(rawService.created_at) : rawService.created_at,
      rawService.timeslots,
      rawService.images,
      rawService.subtitle
    )
  }
}
