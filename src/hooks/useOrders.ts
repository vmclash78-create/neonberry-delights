import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface OrderRow {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  subtotal: number;
  delivery_fee: number;
  discount_value: number;
  payment_method: string;
  status: string;
  notes: string;
  created_at: string;
}

export interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  quantity: number;
  price: number;
  details: string;
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as OrderRow[];
    },
    refetchInterval: 10000,
  });
}

export function useOrderItems(orderId: string | null) {
  return useQuery({
    queryKey: ['order_items', orderId],
    queryFn: async () => {
      if (!orderId) return [];
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);
      if (error) throw error;
      return data as OrderItemRow[];
    },
    enabled: !!orderId,
  });
}

interface CreateOrderInput {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  subtotal: number;
  delivery_fee: number;
  discount_value: number;
  total: number;
  payment_method: string;
  notes: string;
  items: { product_id?: string; name: string; quantity: number; price: number; details: string }[];
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      const { items, ...orderData } = input;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id || null,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        details: item.details,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
