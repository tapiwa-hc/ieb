SELECT
  groupings.name, groupings.grouping_id
FROM groupings
  INNER JOIN subscriptions
    ON subscriptions.grouping_id = groupings.grouping_id
  INNER JOIN users
    ON subscriptions.user_id = users.user_id
WHERE subscriptions.user_id = ?
UNION
SELECT
  groupings.name, grouping_id
FROM  groupings
WHERE grouping_id > 0;