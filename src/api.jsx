
export async function makeApiRequest(searchQuery) {
  try {
    const response = await fetch('https://green-alternative-server-26a7dd482e32.herokuapp.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchQuery: searchQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((item) => ({
      title: item.title || "Unknown Product",
      image: item.thumbnail || "",
      price: item.price,
      rating: item.rating || 0,
      reviews: item.reviews || 0,
      link: item.product_link || "",
      snippet: item.snippet || "",
      id: item.product_id,
    }));
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}
