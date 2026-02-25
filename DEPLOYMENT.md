# 배포 가이드 🚀

카드 뒤집기 게임을 배포하는 방법을 안내합니다.

## 추천 배포 플랫폼

### 1. **Vercel** ⭐ (가장 추천)
**장점:**
- 무료 플랜 제공
- GitHub 연동으로 자동 배포
- 빠른 CDN
- HTTPS 자동 적용
- 커스텀 도메인 지원

**배포 방법:**
1. [Vercel](https://vercel.com)에 가입 (GitHub 계정으로 간편 가입)
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - Framework Preset: **Other**
   - Build Command: `npm run build` (자동 감지됨)
   - Output Directory: `.` (현재 디렉토리)
5. **환경 변수 설정** (중요!):
   - "Environment Variables" 섹션 클릭
   - 다음 변수 추가:
     - `SUPABASE_URL`: `https://your-project.supabase.co`
     - `SUPABASE_ANON_KEY`: `your-anon-key`
   - 또는 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 사용 가능
6. "Deploy" 클릭
7. 완료! 자동으로 URL 생성

**환경 변수 설정 방법:**
1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables
3. 다음 변수 추가:
   ```
   SUPABASE_URL = https://pcrcmrpmlmpnhnmpoten.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Environment: Production, Preview, Development 모두 선택
5. Save 클릭
6. 재배포 (자동 또는 수동)

**GitHub 연동 시:**
```bash
# Git 저장소 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/card-flip-game.git
git push -u origin main
```

### 2. **Netlify** ⭐
**장점:**
- 무료 플랜 제공
- 드래그 앤 드롭 배포 가능
- GitHub 연동
- 폼 처리 기능
- 좋은 성능

**배포 방법:**
1. [Netlify](https://www.netlify.com)에 가입
2. "Add new site" → "Deploy manually"
3. 프로젝트 폴더를 드래그 앤 드롭
4. 자동으로 배포 완료!

**또는 GitHub 연동:**
1. "Add new site" → "Import an existing project"
2. GitHub 저장소 선택
3. 빌드 설정 없음 (정적 사이트)
4. "Deploy site" 클릭

### 3. **GitHub Pages** (무료)
**장점:**
- 완전 무료
- GitHub 저장소와 통합
- 간단한 설정

**배포 방법:**
1. GitHub에 저장소 생성
2. 파일 업로드
3. Settings → Pages
4. Source: "Deploy from a branch" 선택
5. Branch: `main` 선택
6. Save 클릭
7. 몇 분 후 `https://yourusername.github.io/repository-name` 접속

**주의사항:**
- 저장소가 Public이어야 무료
- Private 저장소는 GitHub Pro 필요

### 4. **Cloudflare Pages**
**장점:**
- 무료 플랜 제공
- 빠른 CDN
- GitHub 연동
- 무제한 대역폭

**배포 방법:**
1. [Cloudflare Pages](https://pages.cloudflare.com) 접속
2. "Create a project" 클릭
3. GitHub 저장소 연결
4. 빌드 설정 없음
5. "Save and Deploy" 클릭

### 5. **Firebase Hosting**
**장점:**
- Google의 안정적인 인프라
- 무료 플랜 제공
- 커스텀 도메인
- CDN 포함

**배포 방법:**
```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 프로젝트 초기화
firebase init hosting

# 배포
firebase deploy
```

## 배포 전 체크리스트 ✅

### 1. Supabase 설정 확인
- `supabase-config.js`에 올바른 URL과 API 키가 입력되어 있는지 확인
- Supabase 프로젝트의 RLS 정책이 올바르게 설정되어 있는지 확인

### 2. 파일 확인
다음 파일들이 모두 포함되어 있는지 확인:
- ✅ `index.html`
- ✅ `style.css`
- ✅ `script.js`
- ✅ `supabase-config.js`
- ✅ `supabase-migration.sql` (참고용)

### 3. 보안 확인
- ⚠️ **중요**: `supabase-config.js`에 실제 API 키가 포함되어 있습니다
- Public 저장소에 올릴 경우, Supabase의 RLS 정책이 올바르게 설정되어 있어야 합니다
- Anon Key는 공개되어도 안전하지만, Row Level Security가 필수입니다

### 4. 테스트
로컬에서 모든 기능이 정상 작동하는지 확인:
- ✅ 게임 플레이
- ✅ 점수 저장
- ✅ 리더보드 조회
- ✅ 반응형 디자인

## 환경별 배포 설정

### 개발 환경
로컬에서 테스트:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# 또는 VS Code Live Server 확장 사용
```

### 프로덕션 환경
배포 후 확인사항:
1. HTTPS 적용 확인
2. 모든 기능 테스트
3. 모바일에서 테스트
4. 성능 확인 (PageSpeed Insights)

## 커스텀 도메인 설정

### Vercel
1. 프로젝트 Settings → Domains
2. 도메인 추가
3. DNS 설정 안내 따르기

### Netlify
1. Site settings → Domain management
2. "Add custom domain" 클릭
3. DNS 설정 안내 따르기

### GitHub Pages
1. 저장소 Settings → Pages
2. Custom domain 입력
3. DNS에 CNAME 레코드 추가

## 성능 최적화 팁

1. **이미지 최적화**: 현재는 이모지 사용 중이므로 문제없음
2. **CSS/JS 압축**: 대부분의 배포 플랫폼이 자동으로 처리
3. **CDN 활용**: 모든 추천 플랫폼이 CDN 제공
4. **캐싱**: 브라우저 캐싱 헤더 설정 (플랫폼에서 자동 처리)

## 문제 해결

### CORS 오류
- Supabase의 CORS 설정 확인
- Supabase 대시보드 → Settings → API → CORS 설정

### API 키 오류
- `supabase-config.js` 파일이 올바르게 배포되었는지 확인
- 브라우저 콘솔에서 오류 메시지 확인

### 리소스 로드 실패
- 모든 파일의 경로가 상대 경로인지 확인
- CDN 링크 (Supabase JS)가 올바른지 확인

## 추천 순서

1. **처음 배포**: **Netlify** (가장 간단, 드래그 앤 드롭)
2. **GitHub 사용자**: **GitHub Pages** (무료, 간단)
3. **자동 배포 원함**: **Vercel** (GitHub 연동, 자동 배포)
4. **고급 기능 필요**: **Firebase Hosting**

## 빠른 시작 (Netlify)

1. https://www.netlify.com 접속
2. 가입 (GitHub 계정 권장)
3. 프로젝트 폴더를 브라우저에 드래그 앤 드롭
4. 완료! URL이 자동 생성됩니다

**5분 안에 배포 완료!** 🎉
