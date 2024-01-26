import Twilio from "twilio";
import cron from "node-cron";
import User from "../models/User.js";
import Task from "../models/Task.js";

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// cron job for calling users based on the priority of users.
const twilioCallCronLogic = () => {
  const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

  // Cron Job for voice calling using Twilio runs every minute.
  cron.schedule("* * * * *", async () => {
    try {
      // getting users and sorting them in ascending order based on there priority iin user model.
      const users = await User.find().sort({ priority: 1 });
      // Traversing all users one by one and calling them based on priority and status.
      // If user picks the call then calling other user.
      for (const user of users) {
        const tasks = await Task.find({
          createdBy: user._id,
          status: "TODO",
        });
        // Will call users if there are any tasks due  based on priority.
        if (tasks.length > 0) {
          // Voice call logic using Twilio
          const message = `This is reminder call, please complete the pending tasks!`;
          console.log(`Calling ${user.name} with id ${user._id}...`);
          await twilioClient.calls.create({
            to: `+91${user.phone}`,
            from: +15109841571,
            twiml: `<Response><Say>${message}</Say></Response>`,
          });

          console.log(`Voice call sent to user ${user._id}`);
          break; 
        } else {
          console.log("there are no users with due_date tasks!!");
        }
      }
    } catch (error) {
      console.error("Error making Twilio voice call:", error);
    }
  });
};

export { twilioCallCronLogic };
