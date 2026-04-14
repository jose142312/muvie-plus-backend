const stripe = require('stripe')('sk_test_51TLdBmPLR2LzCXPQCTJENS7lCVJS9DvJ94kLVDTLudCVotydd4OQMmM7hpUtiIRXRGZBR3bpR3YU24K8bMCa1MRW00AQ1Ja0X8');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        price: 'price_1TLdKmPLR2LzCXPQVfF2pyaQ',
        quantity: 1,
      }],
      success_url: 'https://muvie-plus.com/success',
      cancel_url: 'https://muvie-plus.com/cancel',
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
