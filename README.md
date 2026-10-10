# 八段数码管 · 电子实验台

一个交互式的 **七段数码管 + 小数点（八段）** 原理演示，用单个自包含的 HTML 文件实现，无任何外部依赖、无构建步骤。

👉 **在线体验：** https://zzcm21384-dot.github.io/segment-display-demo/

## 它能做什么

- **数字输入**：键盘输入、屏幕键盘（0–9）、小数点 `dp` 开关
- **实时译码**：十进制数字 → 段码（`abcdefg` + `dp`）→ 8 位电平 → 十六进制 `0x6D` 输出
- **双视图**：器件视图（SVG 数码管）与等效电路视图（八路 LED + 独立限流电阻并联）
- **极性切换**：共阴极（高电平有效）/ 共阳极（低电平有效），电平自动取反
- **原理演示**：四阶段流水线（数字输入 → 字形译码 → 电平驱动 → 组合显示），带播放/步进/速度控制
- **段级交互**：点击单个笔画段或通断开关，可自由组合成自定义字形

## 运行

直接双击打开 `index.html` 即可，或在任意静态服务器下：

```bash
# 任选其一
python -m http.server 8000
npx serve .
```

## 测试

核心译码逻辑提取为纯函数 `SegmentModel`（内嵌于 `index.html` 的 `<script id="segment-model">`），用 Node.js 内置测试运行器验证：

```bash
node --test tests/logic.test.cjs
```

## 结构

```
index.html                 # 全部演示：结构 + 样式 + SVG + 逻辑，单文件
tests/logic.test.cjs       # 段码译码模型的单元测试（15 项）
docs/superpowers/          # 设计与规格文档
```

## 原理速览

七段数码管由 7 个条形 LED（`a–g`）加 1 个独立小数点（`dp`）组成。每一段都是一颗可单独控制的 LED：

| 数字 | 点亮段 |
|------|--------|
| 0 | abcdef |
| 1 | bc |
| 2 | abdeg |
| 3 | abcdg |
| 4 | bcfg |
| 5 | acdfg |
| 6 | acdefg |
| 7 | abc |
| 8 | abcdefg |
| 9 | abcdfg |

共阴极时，段引脚输出高电平点亮 LED；共阳极时逻辑取反。
