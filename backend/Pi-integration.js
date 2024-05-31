// Mock Pi Network SDK integration
const Pi = {
  createPayment: async ({ amount, memo, user }) => {
    // Mock payment creation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'payment-id',
          amount,
          memo,
          user,
          status: 'pending',
        });
      }, 1000);
    });
  }
};

const PiNetworkIntegration = {
  createPayment: async (product, userId) => {
    const amount = product.piPrice;
    const memo = `Payment for ${product.name}`;

    try {
      const payment = await Pi.createPayment({ amount, memo, user: userId });
      return payment;
    } catch (error) {
      console.error('Payment creation failed', error);
      throw error;
    }
  },
};

module.exports = PiNetworkIntegration;
