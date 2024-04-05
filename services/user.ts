import { findUserByEmail, insertUser } from "@/models/user";

import { User } from "@/types/user";

export const saveUser = async (user: User) => {
  try {
    const existUser = await findUserByEmail(user.email);
    if (!existUser) {
      await insertUser(user);
    }
  } catch (e) {
    console.log("save user failed: ", e);
  }
}
