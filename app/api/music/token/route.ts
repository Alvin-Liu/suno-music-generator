import { respData, respErr } from "@/utils/response";
import { getSunoClient } from "@/lib/suno";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const userAgent = headersList.get("User-Agent");

  try {
    const client = await getSunoClient({ userAgent: userAgent ?? "" });
    const token = await client.init();

    return respData(token);
  } catch (error: any) {
    console.error("Request failed:", error);
    return respErr("An unexpected error occurred. Please try again later.");
  }
}
