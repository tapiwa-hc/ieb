SELECT
  DATE_FORMAT(notices.display_date, "%e %b") AS Date,
  groupings.name AS `Group`,
  notices.title AS Title,
  notices.description AS Description
FROM notices
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id