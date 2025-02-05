'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

interface DiscoverItem {
  title: string;
  content: string;
  url: string;
  thumbnail: string;
}

interface DiscoverData {
  [category: string]: DiscoverItem[];
}

const Page = () => {
  const [discover, setDiscover] = useState<DiscoverData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discover`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        // Filter out items without thumbnails
        Object.keys(data.data).forEach((category) => {
          data.data[category] = data.data[category].filter((item: DiscoverItem) => item.thumbnail);
        });

        setDiscover(data.data);
        setCurrentCategory(Object.keys(data.data)[0]); // Set the first category as default
      } catch (err: any) {
        console.error('Error fetching data:', err.message);
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      {/* Loading spinner */}
    </div>
  ) : (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Search />
        <h1 className="text-3xl font-medium p-2">Discover</h1>
      </div>
      <hr className="border-t border-[#2B2C2C] my-4 w-full" />

      <div className="flex mb-4 space-x-4">
        {discover && Object.keys(discover).map((category) => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`px-4 py-2 ${currentCategory === category ? 'bg-gray-200' : 'bg-gray-100'} rounded`}
          >
            {/* Replace with your icon component */}
            <span role="img" aria-label={category}>📁</span>
            {category}
          </button>
        ))}
      </div>

      {currentCategory && discover && discover[currentCategory] &&
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {discover[currentCategory].map((item, i) => (
            <Link
              href={`/?q=Summary: ${item.url}`}
              key={i}
              className="max-w-sm rounded-lg overflow-hidden bg-light-secondary dark:bg-dark-secondary hover:-translate-y-[1px] transition duration-200"
              target="_blank"
            >
              <img
                className="object-cover w-full aspect-video"
                src={
                  new URL(item.thumbnail).origin +
                  new URL(item.thumbnail).pathname +
                  `?id=${new URL(item.thumbnail).searchParams.get('id')}`
                }
                alt={item.title}
              />
              <div className="px-4 py-3">
                <div className="font-bold text-lg mb-1 truncate">
                  {item.title.slice(0, 100)}...
                </div>
                <p className="text-black-70 dark:text-white/70 text-sm">
                  {item.content.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  );
};

export default Page;