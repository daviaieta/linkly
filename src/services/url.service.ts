export type Url = {
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
};

export function createUrlService() {
  return {
    async list(): Promise<Url[]> {
      return [];
    },
  };
}
