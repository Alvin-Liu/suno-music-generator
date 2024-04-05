export interface Order {
  order_no: string;
  created_at: string;
  user_email: string;
  amount: number;
  plan: string;
  expired_at: string;
  order_status: number;
  paied_at?: string;
  checkout_session_id?: string;
  credits: number;
  paid_order_id?: string;
}
