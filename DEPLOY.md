# 部署說明

這個站部署在 Cloudflare Pages，走 Git integration，push 到 main 就會自動部署。DNS zone `zhiri.app` 已經在 Cloudflare，apex 與 www 目前沒有任何記錄，綁網域時會自動建立 CNAME。

## 首次設定（在 Cloudflare 後台點，約 5 分鐘）

1. Workers & Pages → Create → Pages → Connect to Git → 選 `tim80411/zhiri-site`，production branch 填 `main`。
2. Build settings 如下表。repo 內有 `bun.lock`，Pages 會自動用 bun 安裝。

   | 欄位 | 值 |
   | --- | --- |
   | Framework preset | Astro |
   | Build command | `bun run build` |
   | Build output directory | `dist` |

3. Save and Deploy，等第一次部署完成，先點開 `*.pages.dev` 網址確認內容正常。
4. 專案 → Custom domains → Set up a custom domain → 輸入 `zhiri.app` → Activate domain。再用同樣方式加 `www.zhiri.app`。兩個都要加，`public/_redirects` 的 www 轉 apex 301 才會生效。
5. 專案 → Settings → Metrics（或 Web Analytics）→ Enable Web Analytics。Pages 會自動注入 beacon，不用改程式。若想改用手動注入，把 token 填進 `src/config.ts` 的 `cfBeaconToken`。

## 驗證

```
curl -sI https://zhiri.app | head -1          # HTTP/2 200
curl -sI https://www.zhiri.app | grep -i location   # location: https://zhiri.app/
curl -s https://zhiri.app/sitemap-index.xml | head -3
```

## 日常更新

改檔 → `bun run build` 本機確認 → commit → push main → Pages 自動部署。

## 未來可加

`/en/` 英文版、聯絡表單（需 Worker 後端與 Turnstile）。
