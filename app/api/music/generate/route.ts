import { respData, respErr, respJson } from "@/utils/response";
import { currentUser } from "@clerk/nextjs";
import { getSunoClient } from "@/lib/suno";
import { getUserCredits } from "@/services/order";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const headersList = headers();
  const userAgent = headersList.get("User-Agent");

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("Please Log In First");
  }

  try {
    const userEmail = user.emailAddresses[0].emailAddress;
    const userCredits = await getUserCredits(userEmail);

    if (!userCredits || userCredits.left_credits < 1) {
      return respErr("Sorry, credits not enough");
    }

    const client = await getSunoClient({ userAgent: userAgent || "" });

    const { description } = await req.json();

    if (!description || description.trim().length < 1 || description.trim().length > 1200) {
      return respJson("BIZ_INVALID_PARAMS", "Please Check Your Description");
    }

    const result = await client.generate(description);

    return respData(result);
  } catch (e: any) {
    if (e?.detail === 'Unauthorized') {
      return respJson('BIZ_UNAUTHORIZED', 'Unauthorized');
    }

    // Service Unavailable: Due to heavy usage, generations are temporarily only enabled for subscribers.
    if (e?.detail === "Insufficient credits." || e?.detail === "Service Unavailable") {
      console.log("credits: ", e);
      return respErr("Sorry for the service error, please try again later");
    }

    if (e?.detail) {
      return respErr(e.detail);
    }

    console.log("Generate music failed: ", e);

    return respErr("Generate music failed");
  }
}
