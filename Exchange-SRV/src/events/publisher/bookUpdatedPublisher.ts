import { Publisher, Subjects, IQBookUpdatedPublisher } from "@booki/common";

export class QBookUpdatedPublisher extends Publisher<IQBookUpdatedPublisher> {
  subject: Subjects.PQBOOKUPDATED = Subjects.PQBOOKUPDATED;
}
