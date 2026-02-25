// Vercel 빌드 시 환경 변수로부터 supabase-config.js 생성
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.VERCEL_ENV 
    ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    : process.env.SUPABASE_URL;

const SUPABASE_ANON_KEY = process.env.VERCEL_ENV
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
    : process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️  Supabase 환경 변수가 설정되지 않았습니다.');
    console.warn('Vercel 환경 변수를 설정하거나, 로컬에서는 .env 파일을 사용하세요.');
    
    // 예제 파일을 복사 (로컬 개발용)
    if (fs.existsSync('supabase-config.example.js')) {
        fs.copyFileSync('supabase-config.example.js', 'supabase-config.js');
        console.log('✅ supabase-config.example.js를 supabase-config.js로 복사했습니다.');
    }
} else {
    const configContent = `// Supabase 설정 (빌드 시 자동 생성)
// 이 파일은 build-config.js에 의해 자동 생성되었습니다.

const SUPABASE_URL = '${SUPABASE_URL}';
const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';

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
`;

    fs.writeFileSync(path.join(__dirname, 'supabase-config.js'), configContent);
    console.log('✅ supabase-config.js 파일이 생성되었습니다.');
}
