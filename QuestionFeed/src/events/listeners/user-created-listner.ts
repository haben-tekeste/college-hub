import {
  Subjects,
  Listener,
  QUserCreated,
  BadRequestError,
} from "@hthub/common";
import { Msg } from "nats";
import { User } from "../../model/user";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<QUserCreated> {
  subject: Subjects.QUserCreated = Subjects.QUserCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventQUserCreated;
  durableName = "user-created-question-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.QUserCreated;
  async onMessage(data: QUserCreated["data"], msg: Msg) {
    const { email, uname, id } = data;

    const user = await User.findById(id);
    if (user) throw new BadRequestError("User found");

    const newUser = User.build({
      uname,
      id,
      email,
    });
    await newUser.save();
    msg.respond();
  }
}
