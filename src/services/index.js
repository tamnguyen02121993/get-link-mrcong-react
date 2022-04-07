import { httpClient } from "../utils";

export const fetchCategories = async () => {
  const data = await httpClient.get("/categories");
  return data;
};

export const fetchPage = async (category, page) => {
  const data = await httpClient.get(`/category/${category}/page/${page}`);
  return data;
};

export const generateLink = async (link) => {
  const data = await httpClient.get(`/generate?link=${link}`);
  return data;
};
