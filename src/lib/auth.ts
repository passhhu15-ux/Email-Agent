import { NextRequest } from "next/server";
export function isAuthorized(request: NextRequest) {
  const configuredPassword = process.env.DASHBOARD_PASSWORD;
  const submittedPassword = request.headers.get("x-dashboard-password");
  return Boolean(configuredPassword && submittedPassword && submittedPassword === configuredPassword);
}
