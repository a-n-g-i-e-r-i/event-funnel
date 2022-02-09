# Event Funnel

## Description

An Express server which receives and selectively filters webhook events from a Zoom JWT App, and then appends parsed data as a row in a Google Sheet.

### Detailed Flow

1. The user starts or joins a **`Zoom Meeting`**.
1. The **`Zoom JWT App`** triggers a **`Participant/host joined meeting`** event to be sent to the **`Event Notification Endpoint URL`**.
1. The server processes the request, checking for the correct **`Verification Token`** (if incorrect responds `status 403`) and `Even Type` (if incorrect responds `status 400`).
1. If correct, the server sends a `POST` request to the **`Google Sheets API`** to append a new row with the parsed data from the **`Participant/host joined meeting`** event.

## Development

```
git clone
npm install
touch .env .gitignore
echo ".env\nnode_modules" >> .gitignore
```

1. Create a **[Zoom JWT App](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app)** in the **Zoom App Marketplace**.

   - Add a new **[Event Subscription](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app#features)**.
   - Add a **`Event Type`** -> **`Participant/host joined meeting`**.
   - Save the **`Event Subscription`** and select **`continue`**

1. TODO Google Sheets flow
1. Update the `.env` file
   - Add the **`Zoom JWT app`** -> **`Verification Token`** as `ZOOM_VERIFICATION_TOKEN`
   - Add a `PORT` number

## Local Deployment

```
npm start
```

1. Create an HTTP tunnel for the **`Event notification endpoint URL`**
1. Save the HTTP tunnel endpoint to the **`Zoom JWT app`** -> **`Event Subscription`** -> **`Event notification endpoint URL`**.
1. Start a new **`Zoom Meeting`**.
1. A new **`Participant/host joined meeting`** event should appear in the server logs.
1. TODO Google Sheets flow
