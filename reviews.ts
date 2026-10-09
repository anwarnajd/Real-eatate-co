import { CustomerReview } from '../types';

/**
 * Customer Reviews Registry
 * 
 * IMPORTANT: No fake reviews, names, or ratings are added.
 * As requested, this array starts empty so real client reviews can be added here as they arrive.
 * 
 * Example future review structure:
 * {
 *   id: 'rev-1',
 *   name: 'أحمد القحطاني',
 *   rating: 5,
 *   text: 'تجربة ممتازة في شراء فيلا بحي النرجس، تعامل راقٍ وشفافية عالية وسرعة في إنجاز الإجراءات.',
 *   date: '2026-09-15',
 *   roleOrCity: 'الرياض - حي النرجس',
 *   avatarUrl: '', // optional image URL
 * }
 */
export const CUSTOMER_REVIEWS: CustomerReview[] = [];
