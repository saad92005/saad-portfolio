import { profile } from "@/lib/data";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

const USER = profile.github.split("/").pop()!;
// The profile README and this site itself aren't projects worth listing.
const HIDDEN = new Set([USER, "saad-portfolio"]);

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

// Public repos only (the API never returns private ones without a token).
// Returns [] on any failure so the page still renders.
export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiRepo[];
    return data
      .filter((r) => !r.fork && !r.archived && !HIDDEN.has(r.name))
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      }));
  } catch {
    return [];
  }
}
