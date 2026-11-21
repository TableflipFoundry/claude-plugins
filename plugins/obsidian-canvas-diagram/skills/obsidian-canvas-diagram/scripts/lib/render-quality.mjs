// Crossings can be legitimate. Obscured content and missing drawings require a fix or an explicit limitation.
export function renderProblems(quality) {
  const names = { throughNode: 'arrows through cards', overlap: 'overlapping arrows', labelOnNode: 'labels on cards',
    labelOnLabel: 'overlapping labels', labelOnEdge: 'labels obscured by another arrow', missingNote: 'missing notes', looseArrow: 'detached arrows' };
  return Object.entries(names).filter(([key]) => quality?.issues?.[key]?.length)
    .map(([key, name]) => ({ id: `render:${key}`, msg: `${quality.issues[key].length} ${name}. Fix and verify the layout, or record the actual limitation with job.mjs skip for this check ID after the permitted review rounds.` }));
}
