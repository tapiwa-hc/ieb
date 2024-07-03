SELECT
  notices.title,
  notices.description,
  notices.display_date,
  subscriptions.user_id,
  subscriptions.grouping_id
FROM notices
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
  INNER JOIN subscriptions
    ON subscriptions.grouping_id = groupings.grouping_id
WHERE subscriptions.user_id = 52