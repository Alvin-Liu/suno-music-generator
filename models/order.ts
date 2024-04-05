import { Order } from "@/types/order";
import { QueryResultRow } from "pg";
import { getDb } from "@/models/db";

const formatOrder = (row: QueryResultRow): Order => {
  const order: Order = {
    order_no: row.order_no,
    created_at: row.created_at,
    user_email: row.user_email,
    amount: row.amount,
    plan: row.plan,
    expired_at: row.expired_at,
    order_status: row.order_status,
    paied_at: row.paied_at,
    checkout_session_id: row.checkout_session_id,
    credits: row.credits,
    paid_order_id: row.paid_order_id,
  };

  return order;
}

export const insertOrder = async (order: Order) => {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO orders 
      (order_no, created_at, user_email, amount, plan, expired_at, order_status, credits) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8)
  `,
    [
      order.order_no,
      order.created_at,
      order.user_email,
      `${order.amount || 0}`,
      order.plan,
      order.expired_at,
      `${order.order_status || 0}`,
      `${order.credits || 0}`,
    ]
  );

  return res;
}

export const findOrderByOrderNo = async (
  order_no: number
): Promise<Order | undefined> => {
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM orders WHERE order_no = $1 LIMIT 1`,
    [order_no]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const order = formatOrder(row);

  return order;
}

export const updateOrderStatus = async (
  order_no: string,
  order_status: number,
  paied_at: string,
  paid_order_id: string
) => {
  const db = getDb();
  const res = await db.query(
    `UPDATE orders SET order_status=$2, paied_at=$3, paid_order_id=$4 WHERE order_no=$1`,
    [order_no, `${order_status || 0}`, paied_at, paid_order_id]
  );

  return res;
}

export const updateOrderSession = async (
  order_no: string,
  checkout_session_id: string
) => {
  const db = getDb();
  const res = await db.query(
    `UPDATE orders SET checkout_session_id=$1 WHERE order_no=$2`,
    [checkout_session_id, order_no]
  );

  return res;
}

export const getUserOrders = async (
  user_email: string
): Promise<Order[] | undefined> => {
  const now = new Date().toISOString();
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM orders WHERE user_email = $1 AND order_status = 2 AND expired_at >= $2`,
    [user_email, now]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  let orders: Order[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const order = formatOrder(row);
    orders.push(order);
  });

  return orders;
}
