import {Comment} from "./comment";

export class CommentFactory {
  static empty() : Comment {
    return new Comment(0, 0, 0,'', new Date());
  }

  static fromObject(rawComment : any) : Comment {
    return new Comment(
      rawComment.id,
      rawComment.service_id,
      rawComment.user_id,
      rawComment.text,
      rawComment.created_at
    )
  }
}
