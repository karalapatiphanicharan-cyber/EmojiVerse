import { useState, useMemo } from 'react';
import { getCreations, getFavorites } from '../utils/storageManager';

export const useGallery = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const creations = getCreations();
  const favorites = getFavorites();

  const filteredCreations = useMemo(() => {
    let result = [...creations];

    // Category Filter
    if (filter !== 'all') {
      if (filter === 'favorites') {
        result = result.filter(c => favorites.includes(c.id));
      } else {
        result = result.filter(c => c.type === filter);
      }
    }

    // Search Filter
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(s) ||
        (typeof c.thumbnail === 'string' && c.thumbnail.includes(search))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date);
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sort === 'alphabetical') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [creations, filter, search, sort, favorites]);

  return {
    creations: filteredCreations,
    filter,
    setFilter,
    search,
    setSearch,
    sort,
    setSort,
    favorites
  };
};
