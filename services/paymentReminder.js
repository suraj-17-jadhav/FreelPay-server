const cron = require("node-cron");
const Invoice = require("../models/Invoice");
const sendEmail = require("../utils/sendEmail");

// Run daily at 8 AM
cron.schedule("0 8 * * *", async () => {
  try {
    const today = new Date();

    // Loop through unpaid invoices
    const invoices = await Invoice.find({
      status: { $ne: "paid" },
    }).populate("client");

    for (const invoice of invoices) {
      const dueDate = new Date(invoice.dueDate);
      const client = invoice.client;

      // Calculate days until due date
      const diffInTime = dueDate.getTime() - today.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

      // Check if reminder should be sent (3, 2, or 1 day before)
      if ([3, 2, 1].includes(diffInDays)) {
        const todayStr = today.toDateString();

        const alreadySent = invoice.reminderDatesSent.some(
          (date) => new Date(date).toDateString() === todayStr
        );

        if (!alreadySent) {
          const subject = `Upcoming Payment Reminder - Invoice ${invoice.invoiceNumber}`;
          const text = `
            Hi ${client.name},
            
            This is a friendly reminder that your invoice ${
                invoice.invoiceNumber
            } is due in ${diffInDays} day(s), on ${dueDate.toDateString()}.
            
            Total Amount: ${invoice.totalAmount}
            
            Please make your payment before the due date.
            
            Thank you,
            Smart Invoice Team
            `;

          await sendEmail(client.email, subject, text);

          // Push today's date to reminderDatesSent
          invoice.reminderDatesSent.push(today);
          await invoice.save();

          console.log(
            `Reminder sent to ${client.email} (${diffInDays} days before due)`
          );
        }
      }
    }
  } catch (error) {
    console.error("Reminder error:", error);
  }
});
