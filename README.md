# Supermarket App

A modern supermarket storefront with authentication, cart, wishlist, checkout, admin management, and Firestore-backed shared data.

## Local development

1. Install dependencies: `npm install`
2. Create a `.env` file based on `.env.example`
3. Run the app: `npm run dev`

## Production deployment

This project is configured for deployment on Vercel.

### Required environment variables

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
