<template>
  <div class="snake-game-container">
    <h2>贪吃蛇游戏</h2>
    <div class="game-info">
      <div>分数: {{ score }}</div>
      <div>等级: {{ level }}</div>
    </div>
    <canvas ref="gameCanvas" class="game-canvas"></canvas>
    <div class="game-controls">
      <el-button @click="startGame" type="primary" :disabled="isPlaying">开始游戏</el-button>
      <el-button @click="pauseGame" type="warning" :disabled="!isPlaying || isPaused">暂停</el-button>
      <el-button @click="resumeGame" type="success" :disabled="!isPlaying || !isPaused">继续</el-button>
      <el-button @click="resetGame" type="danger">重置游戏</el-button>
    </div>
    <div class="game-instructions">
      <p>使用方向键控制蛇的移动</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// 游戏状态
const isPlaying = ref(false);
const isPaused = ref(false);
const score = ref(0);
const level = ref(1);
const gameCanvas = ref(null);
const ctx = ref(null);

// 游戏参数
const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let gameLoopId = null;
let speed = INITIAL_SPEED;

// 初始化画布
const initCanvas = () => {
  if (gameCanvas.value) {
    ctx.value = gameCanvas.value.getContext('2d');
    // 设置画布大小
    gameCanvas.value.width = 400;
    gameCanvas.value.height = 400;
    // 调整样式
    gameCanvas.value.style.border = '2px solid #333';
    gameCanvas.value.style.backgroundColor = '#f0f0f0';
  }
};

// 初始化蛇
const initSnake = () => {
  snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ];
  direction = 'right';
  nextDirection = 'right';
};

// 生成食物
const generateFood = () => {
  // 确保食物不会出现在蛇身上
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * (gameCanvas.value.width / GRID_SIZE)),
      y: Math.floor(Math.random() * (gameCanvas.value.height / GRID_SIZE)),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  food = newFood;
};

// 绘制游戏
const drawGame = () => {
  // 清空画布
  ctx.value.fillStyle = '#f0f0f0';
  ctx.value.fillRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

  // 绘制蛇
  snake.forEach((segment, index) => {
    ctx.value.fillStyle = index === 0 ? '#42b983' : '#35495e';
    ctx.value.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE - 1,
      GRID_SIZE - 1
    );
  });

  // 绘制食物
  ctx.value.fillStyle = '#e74c3c';
  ctx.value.fillRect(
    food.x * GRID_SIZE,
    food.y * GRID_SIZE,
    GRID_SIZE - 1,
    GRID_SIZE - 1
  );
};

// 更新游戏状态
const updateGame = () => {
  if (isPaused.value) return;

  // 更新方向
  direction = nextDirection;

  // 获取蛇头
  const head = { ...snake[0] };

  // 根据方向移动蛇头
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  // 检查碰撞
  // 检查边界碰撞
  if (
    head.x < 0 ||
    head.x >= gameCanvas.value.width / GRID_SIZE ||
    head.y < 0 ||
    head.y >= gameCanvas.value.height / GRID_SIZE
  ) {
    gameOver();
    return;
  }

  // 检查自身碰撞
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  // 添加新头部
  snake.unshift(head);

  // 检查是否吃到食物
  if (head.x === food.x && head.y === food.y) {
    // 增加分数
    score.value += 10 * level.value;
    // 生成新食物
    generateFood();
    // 每100分升级
    if (score.value % 100 === 0) {
      level.value++;
      // 提高速度
      speed = Math.max(50, INITIAL_SPEED - (level.value - 1) * 10);
      // 重新设置游戏循环
      if (gameLoopId) clearInterval(gameLoopId);
      gameLoopId = setInterval(gameLoop, speed);
    }
  } else {
    // 移除尾部
    snake.pop();
  }

  // 绘制游戏
  drawGame();
};

// 游戏循环
const gameLoop = () => {
  updateGame();
};

// 开始游戏
const startGame = () => {
  if (!isPlaying.value) {
    isPlaying.value = true;
    isPaused.value = false;
    score.value = 0;
    level.value = 1;
    speed = INITIAL_SPEED;
    initSnake();
    generateFood();
    drawGame();
    if (gameLoopId) clearInterval(gameLoopId);
    gameLoopId = setInterval(gameLoop, speed);
  }
};

// 暂停游戏
const pauseGame = () => {
  isPaused.value = true;
};

// 继续游戏
const resumeGame = () => {
  isPaused.value = false;
};

// 重置游戏
const resetGame = () => {
  isPlaying.value = false;
  isPaused.value = false;
  if (gameLoopId) clearInterval(gameLoopId);
  initSnake();
  generateFood();
  drawGame();
};

// 游戏结束
const gameOver = () => {
  isPlaying.value = false;
  if (gameLoopId) clearInterval(gameLoopId);
  alert(`游戏结束! 你的分数是: ${score.value}`);
};

// 监听键盘事件
const handleKeydown = (e) => {
  if (!isPlaying.value) return;

  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') nextDirection = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') nextDirection = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') nextDirection = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') nextDirection = 'right';
      break;
    case ' ': // 空格键暂停/继续
      if (isPaused.value) {
        resumeGame();
      } else {
        pauseGame();
      }
      break;
  }
};

// 组件挂载时
onMounted(() => {
  initCanvas();
  initSnake();
  generateFood();
  drawGame();
  window.addEventListener('keydown', handleKeydown);
});

// 组件卸载时
onUnmounted(() => {
  if (gameLoopId) clearInterval(gameLoopId);
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.snake-game-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
}

.game-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

.game-canvas {
  display: block;
  margin: 0 auto 20px;
}

.game-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.game-instructions {
  text-align: center;
  color: #666;
}
</style>