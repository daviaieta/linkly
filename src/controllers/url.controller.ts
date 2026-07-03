import { createUrlService } from "../services/url.service";

const urlService = createUrlService();

export async function listUrls() {
  const data = await urlService.list();
  return { data };
}
