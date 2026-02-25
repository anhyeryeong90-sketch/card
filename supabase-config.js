// Supabase 설정
const SUPABASE_URL = 'https://pcrcmrpmlmpnhnmpoten.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmNtcnBtbG1wbmhubXBvdGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTI1ODUsImV4cCI6MjA4NzU4ODU4NX0.EroE1u9xlXCXgHiJ9Qh2rfsJqGzbinHiK45_5yZhTz4';

// Supabase 클라이언트 초기화
let supabaseClient = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY && 
    SUPABASE_URL !== 'YOUR_SUPABASE_URL' && 
    SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase 클라이언트가 초기화되었습니다.');
} else {
    console.warn('Supabase 설정이 필요합니다. supabase-config.js 파일을 수정해주세요.');
    console.warn('게임은 정상적으로 작동하지만 점수 저장 기능은 사용할 수 없습니다.');
}
