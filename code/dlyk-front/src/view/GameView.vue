<template>
  <div class="game-view">
    <el-container>
      <el-header>
        <h1>贪吃蛇游戏</h1>
      </el-header>
      <el-main>
        <SnakeGame />
      </el-main>
      <el-footer>
        <p>使用方向键控制蛇的移动，空格键暂停/继续游戏</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SnakeGame from '../components/SnakeGame.vue';
</script>

<style scoped>
.game-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  color: #333;
}

.el-header {
  background-color: #42b983;
  color: white;
  line-height: 60px;
}

.el-footer {
  background-color: #f0f0f0;
  color: #666;
  text-align: center;
  padding: 10px 0;
}

.el-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}
</style>