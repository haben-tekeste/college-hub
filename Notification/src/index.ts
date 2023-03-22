import { Email } from "./mail/sender";

const email = new Email(
  "osfmvyaxz@scpulse.com",
  "ugrwztfebltjt@eurokool.com",
  "hello",
  "world"
);
try {
  email.send();
} catch (error) {
  console.log(error);
}
console.log("send email");
