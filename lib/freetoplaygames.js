export async function getLatestGames() {
  const LATEST_GAMES = "https://www.freetogame.com/api/games";

  const rawData = await fetch(LATEST_GAMES);
  const json = await rawData.json(); // ← this is already an array

  return json.map((item) => {
    const {
      id,
      title,
      thumbnail,
      short_description,
      game_url,
      genre,
      platform,
      publisher,
      developer,
      release_date,
    } = item;

    return {
      id,
      title,
      description: short_description,
      image: thumbnail,
      url: game_url,
      genre,
      platform,
      publisher,
      developer,
      releaseDate: release_date,
    };
  });
}

export async function getGameDetails(id) {
  const GAME_DETAILS = `https://www.freetogame.com/api/game?id=${id}`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  return {
    id: json.id,
    title: json.title,
    description: json.description,
    image: json.thumbnail,
    url: json.game_url,
    genre: json.genre,
    platform: json.platform,
    publisher: json.publisher,
    developer: json.developer,
    releaseDate: json.release_date,
  };
}
