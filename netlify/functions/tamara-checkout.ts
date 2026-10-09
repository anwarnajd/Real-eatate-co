/**
 * Netlify Serverless Function: Tamara Checkout Session
 *
 * Route: /.netlify/functions/tamara-checkout (or /api/tamara-checkout)
 *
 * SECURITY ARCHITECTURE:
 * - TAMARA_API_TOKEN & TAMARA_NOTIFICATION_TOKEN are kept strictly server-side.
 * - Never returns or leaks credentials to browser client code.
 * - Until real merchant approval & API keys are added to Netlify Environment Variables,
 *   this returns a safe, unactivated response with:
 *   "Payment option will be activated soon" / "سيتم تفعيل خيار الدفع قريباً"
 */

interface TamaraRequestBody {
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
    const body: TamaraRequestBody = JSON.parse(event.body || '{}');

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

    const apiToken = process.env.TAMARA_API_TOKEN;
    const isSandbox = process.env.TAMARA_SANDBOX === 'true';
    const baseUrl = isSandbox
      ? 'https://api-sandbox.tamara.co'
      : 'https://api.tamara.co';

    // CHECK IF CREDENTIALS ARE PROVIDED
    if (!apiToken) {
      // Inactive mode: Merchant account awaiting official activation
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          active: false,
          provider: 'tamara',
          messageAr: 'سيتم تفعيل خيار الدفع قريباً',
          messageEn: 'Payment option will be activated soon',
          detailsAr: 'بانتظار اكتمال تفعيل حساب التاجر المعتمد لشركة انوار نجد العقارية لدى تمارا.',
          detailsEn: 'Awaiting completion of accredited merchant account activation with Tamara.',
        }),
      };
    }

    const appUrl = process.env.APP_URL || process.env.URL || 'https://anwarnajd.sa';
    const orderRef = `ANW-TAMARA-${body.propertyId}-${Date.now()}`;

    const tamaraPayload = {
      order_reference_id: orderRef,
      order_number: orderRef,
      total_amount: {
        amount: body.totalAmount,
        currency: 'SAR',
      },
      description: `حجز إقامة يومية - ${body.propertyTitle} (${body.days} أيام)`,
      country_code: 'SA',
      payment_type: 'PAY_BY_INSTALMENTS',
      instalments: 3,
      consumer: {
        first_name: body.customerName ? body.customerName.split(' ')[0] : 'عميل',
        last_name: body.customerName ? body.customerName.split(' ').slice(1).join(' ') || 'العقارات' : 'انوار نجد',
        phone_number: body.customerPhone || '+966500000000',
        email: body.customerEmail || 'booking@anwarnajd.sa',
      },
      billing_address: {
        first_name: 'عميل',
        last_name: 'انوار نجد',
        line1: 'طريق الملك فهد',
        city: 'Riyadh',
        country_code: 'SA',
        phone_number: body.customerPhone || '+966500000000',
      },
      shipping_address: {
        first_name: 'عميل',
        last_name: 'انوار نجد',
        line1: 'طريق الملك فهد',
        city: 'Riyadh',
        country_code: 'SA',
        phone_number: body.customerPhone || '+966500000000',
      },
      items: [
        {
          reference_id: body.propertyId,
          type: 'Rent',
          name: body.propertyTitle,
          sku: `PROP-${body.propertyId}`,
          quantity: body.days,
          total_amount: {
            amount: body.totalAmount,
            currency: 'SAR',
          },
        },
      ],
      merchant_url: {
        success: `${appUrl}/payment/tamara-success?orderId=${orderRef}`,
        failure: `${appUrl}/payment/tamara-failure?orderId=${orderRef}`,
        cancel: `${appUrl}/payment/tamara-cancel?orderId=${orderRef}`,
        notification: `${appUrl}/.netlify/functions/tamara-webhook`,
      },
    };

    const response = await fetch(`${baseUrl}/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tamaraPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          active: true,
          success: false,
          error: data.message || 'Failed to create Tamara checkout session',
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
        checkoutUrl: data.checkout_url,
        orderId: data.order_id,
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
