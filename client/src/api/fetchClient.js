import dotenv from "dotenv";
dotenv.config();

//add Authorization for each request
export default async function fetchData(url, options) {
  let Authorization =
    "Bearer " + localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
  if (!options) {
    return await (
      await fetch(url, {
        headers: {
          Authorization,
        },
      })
    ).json();
  }

  return await (
    await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization,
      },
    })
  ).json();
}
