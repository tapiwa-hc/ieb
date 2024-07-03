SELECT
  notices.display_date,
  groupings.name,
  notices.title,
  notices.description,
  groupings.section_id
FROM notices
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
WHERE notices.approval_status = 'Approved'
ORDER BY groupings.section_id