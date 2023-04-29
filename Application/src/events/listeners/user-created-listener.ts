import {
  Subjects,
  Listener,
  AuserCreated,
  BadRequestError,
} from "@hthub/common";
import { Msg } from "nats";
import { User } from "../../models/user";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<AuserCreated> {
  subject: Subjects.AUserCreated = Subjects.AUserCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventAUserCreated;
  durableName = "user-created-application-srv";
  streamName = "mystream";
  deliverSubject = Subjects.AUserCreated;
  async onMessage(data: AuserCreated["data"], msg: Msg) {
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
