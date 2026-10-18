import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import Reviews from "./Reviews";
import AddListing from "./AddListing";
import Roommates from "./Roommates";
import PublicProfile from "./PublicProfile";
import Support from "./Support";
import Search from "./Search";
import Listing from "./Listing";

// Add each new page here. The key is the name you pass to go("...").
export const pages = {
  landing: Landing,
  login: Login,
  register: Register,
  forgot: ForgotPassword,
  admin: Admin,
  dashboard: Dashboard,
  reviews: Reviews,
  addListing: AddListing,
  roommates: Roommates,
  publicProfile: PublicProfile,
  support: Support,
  search: Search,
  listing: Listing,
};
