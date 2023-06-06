export { fetchBreeds, fetchCatByBreed };

const MY_API_KEY =
  'live_sFfPu4oQVbOkx6QxuLNkWFUEF8SqQ5BUgNaHBlL4GfoJqhDEFiyJEey8Eci89MBL';
const options = {
  headers: {
    'x-api-key': MY_API_KEY,
  },
};

function fetchBreeds() {
  const url = `https://api.thecatapi.com/v1/breeds?`;
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  const urlId = `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breedId}`;
  return fetch(urlId, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
