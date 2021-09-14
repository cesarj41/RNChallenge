import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '../screens/Container';
import {RouteProp} from '@react-navigation/native';

export interface Anime {
  id: string;
  type: string;
  links: Links;
  attributes: Attributes;
  relationships: {[key: string]: Relationship};
}

interface Attributes {
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: number;
  titles: Titles;
  canonicalTitle: string;
  abbreviatedTitles: string[];
  averageRating: string;
  ratingFrequencies: {[key: string]: string};
  userCount: number;
  favoritesCount: number;
  startDate: Date;
  endDate: Date;
  nextRelease: null;
  popularityRank: number;
  ratingRank: number;
  ageRating: string;
  ageRatingGuide: string;
  subtype: string;
  status: string;
  tba: null;
  posterImage: PosterImage;
  coverImage?: CoverImage;
  episodeCount: number;
  episodeLength: number;
  totalLength: number;
  youtubeVideoId: string;
  showType: string;
  nsfw: boolean;
}

export interface CoverImage {
  tiny: string;
  small: string;
  large: string;
  original: string;
  meta: Meta;
}

export interface Meta {
  dimensions: Dimensions;
}

export interface Dimensions {
  tiny: Dimension;
  small: Dimension;
  large: Dimension;
  medium?: Dimension;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface PosterImage {
  tiny: string;
  small: string;
  medium: string;
  large: string;
  original: string;
  meta: Meta;
}

export interface Titles {
  en: string;
  en_jp: string;
  ja_jp: string;
}

export interface Links {
  self: string;
}

export interface Relationship {
  links: RelationshipLinks;
}

export interface RelationshipLinks {
  self: string;
  related: string;
}

export type Screens<key extends keyof Routes> = {
  navigation: NativeStackNavigationProp<Routes, key>;
  route: RouteProp<Routes, key>;
};
