import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "src", "projects-data.json");

const GH_USER = "BookCatKid";
const REPOS = [
  "TablissNG",
  "flavortui",
  "Tablytics",
  "shedulegen",
  "LLSP3-Extractor",
];
const HACKATIME_USER_ID = "23067";

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": "bookcatkid-homepage", ...opts.headers },
    ...opts,
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText} for ${url}`);
  }
  return res.json();
}

async function main() {
  const [ghUser, ...ghRepos] = await Promise.all([
    fetchJSON(`https://api.github.com/users/${GH_USER}`),
    ...REPOS.map((r) =>
      fetchJSON(`https://api.github.com/repos/${GH_USER}/${r}`),
    ),
  ]);

  const repos = {};
  for (const r of ghRepos) {
    repos[r.name] = {
      description: r.description || "",
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language || "",
      topics: r.topics || [],
      html_url: r.html_url,
    };
  }

  let hackatime = null;
  try {
    const h = await fetchJSON(
      `https://hackatime.hackclub.com/api/v1/users/${HACKATIME_USER_ID}/stats`,
    );
    if (h.data) {
      hackatime = {
        username: h.data.username,
        total_seconds: h.data.total_seconds,
        human_readable_total: h.data.human_readable_total,
        human_readable_daily_average: h.data.human_readable_daily_average,
        languages: (h.data.languages || []).map((l) => ({
          name: l.name,
          text: l.text,
          percent: l.percent,
        })),
      };
    }
  } catch (e) {
    console.warn("hackatime fetch failed:", e.message);
  }

  const data = {
    user: {
      followers: ghUser.followers,
      following: ghUser.following,
      public_repos: ghUser.public_repos,
      bio: ghUser.bio || "",
    },
    repos,
    hackatime,
  };

  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  console.log(`wrote ${DATA_FILE}`);
}

main().catch((err) => {
  console.error("fetch-data failed:", err);
  process.exit(1);
});
