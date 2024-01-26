import cron from "node-cron";
import Task from "../models/Task.js";
import User from "../models/User.js";

// Cron Job for changing priority based on due date
const cronJobForPRiorityUpdateInTask = () => {
  // console.log("cron logic...");
  // cron job is scheduled to run every minute "* * * * *"
  cron.schedule("* * * * *", async () => {
    console.log("Cron updating priority based on due_date..");

    try {
      // Get current date
      const today = new Date();

      // Find tasks with due_date today
      const todayTasks = await Task.find({
        due_date: {
          $gte: today,
          $lt: new Date(today.setDate(today.getDate() + 1)),
        },
      });
      // console.log(`Today tasks ${todayTasks}`);

      // Update priority based on due date
      todayTasks.forEach(async (task) => {
        // console.log(`Today task ${task}`);
        task.priority = 0;
        const user = await User.findById({ _id: task.createdBy });
        user.priority = 0;
        await user.save();
        await task.save();
      });

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Find tasks with due_date between tomorrow and day after tomorrow
      const tomorrowTasks = await Task.find({
        due_date: {
          $gte: tomorrow,
          $lt: new Date(tomorrow.setDate(tomorrow.getDate() + 1)),
        },
      });

      // Update priority based on due date
      tomorrowTasks.forEach(async (task) => {
        // console.log(`Tomorrow task ${task}`);

        task.priority = 1;
        const user = await User.findById({ _id: task.createdBy });
        user.priority = 1;
        await user.save();
        await task.save();
      });

      const threeDaysLater = new Date();
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);

      // Find tasks with due_date between three and four days later
      const nearFutureTasks = await Task.find({
        due_date: {
          $gte: threeDaysLater,
          $lt: new Date(threeDaysLater.setDate(threeDaysLater.getDate() + 1)),
        },
      });

      // Update priority based on due date
      nearFutureTasks.forEach(async (task) => {
        // console.log(`Further task ${task}`);

        task.priority = 2;
        const user = await User.findById({ _id: task.createdBy });
        user.priority = 2;
        await user.save();
        await task.save();
      });

      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);

      // Find tasks with due_date after or in 5 days
      const longTermTasks = await Task.find({
        due_date: { $gte: fiveDaysLater },
      });

      // Update priority based on due date
      longTermTasks.forEach(async (task) => {
        // console.log(`Long term ${task}`);

        task.priority = 3;
        const user = await User.findById({ _id: task.createdBy });
        user.priority = 3;
        await user.save();
        await task.save();
      });

      console.log("Priority updated successfully");
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  });
};

export { cronJobForPRiorityUpdateInTask };
