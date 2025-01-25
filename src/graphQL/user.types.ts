export interface User {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  location: string;
  avatar: string | null;
  post: string;
  profile_link: string;
  criteria: Array<{
    title: string;
    id: string;
    access: boolean;
  }>;
  publications_count: number;
  subscriber_counts: number;
}
