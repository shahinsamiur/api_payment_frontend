export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  fileBaseUrl: process.env.NEXT_PUBLIC_API_FILE_URL,
  dataLimit: process.env.NEXT_PUBLIC_DATA_LIMIT,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  apiKey:
    process.env.NEXT_PUBLIC_API_KEY ||
    "wNYxWEWlkHN6Rz42yJxaMQbzA8d4Rsmyuwa/3N202mU=",
  liveSupportApiBaseUrl: process.env.NEXT_PUBLIC_LIVE_SUPPORT_API_BASE_URL,
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL,
  liveSupportServerUrl: process.env.NEXT_PUBLIC_LIVE_SUPPORT_SERVER_URL,
  paymentPageUrl: process.env.NEXT_PUBLIC_SITE_URL + "/payment",
  geolocationApiKey: process.env.GEOLOCATION_API_KEY,
  authSecret: process.env.NEXTAUTH_SECRET,
};
