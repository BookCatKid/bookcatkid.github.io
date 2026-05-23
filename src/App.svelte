<script>
    import data from "./projects-data.json";

    let lastUpdated = data.fetched;

    const birthday = { month: 3, day: 27 };
    const now = new Date();
    let age = now.getFullYear() - 2011;
    if (
        now.getMonth() < birthday.month ||
        (now.getMonth() === birthday.month && now.getDate() < birthday.day)
    ) {
        age--;
    }

    const allRepos = data.repos;
    const repoList = [
        "TablissNG",
        "flavortui",
        "Tablytics",
        "shedulegen",
        "LLSP3-Extractor",
    ];

    const featured = ["TablissNG", "flavortui"];
    const others = ["Tablytics", "shedulegen", "LLSP3-Extractor"];

    let langLines = '';
    if (data.hackatime) {
      langLines = data.hackatime.languages.slice(0, 6).map(l =>
        `    ${l.name.padEnd(14)}${l.text.padStart(9)}  (${l.percent.toFixed(1)}%)`
      ).join('\n');
    }
</script>

<div class="header">
  <h1>Simon Roff // BookCatKid</h1>
  <img src="/pfp.jpg" alt="Simon Roff" class="pfp" />
</div>

<hr />

<h2>about</h2>

<p>
    {age}-year-old high school student and Python enthusiast from San Diego. I build browser
    extensions, TUIs, web apps, mostly stuff I want to use myself. Joined <a
        href="https://hackclub.com"
        target="_blank"
        rel="noopener noreferrer">HackClub</a
    >
    early 2026.
</p>

<p>
    My biggest project for sure is my maintenance of <a
        href={allRepos.TablissNG.html_url}
        target="_blank"
        rel="noopener noreferrer">TablissNG</a
    >
    ({allRepos.TablissNG.stars} stars, <a
        href="https://tablissng.smrff.dev"
        target="_blank"
        rel="noopener noreferrer">docs</a
    >). I've been maintaing it for over a year, and
    am still enjoying it! I use
    <a
        href="https://hackatime.hackclub.com"
        target="_blank"
        rel="noopener noreferrer">Hackatime</a
    >
    to track my coding (<a
        href="https://hackatime.hackclub.com/Simon"
        target="_blank"
        rel="noopener noreferrer"
        >{data.hackatime
            ? data.hackatime.human_readable_total
            : "since 2025"}</a
    >).
</p>

<p>
    I like things that are useful, fast, and local-first. I sometimes release my
    projects, and always maintain what I ship!
</p>

<h2>tools</h2>

<p>
    Python is my thing. I ufortunately often use TypeScript as well, Svelte for
    UIs, Flask for quick backends. I build browser extensions (Chrome/Firefox),
    TUIs with Textual, and the occasional native app in Swift or C++. I have
    access to all OSs, MacOS, Windows, and Arch (btw). I like arch (endeavor
    with niri!) the most, but mostly use MacOS on my laptop.
</p>

{#if data.hackatime}
    <h2>hackatime</h2>

    <pre>  total tracked: {data.hackatime.human_readable_total}
  daily avg:     {data.hackatime.human_readable_daily_average}
    top langs:
{langLines}</pre>
{/if}

<h2>projects</h2>

<h3>featured</h3>

{#each featured as name}
    {@const r = allRepos[name]}
    <div class="project-row">
        <div class="project-info">
            <a
                class="project-link"
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {name}
            </a>
            <span class="project-desc">{r.description || 'no description set'}</span>
        </div>
        <div class="project-buttons">
            <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                <img
                    src="https://img.shields.io/github/stars/BookCatKid/{name}?style=flat&label=★&color=555"
                    alt="stars"
                />
            </a>
            <a
                class="fun-btn"
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
            >
                &raquo;
            </a>
        </div>
    </div>
{/each}

<h3>more</h3>

<ul>
    {#each others as name}
        {@const r = allRepos[name]}
        <li>
            <a href={r.html_url} target="_blank" rel="noopener noreferrer"
                >{name}</a
            >
            {r.description || 'no description set'}
        </li>
    {/each}
</ul>

<h2>links</h2>

<p>
    <a
        href="https://github.com/BookCatKid"
        target="_blank"
        rel="noopener noreferrer">github.com/BookCatKid</a
    >
    &ensp;
    <a
        href="https://flavortown.hackclub.com/users/3760"
        target="_blank"
        rel="noopener noreferrer">flavortown profile</a
    >
    &ensp;
    <a
        href="https://hackatime.hackclub.com/@BookCatKid"
        target="_blank"
        rel="noopener noreferrer">hackatime profile</a
    >
</p>



<hr />

<h2>cats</h2>

<p>I LOVE cats. I have two of them and they're the best.</p>

<p>Here are pictures of one of them:</p>

<div class="cat-grid">
  <img src="/cat1.jpeg" alt="Simon's cat" />
  <img src="/cat2.jpeg" alt="Simon's cat" />
  <img src="/cat3.jpeg" alt="Simon's cat" />
  <img src="/cat4.jpeg" alt="Simon's cat" />
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pfp {
        width: 48px;
        height: 48px;
    }

    h1 {
        font-size: 16px;
        font-weight: bold;
        color: var(--fg);
        margin: 0;
    }

    h2 {
        font-size: 14px;
        font-weight: bold;
        color: var(--accent);
        margin: 10px 0;
    }

    h3 {
        font-size: 14px;
        font-weight: bold;
        color: var(--dim);
        margin: 10px 0 4px 0;
    }

    p {
        margin: 6px 0;
    }

    pre {
        color: var(--accent);
        margin: 0;
    }

    hr {
        border: none;
        border-top: 1px solid var(--dim);
        margin: 10px 0;
    }

    ul {
        padding-left: 20px;
        margin: 6px 0;
    }

    li {
        margin-bottom: 4px;
    }

    .project-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
    }

    .project-info {
        flex: 1;
    }

    .project-desc {
        color: var(--fg);
    }

    .project-buttons {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
    }

    .project-buttons img {
        display: block;
    }

    .cat-grid {
        display: flex;
        gap: 6px;
        margin: 8px 0;
        overflow-x: auto;
    }

    .cat-grid img {
        display: block;
        height: 120px;
        width: auto;
    }

    .fun-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        font-size: 14px;
        line-height: 1;
        text-decoration: none;
        color: var(--fg);
        border: 1px solid var(--dim);
        background: var(--bg);
        transition: transform 0.3s ease;
    }

    .fun-btn:hover {
        transform: rotate(360deg);
        border-color: var(--accent);
        color: var(--accent);
    }
</style>
