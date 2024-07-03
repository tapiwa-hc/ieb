SELECT
  notices.title,
  notices.description,
  notices.display_date
FROM notices
  INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
  INNER JOIN subscriptions
    ON subscriptions.grouping_id = groupings.grouping_id
  INNER JOIN mentions
    ON mentions.notice_id = notices.notice_id
WHERE mentions.user_id = 52