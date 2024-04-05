import { Buffer } from "buffer";
import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";
import { updateOrderStatus } from "@/models/order";

export async function POST(request: Request) {
  const headersList = headers();
  const sigString = headersList.get("x-signature");

  if (!sigString) {
    console.error(`Signature header not found`);
    return NextResponse.json(
      { message: "Signature header not found" },
      { status: 401 }
    );
  }

  const hmac = crypto.createHmac('sha256', process.env.LEMONS_SQUEEZY_SIGNATURE_SECRET as string);
  const signature = Buffer.from(sigString || "", "utf8");
  const body = await rawBody(Readable.from(Buffer.from(await request.text())));
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  
  // validate signature
  if (!crypto.timingSafeEqual(digest, signature)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }

  const payload = JSON.parse(body.toString());
  const order_no = payload?.meta?.custom_data?.orderId;
  const paid_order_id = payload.data?.attributes?.order_id || payload.data?.attributes?.first_order_item?.order_id;
  const paied_at = new Date().toISOString();
  updateOrderStatus(order_no, 2, paied_at, paid_order_id);

  console.log("update success order status: ", order_no, paied_at);

  return NextResponse.json({ message: "success" }, { status: 200 });
}
