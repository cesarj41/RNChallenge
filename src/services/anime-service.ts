import api from '../api/kitsu-api';
import {Anime} from '../@types';

export const getAnimeListAsync = async (
  page: number,
  filterBy?: string,
): Promise<Anime[]> => {
  let search = `/anime?page[offset]=${page}`;

  if (filterBy) {
    search += `&filter[text]=${filterBy}`;
  }
  const res = await api.get(search);

  if (res.status >= 400) {
    return [];
  }

  return res.data.data;
};
