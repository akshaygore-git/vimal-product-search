import { instance } from "../Network/ApiCall";

export async function getInitialData(data) {
  const response = await instance.get(
    `/filterdata`
    // , {
    //   TokenID:
    //     "QzB6QkVzQXJBSzJOQVl5ME1nUzR1dz09OlF3Smw4S253SzdJNVF6UHJwNTZSaGc9PQ==",
    // }
  );
  return response.data;
}

export async function searchProduct(
  industries,
  applications,
  categories,
  productname
) {
  const params = new URLSearchParams();
  if (industries.length > 0) {
    params.append("industryIds", industries.join(","));
  }
  if (applications.length > 0) {
    params.append("applicationIds", applications.join(","));
  }
  if (categories.length > 0) {
    params.append("categoryIds", categories.join(","));
  }
  const response = await instance.get(`/?${params}`);
  return response.data;
}

export async function getApplication(industries) {
  const params = new URLSearchParams();
  if (industries.length > 0) {
    params.append("industryId", industries.join(","));
  }
  const response = await instance.get(`/application/?${params}`);
  return response.data;
}
