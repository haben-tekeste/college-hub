import { Subjects, Publisher, AnswerUpvotedEvent } from "@hthub/common";

export class AnswerUpvotedPublisher extends Publisher<AnswerUpvotedEvent> {
  subject: Subjects.EventAnswerUpvoted = Subjects.EventAnswerUpvoted;
}
