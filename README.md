# Midnight Cafe

> Your boba late-night fix.

![Epic photo of mobile landing](https://github.com/icedTet/midnightcafe/blob/main/readme-assets/hero.png?raw=true)

## Features
- 🛍️ Contactless ordering 
- 🔒 Custom User & Authentication system
    *   Password-free Authentication 
    *   Phone Number-based Authentication
- 💳 Accepts payments through Stripe API
- 📝 Order fufilment system built in!
    *   Order Tracking texts!
    *   Custom order fufilment page!
- ☁️ Fully Serverless!
## Technologies Used: 
- Next.JS
    * TypeScript
    * TailwindCSS
    * React
- Mongo.DB
- Twilio API
- Stripe API

## Setting Up Your Own Midnight Cafe
> You must have working [Stripe](https://stripe.com/), [Twillio](https://twilio.com), and [MongoDB](mongodb.com) accounts before this will work!
1. Run `git clone https://github.com/icedTet/midnightcafe.git` into a directory of your choice.
2. Enter the directory by using `cd midnightcafe/`.
3. Install all required dependencies via `yarn`.
4. Setup your enviroment with the following variables:
```
TWILIO_SID=
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
DISCORD_HOOK_1=
ADMIN_USERIDS=
```
> Please note `ADMIN_USERIDS` is a `String` of MongoDB `_id`s concatenated by spaces!
> Admins have access to the order fufilment page!
5. Run `yarn dev` to start up a local instance of your webpage~
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the page!
