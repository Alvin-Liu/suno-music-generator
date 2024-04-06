import { respData, respErr, respJson } from "@/utils/response";
import { currentUser } from "@clerk/nextjs";
import { findMusicList } from '@/models/music';

export async function GET() {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("not login");
  }

  try {
    const email = user.emailAddresses[0].emailAddress;
    const list = await findMusicList(email);

    return respData(list);
  } catch (error: any) {
    return respErr("An unexpected error occurred. Please try again later.");
  }
}
