import {
  BadRequestError,
  IReplyUpdatedListener,
  Listener,
  Subjects,
} from "@booki/common";
import { Replay } from "@booki/common/build/events/IReply";
import { streamConfig } from "./consumerOptions";
import { Reply as ReplyModel } from "../../models/reply";
import { Msg } from "nats";

export class ReplyUpdatedListener extends Listener<IReplyUpdatedListener> {
  subject: Subjects.SREPLYUPDATED = Subjects.SREPLYUPDATED;
  deliverSubject = Subjects.SREPLYUPDATED;
  filterSubject = Subjects.PREPLYUPDATED;
  durableName = streamConfig.RUpdatedDurableName;
  queueGroupName = streamConfig.RUpdatedQueueName;
  streamName = streamConfig.StreamName;
  async onMessage(data: Replay["data"], msg: Msg) {
    const reply = await ReplyModel.findById(data.id);
    if (!reply) throw new BadRequestError("No Comment found");
    reply.likes = data.likes;

    await reply.save();
    console.log(reply);
    msg.respond();
  }
}
