export const fetchProductsService = async () => {
  try {
    const response = await fetch(
      "https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};
