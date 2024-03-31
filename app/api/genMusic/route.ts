import { respData, respErr } from "@/utils/response";
import { currentUser } from "@clerk/nextjs";
import { getSunoClient } from "@/lib/suno";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("Please Log In First");
  }

  try {
    const client = await getSunoClient();

    const { description } = await req.json();

    if (!description) {
      return respErr("Please Enter Your Song Description");
    }

    const result = await client.getSongs(description)

    return respData(result);
  } catch (e: any) {
    if (e?.detail === "Insufficient credits.") {
      return respErr("Sorry, credits not enough");
    }

    console.log("Generate music failed: ", e);

    return respErr("Generate music failed");
  }
}
