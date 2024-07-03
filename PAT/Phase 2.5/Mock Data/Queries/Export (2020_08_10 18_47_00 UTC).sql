SELECT notices.title,
       notices.description,
       groupings.section_id
FROM notices
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
WHERE DATEDIFF(notices.display_date, "2020-02-21") = 0
AND groupings.section_id = 3
ORDER BY groupings.section_id