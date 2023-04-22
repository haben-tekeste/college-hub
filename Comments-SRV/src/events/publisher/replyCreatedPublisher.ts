import { IReplyCreatedPublisher, Publisher, Subjects } from "@booki/common";

export class ReplyCreatedPublisher extends Publisher<IReplyCreatedPublisher> {
  subject: Subjects.PREPLYCREATED = Subjects.PREPLYCREATED;
}
