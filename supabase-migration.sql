-- 카드 뒤집기 게임을 위한 Supabase 테이블 생성
-- Supabase 대시보드의 SQL Editor에서 실행하세요

-- games 테이블 생성
CREATE TABLE IF NOT EXISTS games (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT,
    score INTEGER NOT NULL,
    time_seconds INTEGER NOT NULL,
    moves INTEGER NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_games_score ON games(score DESC);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_games_difficulty ON games(difficulty);

-- Row Level Security (RLS) 정책 설정
-- 모든 사용자가 읽기/쓰기 가능하도록 설정 (익명 게임 지원)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 게임 기록을 읽을 수 있도록 정책 생성
CREATE POLICY "Anyone can read games"
    ON games FOR SELECT
    USING (true);

-- 모든 사용자가 게임 기록을 추가할 수 있도록 정책 생성
CREATE POLICY "Anyone can insert games"
    ON games FOR INSERT
    WITH CHECK (true);

-- (선택사항) 사용자 인증을 사용하는 경우 아래 정책을 사용하세요
-- CREATE POLICY "Users can read their own games"
--     ON games FOR SELECT
--     USING (auth.uid()::text = user_id);
--
-- CREATE POLICY "Users can insert their own games"
--     ON games FOR INSERT
--     WITH CHECK (auth.uid()::text = user_id);
