# Event Funnel

[![HitCount](http://hits.dwyl.com/a-n-g-i-e-r-i/event-funnel.svg?style=flat)](http://hits.dwyl.com/a-n-g-i-e-r-i/event-funnel)

## Description

An Express server which receives and selectively filters webhook events from a Zoom JWT App, and then appends parsed data as a row in a Google Sheet.

### Detailed Flow

1. The user starts or joins a **`Zoom Meeting`**.
1. The **`Zoom JWT App`** triggers a **`Participant/host joined meeting`** event to be sent to the **`Event Notification Endpoint URL`**.
1. The server processes the request, checking for the correct **`Verification Token`** (if incorrect responds `status 403`) and `Even Type` (if incorrect responds `status 400`).
1. If correct, the server sends a `POST` request to the **`Google Sheets API`** to append a new row with the parsed data from the **`Participant/host joined meeting`** event.

#### Sample Zoom request body for a **`Participant/host joined meeting`** event:

```js
{
  event: "meeting.participant_joined",
  event_ts: 12345678909876,
  payload: {
    account_id: "JD93jDHs93jSHdf93jdh59F",
    object: {
      duration: 60,
      host_id: "PB_MIWRiRdmK5F9vq2WfTw",
      id: "93948372645",
      participant: {
        email: "user@email.com",
        id: "PB_MIWRiRdmK5F9vq2WfTw",
        join_time: "2022-02-11T16:20:30Z",
        participant_user_id: "PB_MIWRiRdmK5F9vq2WfTw",
        registrant_id: null,
        user_id: "98473682",
        user_name: "Sally Fields"
      },
      start_time: "2022-02-11T14:07:13Z",
      timezone: "America/New_York",
      topic: "Meeting of the Minds",
      type: 3,
      uuid: "O5Xfz96WRYiRnCz7yA4UzY=="
    }
  }
}
```

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
