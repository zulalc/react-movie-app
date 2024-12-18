import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

export const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

//Trending All
export const fetchTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return data?.results;
};

// Details - Movies and Tv Shows
//movie/movie_id --- series/series_id

export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};

//Credits - Movies and Tv Shows
export const fetchCredits = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );
  return res?.data;
};

// Trailer - Movies & TV shows
export const fetchVideos = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
  );
  return res?.data;
};

// Browse Movies
export const fetchMovies = async (page, sortBy) => {
  const res = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

// Browse Shows
export const fetchShows = async (page, sortBy) => {
  const res = await axios.get(
    `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

//Search
export const searchData = async (query, page) => {
  const res = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  );
  //const filteredData = res?.data.filter((item) => item.media_type !== "person");
  return res?.data;
};

//fetch Person
export const fetchPerson = async (type, id) => {
  const res = await axios.get(`${baseUrl}/person/${id}?api_key=${apiKey}`);
  return res?.data;
};

//fetch movies and tv shows of person
export const fetchPersonShows = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/person/${id}/tv_credits?api_key=${apiKey}`
  );
  return res?.data;
};

export const fetchPersonMovies = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`
  );
  return res?.data;
};
