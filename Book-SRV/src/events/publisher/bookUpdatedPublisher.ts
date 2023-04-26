import {
  Publisher,
  IBookUpdatedPublisher,
  Subjects,
  IQBookUpdatedPublisher,
} from "@booki/common";

export class BookUpdatedPublisher extends Publisher<IBookUpdatedPublisher> {
  subject: Subjects.PBOOKUPDATED = Subjects.PBOOKUPDATED;
}

export class QBookUpdatedPublisher extends Publisher<IQBookUpdatedPublisher> {
  subject: Subjects.PQBOOKUPDATED = Subjects.PQBOOKUPDATED;
}
