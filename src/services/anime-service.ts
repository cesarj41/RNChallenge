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
