import {
  Subjects,
  Listener,
  BUserCreated,
  BadRequestError,
} from "@hthub/common";
import { Msg } from "nats";
import { User } from "../../models/user";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<BUserCreated> {
  subject: Subjects.BUserCreated = Subjects.BUserCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventBUserCreated;
  durableName = "user-created-blog-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.BUserCreated;
  async onMessage(data: BUserCreated["data"], msg: Msg) {
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
