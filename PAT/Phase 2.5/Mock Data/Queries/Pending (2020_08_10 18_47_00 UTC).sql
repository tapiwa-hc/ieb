SELECT DATE_FORMAT(notices.display_date, "%e %b") AS Date,
       groupings.name AS `Group`,
       notices.title AS Title,
       notices.description AS Description,
       CONCAT(LEFT(users.first_name, 1), " ", users.surname) AS User
FROM notices
  INNER JOIN users
    ON notices.user_id = users.user_id
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
WHERE notices.approval_status = "Pending"