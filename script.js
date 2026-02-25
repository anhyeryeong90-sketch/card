// 게임 상태
let gameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    startTime: null,
    timerInterval: null,
    isProcessing: false,
    difficulty: 'medium',
    totalPairs: 6
};

// 카드 이모지 (쉽게 변경 가능)
const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];

// 게임 초기화
function initGame() {
    const difficulty = document.getElementById('difficulty').value;
    gameState.difficulty = difficulty;
    
    // 난이도에 따른 카드 쌍 수 설정
    switch(difficulty) {
        case 'easy':
            gameState.totalPairs = 4;
            break;
        case 'medium':
            gameState.totalPairs = 6;
            break;
        case 'hard':
            gameState.totalPairs = 8;
            break;
    }

    // 게임 상태 리셋
    gameState.cards = [];
    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.isProcessing = false;
    gameState.startTime = null;

    // 타이머 정지
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }

    // UI 업데이트
    updateUI();
    createCards();
    loadBestScore();
}

// 카드 생성
function createCards() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.className = `game-board ${gameState.difficulty}`;

    // 카드 쌍 생성
    const cardPairs = [];
    for (let i = 0; i < gameState.totalPairs; i++) {
        cardPairs.push(cardEmojis[i]);
        cardPairs.push(cardEmojis[i]);
    }

    // 카드 섞기 (Fisher-Yates 알고리즘)
    shuffleArray(cardPairs);

    // 카드 DOM 생성
    cardPairs.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${emoji}</div>
            </div>
        `;

        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });

    gameState.cards = Array.from(document.querySelectorAll('.card'));
}

// 배열 섞기 (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 카드 클릭 처리
function handleCardClick(event) {
    const card = event.currentTarget;

    // 이미 뒤집혔거나 매칭된 카드, 또는 처리 중이면 무시
    if (card.classList.contains('flipped') || 
        card.classList.contains('matched') || 
        gameState.isProcessing) {
        return;
    }

    // 게임 시작 시 타이머 시작
    if (!gameState.startTime) {
        startTimer();
    }

    // 카드 뒤집기 - 클릭 효과
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    card.classList.add('flipped');
    gameState.flippedCards.push(card);

    // 두 장이 뒤집혔을 때
    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        gameState.isProcessing = true;
        updateUI();

        const [firstCard, secondCard] = gameState.flippedCards;

        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            // 매칭 성공
            setTimeout(() => {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                gameState.matchedPairs++;
                gameState.flippedCards = [];
                gameState.isProcessing = false;

                // 게임 완료 확인
                if (gameState.matchedPairs === gameState.totalPairs) {
                    setTimeout(() => {
                        endGame();
                    }, 300);
                }
            }, 500);
        } else {
            // 매칭 실패 - shake 애니메이션 추가
            firstCard.classList.add('mismatch');
            secondCard.classList.add('mismatch');
            
            setTimeout(() => {
                firstCard.classList.remove('flipped', 'mismatch');
                secondCard.classList.remove('flipped', 'mismatch');
                gameState.flippedCards = [];
                gameState.isProcessing = false;
            }, 1000);
        }
    }
}

// 타이머 시작
function startTimer() {
    gameState.startTime = Date.now();
    gameState.timerInterval = setInterval(() => {
        updateTimer();
    }, 1000);
}

// 타이머 업데이트
function updateTimer() {
    if (!gameState.startTime) return;

    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('timer').textContent = timeString;
    updateScore();
}

// 점수 계산 및 업데이트
function updateScore() {
    if (!gameState.startTime) {
        document.getElementById('score').textContent = '0';
        return;
    }

    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    // 점수 = (시간 * 10 + 이동 횟수 * 5)의 역수 (낮을수록 좋음)
    // 더 높은 점수를 원하면: 10000 / (시간 + 이동 횟수)
    const score = Math.max(0, 10000 - (elapsed * 10 + gameState.moves * 5));
    document.getElementById('score').textContent = score.toLocaleString();
}

// UI 업데이트
function updateUI() {
    document.getElementById('moves').textContent = gameState.moves;
    updateScore();
}

// 게임 종료
function endGame() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }

    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // 최종 점수 계산
    const finalScore = Math.max(0, 10000 - (elapsed * 10 + gameState.moves * 5));

    // 모달에 정보 표시
    document.getElementById('final-moves').textContent = gameState.moves;
    document.getElementById('final-time').textContent = timeString;
    document.getElementById('final-score').textContent = finalScore.toLocaleString();

    // 모달 표시
    document.getElementById('game-over-modal').classList.remove('hidden');
}

// 새 게임 시작
function startNewGame() {
    document.getElementById('game-over-modal').classList.add('hidden');
    initGame();
}

// 점수 저장
async function saveScore() {
    if (!supabaseClient) {
        alert('Supabase가 설정되지 않았습니다. supabase-config.js 파일을 확인해주세요.');
        return;
    }

    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const finalScore = Math.max(0, 10000 - (elapsed * 10 + gameState.moves * 5));

    try {
        const { data, error } = await supabaseClient
            .from('games')
            .insert([
                {
                    score: finalScore,
                    time_seconds: elapsed,
                    moves: gameState.moves,
                    difficulty: gameState.difficulty
                }
            ])
            .select();

        if (error) throw error;

        alert('점수가 저장되었습니다!');
        loadBestScore();
        // 리더보드가 열려있으면 새로고침
        if (!document.getElementById('leaderboard-modal').classList.contains('hidden')) {
            loadLeaderboard();
        }
    } catch (error) {
        console.error('점수 저장 오류:', error);
        alert('점수 저장에 실패했습니다: ' + error.message);
    }
}

// 최고 점수 로드
async function loadBestScore() {
    if (!supabaseClient) {
        document.getElementById('best-score').textContent = '-';
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('games')
            .select('score')
            .order('score', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116은 결과가 없을 때
            throw error;
        }

        if (data) {
            document.getElementById('best-score').textContent = data.score.toLocaleString();
        } else {
            document.getElementById('best-score').textContent = '-';
        }
    } catch (error) {
        console.error('최고 점수 로드 오류:', error);
        document.getElementById('best-score').textContent = '-';
    }
}

// 리더보드 로드
async function loadLeaderboard() {
    if (!supabaseClient) {
        document.getElementById('leaderboard-tbody').innerHTML = 
            '<tr><td colspan="6" style="text-align: center; color: #ef4444;">Supabase가 설정되지 않았습니다.</td></tr>';
        return;
    }

    const difficulty = document.getElementById('leaderboard-difficulty').value;
    const limit = parseInt(document.getElementById('leaderboard-limit').value);
    const loadingEl = document.getElementById('leaderboard-loading');
    const tableContainer = document.getElementById('leaderboard-table-container');
    const emptyMessage = document.getElementById('leaderboard-empty');
    const tbody = document.getElementById('leaderboard-tbody');

    // 로딩 표시
    loadingEl.classList.remove('hidden');
    tableContainer.style.opacity = '0.5';

    try {
        let query = supabaseClient
            .from('games')
            .select('*')
            .order('score', { ascending: false })
            .limit(limit);

        // 난이도 필터링
        if (difficulty !== 'all') {
            query = query.eq('difficulty', difficulty);
        }

        const { data, error } = await query;

        if (error) throw error;

        loadingEl.classList.add('hidden');
        tableContainer.style.opacity = '1';

        if (!data || data.length === 0) {
            document.getElementById('leaderboard-table').style.display = 'none';
            emptyMessage.classList.remove('hidden');
            return;
        }

        document.getElementById('leaderboard-table').style.display = 'table';
        emptyMessage.classList.add('hidden');

        // 테이블 생성
        tbody.innerHTML = '';
        data.forEach((record, index) => {
            const rank = index + 1;
            const row = document.createElement('tr');
            
            // 상위 3명에 특별 스타일 적용
            if (rank === 1) row.classList.add('rank-1');
            else if (rank === 2) row.classList.add('rank-2');
            else if (rank === 3) row.classList.add('rank-3');

            const minutes = Math.floor(record.time_seconds / 60);
            const seconds = record.time_seconds % 60;
            const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            const date = new Date(record.created_at);
            const dateString = date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            const difficultyText = {
                'easy': '쉬움',
                'medium': '보통',
                'hard': '어려움'
            }[record.difficulty] || record.difficulty;

            row.innerHTML = `
                <td class="rank-cell">${rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}</td>
                <td class="score-cell">${record.score.toLocaleString()}</td>
                <td>${timeString}</td>
                <td>${record.moves}</td>
                <td class="difficulty-cell difficulty-${record.difficulty}">${difficultyText}</td>
                <td>${dateString}</td>
            `;

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('리더보드 로드 오류:', error);
        loadingEl.classList.add('hidden');
        tableContainer.style.opacity = '1';
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #ef4444;">오류: ${error.message}</td></tr>`;
    }
}

