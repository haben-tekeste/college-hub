import { EUserCreatedPublisher, Publisher, Subjects } from "@booki/common";

export class ExUserCreatedPublisher extends Publisher<EUserCreatedPublisher> {
    subject: Subjects.PEUSERCREATED = Subjects.PEUSERCREATED;
  }