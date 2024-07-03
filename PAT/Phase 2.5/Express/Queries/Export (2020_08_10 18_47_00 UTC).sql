SELECT
  notices.title,
  notices.description,
  groupings.section_id
FROM notices
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
WHERE notices.display_date = ?
AND groupings.section_id IN (?)
ORDER BY groupings.section_id