import client from "@sendgrid/mail";

export class Email {
  sender: string;
  recipient: string;
  subject: string;
  content: string;

  constructor(
    sender: string,
    recipient: string,
    subject: string,
    content: string
  ) {
    this.sender = sender;
    this.recipient = recipient;
    this.subject = subject;
    this.content = content;
  }

  async send(): Promise<void> {
    client.setApiKey(
      "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"
    );
    const msg = {
      to: this.recipient, // Change to your recipient
      from: this.sender, // Change to your verified sender
      subject: this.subject,
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      templateId: "d-89c86cf77c464cd1999f682ae1b8a103"
    };

    try {
      await client.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
