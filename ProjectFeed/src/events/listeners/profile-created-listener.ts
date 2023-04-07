import { Listener, ProfileCreated, Subjects } from "@hthub/common";
import { Msg } from "nats";
import { Profile } from "../../model/profile";
import { queueGroupName } from "./queue-group-name";

export class ProfileCreatedListener extends Listener<ProfileCreated> {
  subject: Subjects.ProfileCreated = Subjects.ProfileCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventProfileCreated;
  durableName = "profile-created-project-feed-durable";
  streamName = "mystream";
  deliverSubject = Subjects.ProfileCreated;
  async onMessage(data: ProfileCreated["data"], msg: Msg) {
    const { concentration, major, userId, id, skills } = data;
    // check if profile already exists
    const profile = await Profile.findById(id);
    
    if (profile) throw new Error("Profile already exists");
    const newProfile = Profile.build({
      id,
      concentration,
      major,
      userId,
      skills,
    });
    await newProfile.save();
    msg.respond();
  }
}
