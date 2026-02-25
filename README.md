# 카드 뒤집기 게임 🎮

가장 간단한 웹 기술(HTML, CSS, JavaScript)로 만든 카드 뒤집기 게임입니다. Supabase를 사용하여 점수를 저장하고 최고 점수를 조회할 수 있습니다.

## 기능

- 🎯 3가지 난이도 (쉬움: 4쌍, 보통: 6쌍, 어려움: 8쌍)
- ⏱️ 실시간 타이머
- 📊 이동 횟수 추적
- 🏆 점수 시스템
- 💾 Supabase를 통한 점수 저장 및 최고 점수 조회
- 📊 리더보드 (전체/난이도별 필터링, 상위 N개 조회)
- 🎨 부드러운 카드 뒤집기 애니메이션
- 📱 반응형 디자인

## 설치 및 실행

### 1. 파일 다운로드

모든 파일을 같은 디렉토리에 저장하세요:
- `index.html`
- `style.css`
- `script.js`
- `supabase-config.js`

### 2. Supabase 설정 (선택사항)

점수 저장 기능을 사용하려면:

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. SQL Editor에서 `supabase-migration.sql` 파일의 내용 실행
3. `supabase-config.example.js` 파일을 복사하여 `supabase-config.js`로 이름 변경
4. `supabase-config.js` 파일을 열어서 다음 정보를 입력:
   - `SUPABASE_URL`: Supabase 프로젝트 URL
   - `SUPABASE_ANON_KEY`: Supabase Anon Key (Settings > API에서 확인)

```bash
# 예제 파일을 복사
cp supabase-config.example.js supabase-config.js
```

```javascript
// supabase-config.js 파일 내용
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

**⚠️ 보안 주의사항:**
- `supabase-config.js` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.
- 실제 API 키는 절대 공개 저장소에 올리지 마세요.
- Supabase의 Row Level Security (RLS) 정책이 올바르게 설정되어 있는지 확인하세요.

**🚀 Vercel 배포 시:**
- Vercel 환경 변수를 사용하여 Supabase 설정을 주입합니다.
- 자세한 설정 방법은 [VERCEL_SETUP.md](VERCEL_SETUP.md)를 참고하세요.

### 3. 실행

로컬에서 실행:
- 파일을 직접 브라우저에서 열기 (`index.html` 더블클릭)
- 또는 로컬 서버 사용:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Node.js (http-server)
  npx http-server
  ```

배포:
- **Netlify** (가장 간단): 드래그 앤 드롭으로 즉시 배포
- **Vercel**: GitHub 연동으로 자동 배포
- **GitHub Pages**: 무료, GitHub 저장소와 통합
- **Cloudflare Pages**: 빠른 CDN, 무제한 대역폭
- **Firebase Hosting**: Google의 안정적인 인프라

자세한 배포 방법은 [DEPLOYMENT.md](DEPLOYMENT.md)를 참고하세요.

## 게임 방법

1. 난이도를 선택하세요 (쉬움/보통/어려움)
2. "새 게임" 버튼을 클릭하여 게임을 시작하세요
3. 카드를 클릭하여 뒤집고 같은 이모지를 찾으세요
4. 모든 카드를 매칭하면 게임이 완료됩니다
5. 점수를 저장하여 최고 점수를 기록하세요!
6. "🏆 리더보드" 버튼을 클릭하여 다른 플레이어들의 점수를 확인하세요!

## 리더보드 기능

리더보드에서는 다음 기능을 사용할 수 있습니다:
- **전체/난이도별 필터링**: 모든 난이도 또는 특정 난이도(쉬움/보통/어려움)만 조회
- **상위 N개 조회**: 상위 10명, 20명, 50명, 100명 중 선택
- **실시간 새로고침**: 최신 점수 기록을 즉시 확인
- **상위 3명 강조**: 1위(🥇), 2위(🥈), 3위(🥉)에 특별한 스타일 적용

리더보드에는 다음 정보가 표시됩니다:
- 순위 (상위 3명은 메달 이모지)
- 점수
- 소요 시간
- 이동 횟수
- 난이도
- 기록 날짜

## 점수 계산

점수 = 10,000 - (시간(초) × 10 + 이동 횟수 × 5)

낮은 시간과 적은 이동 횟수일수록 높은 점수를 받습니다.

## 기술 스택

- **HTML5**: 구조
- **CSS3**: 스타일링 및 애니메이션
- **JavaScript (Vanilla)**: 게임 로직
- **Supabase**: 데이터베이스 및 백엔드

## 라이선스

MIT License
