export interface CloudinaryUploadOpt {
  format: 'string';
}

export interface IPagination {
  current: number;
  numberOfPages: number;
  next?: number;
  prev?: number;
}

export interface SearchObj {
  username: { $regex: string, $options: 'i' }
}