import NewsImage from "./components/NewsImage";
import axios from "axios";

interface Source {
  id: string | null;
  name: string;
}

interface NewsArticle {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const categories = [
  "general",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

async function getNews(category: string = "general") {
  try {
    const config = {
      params: {
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        pageSize: 50,
        language: "en",
        category,
      },
    };
    console.log("API Key being used:", process.env.NEXT_PUBLIC_NEWS_API_KEY);
    console.log("Request config:", config);
    
    const response = await axios.get("https://newsapi.org/v2/top-headlines", config);
    return response.data.articles as NewsArticle[];
  } catch (error: any) {
    console.error("Error fetching news:", error.response?.data || error.message);
    return [] as NewsArticle[];
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = (await searchParams).category || "general";
  const news = await getNews(category);

  return (
    <main className="min-h-screen max-w-[1200px] mx-auto px-4 py-8 md:px-6 lg:px-8">
      <header className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-clip-text">
          World News <span className="text-[var(--accent)] relative">Today
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--accent)]/30"></span>
          </span>
        </h1>
        <p className="mb-8 text-base text-[var(--muted)] max-w-2xl mx-auto">
          Stay informed with the latest breaking news and stories from around
          the globe
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`?category=${cat}`}
              className={`category-button ${
                category === cat ? "category-button-active" : ""
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {news.map((article: NewsArticle, index: number) => (
          <article
            key={index}
            className="card hover-card animate-in group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {article.urlToImage && (
              <div className="aspect-[16/9] overflow-hidden">
                <NewsImage
                  src={article.urlToImage}
                  alt={article.title}
                  priority={index < 3}
                />
              </div>
            )}
            <div className="p-6">
              <div className="news-meta mb-4">
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-medium text-[var(--accent)]">
                  {article.source.name}
                </span>
                <time className="text-xs">
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              <h2 className="news-title group-hover:text-[var(--accent)] transition-colors duration-200">
                {article.title}
              </h2>
              {article.description && (
                <p className="news-description">{article.description}</p>
              )}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read full story
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      {news.length === 0 && (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <img
              src="/globe.svg"
              alt="No news"
              className="mx-auto mb-6 h-20 w-20 opacity-40"
            />
            <h2 className="mb-3 text-2xl font-semibold">No news available</h2>
            <p className="text-[var(--muted)]">
              Please try again later or select a different category
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
