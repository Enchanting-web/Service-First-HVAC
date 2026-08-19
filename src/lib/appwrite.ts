import { Account, Client, Databases } from "appwrite";

/**
 * Appwrite browser client for the "Service First Heating and Cooling" project.
 *
 * The endpoint and project ID are public values — the web SDK is designed to
 * ship them to the browser, and access is governed by Appwrite's own
 * permissions rather than by keeping these strings secret.
 */
const client = new Client()
  .setEndpoint("https://console.enchants.me/v1")
  .setProject("6a85418f002e3a71ec1e");

const account = new Account(client);
const databases = new Databases(client);

export { account, client, databases };
