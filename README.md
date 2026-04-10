# 로이어비즈랩 (create-lawfirmsite.co.kr)

법률사무소 AI·SEO 최적화 홈페이지 제작 전문 사이트

---

## ⚡ 처음부터 세팅하는 방법 (템플릿 없이)

### Step 1 — GitHub 새 레포 생성

1. https://github.com/new 접속
2. Repository name: `create-lawfirmsite`
3. Private 선택 → **Create repository**

---

### Step 2 — Next.js 15 프로젝트 생성

```bash
# 새 Next.js 프로젝트 생성
npx create-next-app@latest create-lawfirmsite \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-eslint

cd create-lawfirmsite
```

> ⚠️ 설치 중 옵션 질문이 뜨면:
> - TypeScript → Yes
> - Tailwind CSS → Yes
> - App Router → Yes
> - src/ directory → No
> - import alias → @/*

---

### Step 3 — 이 프로젝트 파일 덮어쓰기

아래 파일들을 create-next-app이 생성한 폴더에 **그대로 복사·덮어쓰기**합니다.

```
create-lawfirmsite/
├── app/
│   ├── globals.css          ← 덮어쓰기
│   ├── layout.tsx           ← 덮어쓰기
│   ├── page.tsx             ← 덮어쓰기
│   ├── not-found.tsx        ← 새 파일
│   ├── sitemap.ts           ← 새 파일
│   ├── robots.ts            ← 새 파일
│   ├── contact/
│   │   └── page.tsx         ← 새 파일
│   ├── faq/
│   │   └── page.tsx         ← 새 파일
│   ├── cases/
│   │   ├── page.tsx         ← 새 파일
│   │   └── [slug]/
│   │       └── page.tsx     ← 새 파일
│   └── services/
│       ├── page.tsx         ← 새 파일
│       └── [slug]/
│           └── page.tsx     ← 새 파일
├── components/
│   ├── layout/
│   │   ├── Header.tsx       ← 새 파일
│   │   └── Footer.tsx       ← 새 파일
│   └── common/
│       └── ConsultForm.tsx  ← 새 파일
├── data/
│   ├── success-cases.ts     ← 새 파일
│   └── faqs.ts              ← 새 파일
├── lib/
│   └── constants.ts         ← 새 파일
├── public/
│   ├── llms.txt             ← 새 파일
│   └── robots.txt           ← 새 파일 (next.js가 만든 것 덮어쓰기)
├── .env.local               ← 새 파일 (아래 내용 참고)
├── next.config.ts           ← 덮어쓰기
├── tailwind.config.ts       ← 덮어쓰기
└── tsconfig.json            ← 덮어쓰기 (필요 시)
```

---

### Step 4 — .env.local 생성

프로젝트 루트에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SITE_URL=https://www.create-lawfirmsite.co.kr
NEXT_PUBLIC_PHONE=010-5886-4776
NEXT_PUBLIC_PHONE_HREF=tel:01058864776
NEXT_PUBLIC_KAKAO_HREF=https://pf.kakao.com/_UcTSb

# GA4 ID 발급 후 입력
NEXT_PUBLIC_GA4_ID=
```

---

### Step 5 — 로컬 실행 확인

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 확인

---

### Step 6 — GitHub에 올리기

```bash
git init
git remote add origin https://github.com/[계정명]/create-lawfirmsite.git
git add .
git commit -m "feat: 로이어비즈랩 초기 구축"
git branch -M main
git push -u origin main
```

---

### Step 7 — Vercel 배포

1. https://vercel.com 접속 → **Add New Project**
2. GitHub 레포 `create-lawfirmsite` 선택
3. **Environment Variables** 탭에 `.env.local` 내용 동일하게 입력
4. **Deploy** 클릭 → 자동 배포

---

### Step 8 — 도메인 연결 (Gabia)

**Vercel에서:**
1. 프로젝트 → Settings → Domains
2. `www.create-lawfirmsite.co.kr` 추가
3. Vercel이 안내하는 IP/CNAME 값 복사

**Gabia에서:**
1. 도메인 관리 → DNS 설정
2. A 레코드: `@` → Vercel IP (`76.76.21.21`)
3. CNAME 레코드: `www` → `cname.vercel-dns.com`

---

### Step 9 — 배포 후 즉시 처리 (§11 Step 5)

```
□ Google Search Console 등록 → sitemap.xml 제출
□ Naver Search Advisor 등록 → 메타태그 인증 → sitemap 제출
□ Bing Webmaster Tools 등록
□ Rich Results Test: https://search.google.com/test/rich-results
□ PageSpeed Insights: https://pagespeed.web.dev (SEO 100점 목표)
□ GA4 전환 이벤트 설정 (전화 클릭, 상담신청)
```

---

## 배포 명령어

```bash
git add . && git commit -m "feat: [내용]" && git push
```

Vercel GitHub 연동 시 push하면 자동 배포됩니다.

---

## 환경변수 목록

| 변수 | 값 | 비고 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.create-lawfirmsite.co.kr` | |
| `NEXT_PUBLIC_PHONE` | `010-5886-4776` | |
| `NEXT_PUBLIC_PHONE_HREF` | `tel:01058864776` | |
| `NEXT_PUBLIC_KAKAO_HREF` | `https://pf.kakao.com/_UcTSb` | 카카오 채널 발급 후 교체 |
| `NEXT_PUBLIC_GA4_ID` | `G-XXXXXXXXXX` | GA4 발급 후 입력 |
