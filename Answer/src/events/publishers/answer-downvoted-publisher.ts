import { Subjects, Publisher, AnswerDownvotedEvent } from "@hthub/common";

export class AnswerDownvotedPublisher extends Publisher<AnswerDownvotedEvent> {
  subject: Subjects.EventAnswerDownvoted = Subjects.EventAnswerDownvoted;
}
