(SELECT notices.*
FROM subscriptions, notices
WHERE subscriptions.user_id = 52
AND subscriptions.grouping_id = notices.grouping_id)
UNION

(SELECT notices.*
FROM mentions, notices
WHERE mentions.user_id = 52
AND mentions.notice_id = notices.notice_id);

SELECT a.*, b.*
FROM (SELECT notices.*
      FROM subscriptions, notices
      WHERE subscriptions.user_id = 52
      AND subscriptions.grouping_id = notices.grouping_id) a,
      (SELECT notices.*
      FROM mentions, notices
      WHERE mentions.user_id = 52
      AND mentions.notice_id != notices.notice_id) b;
                                              