// 리더보드 모달 열기/닫기
function openLeaderboard() {
    document.getElementById('leaderboard-modal').classList.remove('hidden');
    loadLeaderboard();
}

function closeLeaderboard() {
    document.getElementById('leaderboard-modal').classList.add('hidden');
}

// 이벤트 리스너
document.getElementById('new-game-btn').addEventListener('click', startNewGame);
document.getElementById('difficulty').addEventListener('change', startNewGame);
document.getElementById('play-again-btn').addEventListener('click', startNewGame);
document.getElementById('save-score-btn').addEventListener('click', saveScore);
document.getElementById('leaderboard-btn').addEventListener('click', openLeaderboard);
document.getElementById('close-leaderboard-btn').addEventListener('click', closeLeaderboard);
document.getElementById('leaderboard-difficulty').addEventListener('change', loadLeaderboard);
document.getElementById('leaderboard-limit').addEventListener('change', loadLeaderboard);
document.getElementById('refresh-leaderboard-btn').addEventListener('click', loadLeaderboard);

// 모달 외부 클릭 시 닫기
document.getElementById('leaderboard-modal').addEventListener('click', (e) => {
    if (e.target.id === 'leaderboard-modal') {
        closeLeaderboard();
    }
});

// 페이지 로드 시 게임 초기화
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
