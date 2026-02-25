// Supabase 설정 예제 파일
// 이 파일을 복사하여 'supabase-config.js'로 이름을 변경하고 실제 값으로 수정하세요.

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // 예: 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // 예: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

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
