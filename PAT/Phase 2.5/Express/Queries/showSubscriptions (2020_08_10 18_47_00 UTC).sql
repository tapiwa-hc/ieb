SELECT
  groupings.name,
  subscriptions.grouping_id
FROM groupings
  INNER JOIN subscriptions
    ON subscriptions.grouping_id = groupings.grouping_id
  INNER JOIN users
    ON subscriptions.user_id = users.user_id
WHERE subscriptions.user_id = ?