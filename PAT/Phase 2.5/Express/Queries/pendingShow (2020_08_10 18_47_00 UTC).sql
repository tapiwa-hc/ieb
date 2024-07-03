SELECT
  notices.notice_id,
  notices.display_date,
  groupings.name,
  notices.title,
  notices.description,
  CONCAT(LEFT(users.first_name, 1), " ", users.surname) AS user
FROM notices
  INNER JOIN users
    ON notices.user_id = users.user_id
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
WHERE notices.approval_status = 'Pending'
ORDER BY notices.publish_date