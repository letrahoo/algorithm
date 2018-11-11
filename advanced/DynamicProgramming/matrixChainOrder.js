function matrixChainOrder(p) {
  // 矩阵长度
  const len = p.length - 1;
  const m = [];
  const s = [];
  let q;
  // 初始化二元数组
  for (let i = 0; i <= len; i++) {
    m[i] = [];
    s[i] = [];
    for (let j = 0; j <= len; j++) {
      m[i][j] = 0;
      s[i][j] = 0;
    }
  }

  // 从两个矩阵链开始，逐次增加矩阵链长度
  for (let L = 2; L <= len; L++) {
    // 对所有长度为L的情况计算
    for (let i = 1; i <= len - L + 1; i++) {
      let j = i + L - 1;
      m[i][j] = -1;
      // 遍历所有可能被划分的点k，计算最优划分方案
      for (let k = i; k <= j - 1; k++) {
        q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
        if (q < m[i][j] || m[i][j] == -1) {
          m[i][j] = q; // 最优代价保存在m[i][j]中
          s[i][j] = k; // 最优划分位置保存在s[i][j]中
        }
      }
    }
  }
  return { m, s };
}

// 对应矩阵，只显示矩阵的行和列数，因为不用考虑矩阵内容
const p = [30, 35, 15, 5, 10, 20, 25];
console.log(matrixChainOrder(p));
