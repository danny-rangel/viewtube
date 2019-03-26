export default function escapeChar(text) {
    return text
        .replace("&amp;", "&")
        .replace("&quot;", /"/g)
        .replace("&#39;", "'");
  }