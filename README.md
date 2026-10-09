# zhiri-site

值日工作室（zhiri）公司入口網，https://zhiri.app。Astro 靜態站，繁體中文單語，純深色主題，三頁加 404。日後要加英文版，可在 `src/pages/en/` 下新增，不必動現有結構。

```bash
bun install
bun run dev      # 本機開發
bun run build    # 輸出到 dist/
bun run assets   # 重產 og.png 與 apple-touch-icon.png（需要系統有中文字型）
```

部署：Cloudflare Pages 的 Git integration。Build command 填 `bun run build`，output directory 填 `dist`。

Cloudflare Web Analytics 的 token 放在 `src/config.ts` 的 `cfBeaconToken`，留空就不載入 beacon。
