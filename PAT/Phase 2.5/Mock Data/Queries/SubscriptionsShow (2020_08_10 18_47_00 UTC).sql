SELECT
  groupings.name
FROM subscriptions
  INNER JOIN groupings
    ON subscriptions.grouping_id = groupings.grouping_id
WHERE subscriptions.user_id = 52