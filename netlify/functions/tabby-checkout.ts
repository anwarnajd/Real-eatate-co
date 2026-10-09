/**
 * Netlify Serverless Function: Tabby Checkout Session
 *
 * Route: /.netlify/functions/tabby-checkout (or /api/tabby-checkout)
 *
 * SECURITY ARCHITECTURE:
 * - TABBY_SECRET_KEY & TABBY_MERCHANT_CODE are kept strictly server-side.
 * - Never returns or leaks credentials to the browser client.
 * - Until real merchant approval & API keys are added to Netlify Environment Variables,
 *   this returns a safe, unactivated response with:
 *   "Payment option will be activated soon" / "سيتم تفعيل خيار الدفع قريباً"
 */

interface TabbyRequestBody {
  propertyId: string;
  propertyTitle: string;
  dailyPrice: number;
  days: number;
  totalAmount: number;
  checkInDate: string;
  checkOutDate: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export const handler = async (event: any) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body: TabbyRequestBody = JSON.parse(event.body || '{}');

    // Basic payload validation
    if (!body.propertyId || !body.dailyPrice || !body.days || !body.totalAmount) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Missing required booking fields (propertyId, dailyPrice, days, totalAmount)',
        }),
      };
    }

    // Verify calculated amount consistency: Total = Daily Price * Days
    const calculatedTotal = Number(body.dailyPrice) * Number(body.days);
    if (Math.abs(calculatedTotal - Number(body.totalAmount)) > 0.01) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Amount mismatch: total must equal dailyPrice multiplied by days.',
        }),
      };
    }

    // Server-side environment variables
    const secretKey = process.env.TABBY_SECRET_KEY;
    const merchantCode = process.env.TABBY_MERCHANT_CODE;
    const isSandbox = process.env.TABBY_SANDBOX === 'true';
    const baseUrl = isSandbox
      ? 'https://api.tabby.ai/api/v2'
      : 'https://api.tabby.ai/api/v2';

    // CHECK IF CREDENTIALS ARE PROVIDED
    if (!secretKey || !merchantCode) {
      // Inactive mode: Merchant account awaiting official activation
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          active: false,
          provider: 'tabby',
          messageAr: 'سيتم تفعيل خيار الدفع قريباً',
          messageEn: 'Payment option will be activated soon',
          detailsAr: 'بانتظار اكتمال تفعيل حساب التاجر المعتمد لشركة انوار نجد العقارية لدى تابي.',
          detailsEn: 'Awaiting completion of accredited merchant account activation with Tabby.',
        }),
      };
    }

    // When real credentials are configured in Netlify environment variables:
    const appUrl = process.env.APP_URL || process.env.URL || 'https://anwarnajd.sa';

    const tabbyPayload = {
      payment: {
        amount: body.totalAmount.toFixed(2),
        currency: 'SAR',
        description: `حجز إيجار يومي - ${body.propertyTitle} (${body.days} أيام)`,
        buyer: {
          phone: body.customerPhone || '+966500000000',
          email: body.customerEmail || 'booking@anwarnajd.sa',
          name: body.customerName || 'عميل انوار نجد العقارية',
        },
        shipping_address: {
          city: 'Riyadh',
          address: 'Riyadh, Saudi Arabia',
          zip: '11564',
        },
        order: {
          tax_amount: '0.00',
          shipping_amount: '0.00',
          discount_amount: '0.00',
          updated_at: new Date().toISOString(),
          reference_id: `ANW-${body.propertyId}-${Date.now()}`,
          items: [
            {
              title: body.propertyTitle,
              description: `فترة الإقامة: ${body.checkInDate} إلى ${body.checkOutDate}`,
              quantity: body.days,
              unit_price: body.dailyPrice.toFixed(2),
              reference_id: body.propertyId,
              product_url: `${appUrl}/#properties`,
              category: 'Rent',
            },
          ],
        },
      },
      lang: 'ar',
      merchant_code: merchantCode,
      merchant_urls: {
        success: `${appUrl}/payment/tabby-success`,
        cancel: `${appUrl}/payment/tabby-cancel`,
        failure: `${appUrl}/payment/tabby-failure`,
      },
    };

    const response = await fetch(`${baseUrl}/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tabbyPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          active: true,
          success: false,
          error: data.error || 'Failed to create Tabby checkout session',
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        active: true,
        success: true,
        checkoutUrl: data.configuration?.available_products?.installments?.[0]?.web_url || data.web_url,
        sessionId: data.id,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: err.message || 'Internal Server Error',
      }),
    };
  }
};
