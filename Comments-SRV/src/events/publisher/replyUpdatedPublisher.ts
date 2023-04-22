import { IReplyUpdatedPublisher, Publisher, Subjects } from "@booki/common";

export class ReplyUpdatedPublisher extends Publisher<IReplyUpdatedPublisher> {
  subject: Subjects.PREPLYUPDATED = Subjects.PREPLYUPDATED;
}
