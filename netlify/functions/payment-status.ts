/**
 * Netlify Serverless Function: Payment Gateway Status
 *
 * Route: /.netlify/functions/payment-status (or /api/payment-status)
 *
 * Checks provider activation status server-side without exposing API keys.
 */

export const handler = async (event: any) => {
  const hasTabbySecret = Boolean(process.env.TABBY_SECRET_KEY && process.env.TABBY_MERCHANT_CODE);
  const hasTamaraToken = Boolean(process.env.TAMARA_API_TOKEN);
  const rizePartnerUrl = process.env.RIZE_PARTNER_URL || process.env.VITE_RIZE_PARTNER_URL || '';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60',
    },
    body: JSON.stringify({
      tabby: {
        active: hasTabbySecret,
        provider: 'tabby',
        messageAr: hasTabbySecret ? 'مفعل' : 'سيتم تفعيل خيار الدفع قريباً',
        messageEn: hasTabbySecret ? 'Active' : 'Payment option will be activated soon',
      },
      tamara: {
        active: hasTamaraToken,
        provider: 'tamara',
        messageAr: hasTamaraToken ? 'مفعل' : 'سيتم تفعيل خيار الدفع قريباً',
        messageEn: hasTamaraToken ? 'Active' : 'Payment option will be activated soon',
      },
      rize: {
        configured: Boolean(rizePartnerUrl),
        partnerUrl: rizePartnerUrl || null,
        messageAr: Boolean(rizePartnerUrl) ? 'الرابط مفعل' : 'بانتظار تفعيل الرابط المعتمد',
        messageEn: Boolean(rizePartnerUrl) ? 'Link Configured' : 'Awaiting link activation',
      },
    }),
  };
};
