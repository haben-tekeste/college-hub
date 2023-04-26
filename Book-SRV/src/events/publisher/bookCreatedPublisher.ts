import {
  Publisher,
  IBookCreatedPublisher,
  Subjects,
  IQBookCreatedPublisher,
  ICBookCreatedPublisher,
} from "@booki/common";

export class BookCreatedPublisher extends Publisher<IBookCreatedPublisher> {
  subject: Subjects.PBOOKCREATED = Subjects.PBOOKCREATED;
}

export class QBookCreatedPublisher extends Publisher<IQBookCreatedPublisher> {
  subject: Subjects.PQBOOKCREATED = Subjects.PQBOOKCREATED;
}

export class CBookCreatedPublisher extends Publisher<ICBookCreatedPublisher> {
  subject: Subjects.PCBOOKCREATED = Subjects.PCBOOKCREATED;
}
