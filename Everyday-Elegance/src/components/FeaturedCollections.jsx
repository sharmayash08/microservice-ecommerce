import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function FeaturedCollections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const API_BASE_URL = 'http://localhost:1337';
        const response = await fetch(`${API_BASE_URL}/api/featured-collections?populate=*`);
        if (!response.ok) throw new Error('Failed to fetch featured collections');

        const data = await response.json();
        // console.log('Strapi Response:', JSON.stringify(data, null, 2));

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Unexpected data structure from API');
        }

        setCollections(data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch collections');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCollections();
  }, []);

  console.log(collections);

  if (isLoading) {
    return (
      <div className="container mx-auto px-12 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Loading collections...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-12 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-500">Error: {error}</h2>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="container mx-auto px-12 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">No collections available</h2>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Featured Collections</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {collections.map((collection, index) => {
          {/* const { attributes } = collection; */}
          {/* console.log('Collection:', JSON.stringify(collection, null, 2)); */}

          const imageUrl = collection?.image?.[0]?.url
            ? `http://localhost:1337${collection.image[0].url}`
            : null;

          return (
            <div
              key={collection.id}
              className={`relative overflow-hidden ${
                index === 1 ? 'md:row-span-2 h-full' : 'h-60 md:h-64'
              }`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={collection?.name || 'Collection'}
                  className={`w-full object-cover rounded-md ${
                    index === 1 ? 'h-full' : 'h-full md:h-64'
                  }`}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                <h3 className="text-white font-semibold text-sm md:text-base">
                  {collection?.name || 'Unnamed Collection'}
                </h3>
                {collection?.hasMore && <ChevronRight className="text-white ml-auto" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}