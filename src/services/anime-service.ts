import api from '../api/kitsu-api';
import {Anime} from '../@types';

export const getAnimeListAsync = async (
  from: number | undefined = 0,
): Promise<Anime[]> => {
  const res = await api.get(`/anime?page[offset]=${from}`);

  if (res.status >= 400) {
    return [];
  }

  return res.data.data;
};

export const searchAnimeAsync = async (criteria: string): Promise<Anime[]> => {
  const res = await api.get(`/anime?filter[text]=${criteria}`);

  if (res.status >= 400) {
    return [];
  }

  return res.data.data;
};

// Since we are not persisting favorites in api then doind it locally
const animes = new Set<Anime>([]);

export const addAnimeToFavorites = (anime: Anime) => {
  animes.add(anime);
};

export const removeAnimeFromFavorites = (id: string) => {
  animes.forEach(anime => {
    if (anime.id === id) {
      animes.delete(anime);
    }
  });
};
