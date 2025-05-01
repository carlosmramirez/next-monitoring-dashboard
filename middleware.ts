export { default } from "next-auth/middleware";

// TODO: Use paths from paths.js (Currently not working)
export const config = {
  matcher: ["/issues/new", "/issues/:issueID/edit"],
};
