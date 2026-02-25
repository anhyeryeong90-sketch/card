# Vercel 환경 변수 설정 가이드 🔐

Vercel에서 Supabase 환경 변수를 설정하는 방법입니다.

## 빠른 설정 방법

### 1. Vercel 대시보드에서 설정

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables** 클릭
4. 다음 환경 변수 추가:

#### 환경 변수 1
- **Key**: `SUPABASE_URL`
- **Value**: `https://pcrcmrpmlmpnhnmpoten.supabase.co`
- **Environment**: Production, Preview, Development 모두 선택 ✅

#### 환경 변수 2
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmNtcnBtbG1wbmhubXBvdGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTI1ODUsImV4cCI6MjA4NzU4ODU4NX0.EroE1u9xlXCXgHiJ9Qh2rfsJqGzbinHiK45_5yZhTz4`
- **Environment**: Production, Preview, Development 모두 선택 ✅

5. **Save** 클릭
6. **Deployments** 탭으로 이동
7. 최신 배포의 **"..."** 메뉴 → **"Redeploy"** 클릭
8. 완료! 🎉

### 2. 배포 시 설정 (새 프로젝트)

1. Vercel에서 "New Project" 클릭
2. GitHub 저장소 선택
3. 프로젝트 설정 화면에서:
   - Framework Preset: **Other**
   - Build Command: `npm run build` (자동 감지)
   - Output Directory: `.`
4. **"Environment Variables"** 섹션 확장
5. 위의 환경 변수 2개 추가
6. **Deploy** 클릭

## 작동 원리

1. Vercel이 빌드 시 `npm run build` 실행
2. `build-config.js` 스크립트가 환경 변수를 읽음
3. 환경 변수로부터 `supabase-config.js` 파일 자동 생성
4. 생성된 파일이 배포에 포함됨

## 문제 해결

### 환경 변수가 적용되지 않는 경우

1. **재배포 필요**: 환경 변수 추가 후 반드시 재배포해야 함
2. **Environment 확인**: Production, Preview, Development 모두 선택했는지 확인
3. **변수 이름 확인**: 대소문자 정확히 입력 (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
4. **빌드 로그 확인**: Vercel 대시보드 → Deployments → 빌드 로그에서 오류 확인

### 빌드 오류가 발생하는 경우

1. **Node.js 버전 확인**: Vercel은 자동으로 Node.js를 감지하지만, 필요시 `package.json`에 명시:
   ```json
   {
     "engines": {
       "node": ">=18"
     }
   }
   ```

2. **빌드 로그 확인**: 
   - Vercel 대시보드 → Deployments
   - 실패한 배포 클릭
   - "Build Logs" 확인

### Supabase 연결 오류

1. **환경 변수 값 확인**: Vercel 대시보드에서 값이 올바른지 확인
2. **Supabase 프로젝트 확인**: Supabase 대시보드에서 프로젝트가 활성화되어 있는지 확인
3. **RLS 정책 확인**: Supabase의 Row Level Security가 올바르게 설정되어 있는지 확인

## 로컬 개발

로컬에서 개발할 때는:

1. `.env` 파일 생성 (프로젝트 루트에):
   ```
   SUPABASE_URL=https://pcrcmrpmlmpnhnmpoten.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

2. 또는 `supabase-config.example.js`를 복사:
   ```bash
   cp supabase-config.example.js supabase-config.js
   # supabase-config.js 파일을 열어서 실제 값으로 수정
   ```

3. 빌드 실행:
   ```bash
   npm run build
   ```

## 보안 주의사항

- ✅ 환경 변수는 Vercel 대시보드에서만 관리
- ✅ GitHub 저장소에는 환경 변수 파일이 포함되지 않음
- ✅ `.gitignore`에 `supabase-config.js`가 포함되어 있음
- ⚠️ Anon Key는 공개되어도 안전하지만, RLS 정책이 필수입니다

## 추가 리소스

- [Vercel 환경 변수 문서](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase 보안 가이드](https://supabase.com/docs/guides/auth/row-level-security)
