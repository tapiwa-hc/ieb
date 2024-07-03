CREATE TABLE `users` (
  `user_id` smallint PRIMARY KEY,
  `rights` enum,
  `first_name` char,
  `surname` char,
  `username` char,
  `password` char
);

CREATE TABLE `students` (
  `user_id` smallint PRIMARY KEY,
  `admin_no` smallint UNIQUE
);

CREATE TABLE `notices` (
  `notice_id` smallint PRIMARY KEY,
  `user_id` smallint,
  `publish_date` datetime,
  `display_date` date,
  `group_id` tinyint,
  `title` char,
  `description` varchar(255),
  `approval_status` enum
);

CREATE TABLE `groups` (
  `group_id` tinyint PRIMARY KEY,
  `category_id` tinyint,
  `name` char
);

CREATE TABLE `categories` (
  `category_id` tinyint PRIMARY KEY,
  `name` char
);

CREATE TABLE `subscriptions` (
  `user_id` smallint,
  `group_id` tinyint,
  PRIMARY KEY (`user_id`, `group_id`)
);

CREATE TABLE `mentions` (
  `notice_id` smallint,
  `user_id` smallint,
  PRIMARY KEY (`notice_id`, `user_id`)
);

ALTER TABLE `students` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `notices` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `notices` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `groups` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

ALTER TABLE `subscriptions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `subscriptions` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `mentions` ADD FOREIGN KEY (`notice_id`) REFERENCES `notices` (`notice_id`);

ALTER TABLE `mentions` ADD FOREIGN KEY (`user_id`) REFERENCES `students` (`user_id`);

