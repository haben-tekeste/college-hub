import {
  Publisher,
  IBookCreatedPublisher,
  Subjects,
  IQBookCreatedPublisher,
  IEBookCreatedPublisher,
} from "@booki/common";

export class BookCreatedPublisher extends Publisher<IBookCreatedPublisher> {
  subject: Subjects.PBOOKCREATED = Subjects.PBOOKCREATED;
}

export class QBookCreatedPublisher extends Publisher<IQBookCreatedPublisher> {
  subject: Subjects.PQBOOKCREATED = Subjects.PQBOOKCREATED;
}

export class EBookCreatedPublisher extends Publisher<IEBookCreatedPublisher> {
  subject: Subjects.PEBOOKCREATED = Subjects.PEBOOKCREATED;
}
