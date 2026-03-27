import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface StoreSettingsRow {
  id: string;
  store_name: string;
  whatsapp_number: string;
  pix_key: string;
  allow_pix: boolean;
  allow_whatsapp: boolean;
  opening_time: string;
  closing_time: string;
  min_order_value: number;
  instagram: string;
  delivery_enabled: boolean;
  pickup_enabled: boolean;
}

export function useStoreSettings() {
  return useQuery({
    queryKey: ['store_settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('store_settings').select('*').limit(1).single();
      if (error) throw error;
      return data as StoreSettingsRow;
    },
  });
}

export function useUpdateStoreSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<StoreSettingsRow>) => {
      const { id, ...rest } = updates;
      const { error } = await supabase.from('store_settings').update(rest).eq('id', id!);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store_settings'] });
    },
  });
}
