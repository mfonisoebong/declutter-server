const topSales = (orders) => {
  const cartItems = orders.flatMap((order) => order.invoice.cartItems);
  const amounts = cartItems.map((item) => item.product.price * item.quantity);
  const products = cartItems.map((item) => item.product);
  const productsCount = {};
  products.forEach((product) => {
    productsCount[product] = (productsCount[product] || 0) + 1;
  });
  const productsSales = {};
  products.forEach((product, index) => {
    productsSales[product] = (productsSales[product] || 0) + amounts[index];
  });
  const productsData = [];
  for (let i = 0; i < products.length; i++) {
    productsData.push({
      product: products[i],
      sales: productsSales[i] || 0,
    });
  }

  return productsData;
};

module.exports = {
  topSales,
};
