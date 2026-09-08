export function selectRange(ids: string[], selected: string[], anchor: string | null, target: string, shift: boolean, additive: boolean): string[] {
  if (shift && anchor && ids.includes(anchor)) {
    const a = ids.indexOf(anchor), b = ids.indexOf(target);
    const range = ids.slice(Math.min(a, b), Math.max(a, b) + 1);
    return additive ? [...new Set([...selected, ...range])] : range;
  }
  return additive ? selected.includes(target) ? selected.filter(id => id !== target) : [...selected, target] : [target];
}
