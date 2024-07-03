INSERT INTO notices (user_id, publish_date, display_date, grouping_id, title, description)
  VALUES (1, NOW(), 1990 - 01 - 01, 1, "The Title", "The Description");

INSERT INTO mentions (notice_id, user_id)
  VALUES (2, 3);