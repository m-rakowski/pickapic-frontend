export interface Image {
  imageId?: string;
  url: string;
  voters: { [key: number]: string };
}
