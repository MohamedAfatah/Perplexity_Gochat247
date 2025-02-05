import express from 'express';
import { searchSearxng } from '../lib/searxng';
import logger from '../utils/logger';

const router = express.Router();

// Fisher-Yates Shuffle for better randomness
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

router.get('/', async (req, res) => {
  try {
    // Default Categories
    const categories = req.query.categories
      ? (req.query.categories as string).split(',')
      : ['AI', 'Tech', 'Business', 'Finance', 'Health', 'Sports', 'Entertainment'];

    const page = parseInt(req.query.page as string, 10) || 1;

    // UAE News Sites
    const sites = [
      'gulfnews.com',
      'khaleejtimes.com',
      'thenationalnews.com',
      'arabianbusiness.com',
      'emirates247.com',
    ];

    // Generate search queries dynamically for all categories
    const searchPromises = categories.flatMap((category) =>
      sites.map((site) =>
        searchSearxng(`site:${site} ${category}`, {
          engines: ['bing news'],
          pageno: page,
        }).then((result) => ({ category, results: result.results })) // Group results by category
      )
    );

    const rawData = await Promise.all(searchPromises);

    // Organize data by category
    const categorizedData: Record<string, any[]> = {};

    rawData.forEach(({ category, results }) => {
      if (!categorizedData[category]) {
        categorizedData[category] = [];
      }

      categorizedData[category] = categorizedData[category]
        .concat(results)
        .filter((item, index, self) => self.findIndex(i => i.url === item.url) === index); // Remove duplicates
    });

    // Shuffle results within each category
    Object.keys(categorizedData).forEach((category) => {
      categorizedData[category] = shuffleArray(categorizedData[category]);
    });

    return res.json({ data: categorizedData });
  } catch (err: any) {
    logger.error(`Error in discover route: ${err.message}`, { stack: err.stack });
    return res.status(500).json({ message: 'An error has occurred', error: err.message });
  }
});

export default router;
