export interface Photo {
  results: Image[];
  total_pages: number;
}

export interface Image {
  id: string;
  alt_description: string;
  created_at: Date;
  location: {
    name: string;
  };
  tags: {
    title: string;
  }[];
  urls: {
    full: string,
    small: string;
  };
  user: {
    name: string,
    profile_image: {
      small: string;
    },
    username: string,
    location: string;
  };
}
