import {
  Subjects,
  Listener,
  PUserCreated,
  BadRequestError,
} from "@hthub/common";
import { Msg } from "nats";
import { User } from "../../model/user";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<PUserCreated> {
  subject: Subjects.PUserCreated = Subjects.PUserCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventsPUserCreated;
  durableName = "user-created-project-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.PUserCreated;
  async onMessage(data: PUserCreated["data"], msg: Msg) {
    const { email, uname, id } = data;

    const user = await User.findById(id);
    if (user) throw new BadRequestError("User found");

    const newUser = User.build({
      uname,
      id,
      email
    });
    await newUser.save();
    msg.respond();
  }
}
