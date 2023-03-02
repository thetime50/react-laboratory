export interface PostInterface {
  isFetching: boolean;
  didInvalidate: boolean;
  items: any[]; // {title}
  lastUpdated: number;
}
export interface StoreState {
  postsBySubreddit: Record<string, PostInterface>;
  selectedSubreddit: string;
}
