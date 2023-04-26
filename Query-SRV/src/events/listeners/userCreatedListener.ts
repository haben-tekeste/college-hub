import { IUserCreatedListener, Listener, Subjects } from "@booki/common";
import { User } from "@booki/common/build/events/IUser";
import { Msg } from "nats";
import { User as UserModel } from "../../models/user";
import { streamConfig } from "./consumerOptions";

export class UserCreatedListener extends Listener<IUserCreatedListener> {
  subject: Subjects.SUSERCREATED = Subjects.SUSERCREATED;
  deliverSubject = Subjects.SUSERCREATED;
  durableName = streamConfig.UCreatedDurableName;
  filterSubject = Subjects.PUSERCREATED;
  streamName = streamConfig.StreamName;
  queueGroupName = streamConfig.UCreatedQueueName;
  async onMessage(data: User["data"], msg: Msg) {
    const user = UserModel.build({
      interests: [],
      name: data.uname,
      email: data.email,
      id: data.id,
      avatar: undefined,
    });
    await user.save();

    console.log(user);
    msg.respond();
  }
}
