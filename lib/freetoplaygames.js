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
