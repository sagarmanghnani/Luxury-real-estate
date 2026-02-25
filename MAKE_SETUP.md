# Phase 5: Make.com Webhook Integration

To finalize the lead capture engine, we need to connect the frontend to a Make.com automation sequence. This ensures that every high-net-worth lead who fills out the Preference Quiz is immediately routed to a CRM or receives an automated WhatsApp message.

## Step 1: Create Your Webhook
1. Go to [Make.com](https://www.make.com/) and create a free account (if you haven't already).
2. Click on **Scenarios** and then **Create a new scenario**.
3. Click the massive "+" button and search for **Webhooks**.
4. Select the **Custom Webhook** trigger.
5. Click **Add**, name it something like `Luxury Realty Leads`, and click **Save**.
6. Make.com will now display a unique URL (e.g., `https://hook.us1.make.com/...`). **Copy this URL**.

## Step 2: Connect the Frontend
1. Create a `.env.local` file in the root of your project directory (`luxury-realty-engine/`).
2. Add your webhook URL to the file like this:
   ```env
   NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.us1.make.com/your-unique-id
   ```
3. Restart your development server (`pnpm run dev`) for the environment variable to take effect.

## Step 3: Define the Data Structure
1. Back in Make.com, your webhook should say "Stop" or "Successfully determined."
2. Go to your frontend application and submit a test lead through the Preference Quiz.
3. Make.com will capture the payload. Depending on their progress, it will look like this:

   **Initial Capture (Partial Lead):**
   ```json
   {
     "leadType": "partial",
     "propertySlug": "the-glass-pavilion",
     "propertyTitle": "The Glass Pavilion",
     "name": "Bruce Wayne",
     "whatsapp": "+1 234 567 8900",
     "intent": "",
     "timeline": "",
     "submittedAt": "2026-02-24T12:00:00.000Z"
   }
   ```

   **Completed Quiz (Premium Lead):**
   ```json
   {
     "leadType": "premium",
     "propertySlug": "the-glass-pavilion",
     "propertyTitle": "The Glass Pavilion",
     "name": "Bruce Wayne",
     "whatsapp": "+1 234 567 8900",
     "intent": "High-Yield Investment",
     "timeline": "Immediately",
     "submittedAt": "2026-02-24T12:00:15.000Z"
   }
   ```

## Step 4: Logic Routing (Optional)
You can use a **Router** module in Make.com to check the `leadType` property.
- If `leadType` == `partial`: Wait 1 hour. If no "premium" lead came through for the same WhatsApp number, send a gentle follow-up sequence.
- If `leadType` == `premium`: Immediately notify the sales team via Slack and send the Off-Market Dossier via WhatsApp.

## Step 4: Add the Output Action (e.g., WhatsApp or Google Sheets)
1. In your Make.com scenario, add another module next to your Webhook trigger.
2. Select **Google Sheets** (Add a Row) to log the leads, or **WhatsApp Business** to send an automated response.
3. Map the data fields from the webhook payload directly into your spreadsheet columns or message template.
4. Save the scenario, and make sure to flip the switch at the bottom left to **ON**.

You are all set! The frontend captures the intent, and Make.com acts as your silent broker routing the leads.
