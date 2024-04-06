import { getUserOrders } from "@/models/order";

import { Order } from "@/types/order";
import { UserCredits } from "@/types/user";
import { getUserMusicCount } from "@/models/music";

export const getUserCredits = async (user_email: string): Promise<UserCredits> => {
  let user_credits: UserCredits = {
    one_time_credits: 0,
    monthly_credits: 0,
    total_credits: 3,
    used_credits: 0,
    left_credits: 3,
  };

  try {
    const musicCount = await getUserMusicCount(user_email);
    // Suno generates two songs each time. 
    user_credits.used_credits = Math.ceil(musicCount / 2);

    const orders = await getUserOrders(user_email);
    if (orders) {
      orders.forEach((order: Order) => {
        if (order.plan === "monthly") {
          user_credits.monthly_credits += order.credits;
        } else {
          user_credits.one_time_credits += order.credits;
        }
        user_credits.total_credits += order.credits;
      });
    }

    user_credits.left_credits = user_credits.total_credits > user_credits.used_credits ? user_credits.total_credits - user_credits.used_credits : 0;

    return user_credits;
  } catch (e) {
    console.log("get user credits failed: ", e);
    return user_credits;
  }
}
