export async function getWebsiteContext(url?: string) {
  if (!url) return "";
  const parsed = new URL(url);
  if (!/^https?:$/.test(parsed.protocol) || /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(parsed.hostname)) return "";
  const response = await fetch(parsed, { redirect: "follow", signal: AbortSignal.timeout(8_000), headers: { "User-Agent": "Paras-Outreach-Research/1.0" } });
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) return "";
  const html = (await response.text()).slice(0, 120_000);
  return html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 12_000);
}
