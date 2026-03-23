import { mockNeighborhoods, mockCoupons } from '@/data/mock-data';
import { Coupon } from '@/types';

export function useNeighborhoods() {
  return { data: mockNeighborhoods.filter(n => n.active), isLoading: false };
}

export function useCoupons() {
  const validateCoupon = (code: string): Coupon | null => {
    const coupon = mockCoupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);
    if (!coupon) return null;
    if (new Date(coupon.expires_at) < new Date()) return null;
    return coupon;
  };
  return { validateCoupon };
}
