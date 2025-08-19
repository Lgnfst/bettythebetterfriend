export function summarize(series: { value: number }[]) {
  const v = series.map(s => s.value);
  const g = v.length || 0;
  const avg = g ? v.reduce((a, b) => a + b, 0) / g : 0;
  const min = g ? Math.min(...v) : 0;
  const max = g ? Math.max(...v) : 0;
  return { games: g, avg: Number(avg.toFixed(2)), min, max };
}

