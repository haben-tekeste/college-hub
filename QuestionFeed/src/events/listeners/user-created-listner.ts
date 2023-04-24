import {
  Subjects,
  Listener,
  UserCreated,
  BadRequestError,
} from "@hthub/common";
import { Msg } from "nats";
import { User } from "../../model/user";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<UserCreated> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventUserCreated;
  durableName = "user-created-blog-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.UserCreated;
  async onMessage(data: UserCreated["data"], msg: Msg) {
    const { email, uname, id } = data;

    const user = await User.findById(id);
    if (user) throw new BadRequestError("User found");

    const newUser = User.build({
      uname,
      id,
    });
    await newUser.save();
    msg.respond();
  }
}
