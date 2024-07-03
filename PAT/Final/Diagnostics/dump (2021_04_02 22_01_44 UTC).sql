-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: pat_sandbox
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `groupings`
--

DROP TABLE IF EXISTS `groupings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupings` (
  `grouping_id` tinyint NOT NULL AUTO_INCREMENT,
  `section_id` tinyint DEFAULT NULL,
  `name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`grouping_id`),
  KEY `FK_groupings_section_id` (`section_id`),
  CONSTRAINT `FK_groupings_section_id` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupings`
--

LOCK TABLES `groupings` WRITE;
/*!40000 ALTER TABLE `groupings` DISABLE KEYS */;
INSERT INTO `groupings` VALUES (-6,6,'To See Staff'),(-5,5,'Restrictions'),(-4,4,'Sanatorium'),(-3,3,'Clubs and Societies'),(-2,2,'Sport'),(-1,1,'General Notices'),(1,1,'Uni'),(3,1,'Lost and Found'),(4,3,'Chapel Choir'),(5,2,'Gym Times'),(6,3,'Debating Society'),(7,3,'Snell Society'),(8,3,'Investment Club'),(9,3,'Flying Club'),(10,2,'Squash'),(11,1,'Service'),(12,1,'Theatre'),(13,1,'Exchange'),(14,1,'Music'),(15,2,'Hockey'),(32,2,'Basketball'),(34,1,'Journey');
/*!40000 ALTER TABLE `groupings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentions`
--

DROP TABLE IF EXISTS `mentions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentions` (
  `notice_id` smallint NOT NULL,
  `user_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`notice_id`),
  KEY `FK_mentions_notice_id` (`notice_id`),
  CONSTRAINT `FK_mentions_notice_id` FOREIGN KEY (`notice_id`) REFERENCES `notices` (`notice_id`),
  CONSTRAINT `FK_mentions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentions`
--

LOCK TABLES `mentions` WRITE;
/*!40000 ALTER TABLE `mentions` DISABLE KEYS */;
INSERT INTO `mentions` VALUES (5,11),(10,12),(10,13),(11,17),(11,18),(12,20),(12,21),(13,22),(13,23),(14,26),(14,27),(15,26),(15,28),(18,28),(18,41),(19,52),(19,53),(26,54),(26,55),(29,56),(30,57),(31,58),(32,61),(32,62),(33,63),(33,64),(34,59),(34,60),(35,65),(35,66),(36,67),(36,68),(37,23),(37,69),(38,26),(38,27),(39,72),(39,73);
/*!40000 ALTER TABLE `mentions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `notice_id` smallint NOT NULL AUTO_INCREMENT,
  `user_id` smallint unsigned NOT NULL,
  `publish_date` datetime NOT NULL,
  `display_date` date NOT NULL DEFAULT '2020-02-25',
  `grouping_id` tinyint DEFAULT NULL,
  `title` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approval_status` enum('Pending','Denied','Approved') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`notice_id`),
  KEY `FK_notices_user_id` (`user_id`),
  KEY `FK_notices_grouping_id` (`grouping_id`),
  CONSTRAINT `FK_notices_grouping_id` FOREIGN KEY (`grouping_id`) REFERENCES `groupings` (`grouping_id`),
  CONSTRAINT `FK_notices_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notices`
--

LOCK TABLES `notices` WRITE;
/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
INSERT INTO `notices` VALUES (1,1,'2020-02-05 00:00:00','2020-02-21',1,'University Visits','Who: Crimson - They help to get sports scholarships at universities in the USA.\nWhen: **Today** @ 14h05.\nWhere: LO Classrooms.','Approved'),(3,8,'2020-02-20 00:00:00','2020-02-21',3,'Lost','An apple watch and an analogue watch were left in indoor centre during Wednesday\'s inter-house basketball. If they belong to you see Mr Sliedrecht in the Science office.','Pending'),(4,6,'2020-01-21 00:00:00','2020-02-21',4,'Chapel Choir','Choir workshop times for the weekend will be as follows: \r\n**Today** 15h00 - 17h30 and Sunday 10h30 - 13h00.','Denied'),(5,6,'2020-02-19 00:00:00','2020-02-21',3,'Lost','school bag belonging to Callum James. Please speak to Mr Forword if found.','Pending'),(6,1,'2020-01-16 00:00:00','2020-02-21',5,'Gym Times','05h30 - 06h15\n14h45 - 17h30\n20h20 - 21h00','Denied'),(7,4,'2020-02-20 00:00:00','2020-02-21',6,'Debating Society','meeting on Sunday directly after chapel in Mr Smith Classroom. We will be focusing on impromptu speech training in preparation for inter-house events. Anyone interested in learning a bit about this skill is welcome.','Pending'),(8,5,'2020-02-14 17:32:17','2020-02-21',7,'Snell Society','there is a Snell Society meeting this Sunday at 19h45 in the Centenary Centre. Nathan Bau and Sam Frost will be doing their presentations. Staff and boys are encouraged to attend.','Pending'),(9,5,'2020-02-13 00:00:00','2020-02-21',8,'Investment Club','Meeting in the media centre on Friday evening at 19h15','Pending'),(10,8,'2020-02-20 00:00:00','2020-02-21',-4,'Physio with Kirsty Marsh in the First Aid Room','14h00 I Parsons; 14h30 J Weyers; 15h00 J Baxter; 15h30 A Young; 16h00 J Quinn','Pending'),(11,5,'2020-02-20 00:00:00','2020-02-21',-4,'Physio with Leanne St Clair in First Aid Room','14h30 A Xulu; 15h00 K Asumaning; 15h30 M Spencer','Pending'),(12,4,'2020-02-21 00:00:00','2020-02-21',-4,'San Transport Leaving @ 13h50','C MacColl; O Currie','Pending'),(13,1,'2020-02-21 00:00:00','2020-02-21',-4,'Please Come and Collect your Antibiotics in the San','E Hamilton; J James; C Vermaak; R Leslie','Pending'),(14,8,'2020-02-21 00:00:00','2020-02-21',-4,'Please Collect your Medicine in the San','T Deist; M Ross','Pending'),(15,5,'2020-02-21 00:00:00','2020-02-21',-5,'Saturday Night Restrictions','B Banda, T Deist, K Eni, V Getyengana, K Jonathan, A McHardy, J Ncamani, S Ncube, Z Nhlanguelela, J Rencken, P van der Hoven, A Vere, T Wright, A Zungu','Pending'),(16,6,'2020-02-24 00:00:00','2020-02-25',-1,'All B Block Boys','To meet in the KLT **today at 14h05**','Pending'),(17,6,'2020-02-11 00:00:00','2020-02-25',11,'Service','**Tatham C Block - Esiphetwini:** Wednesday 14h10 at the turning circle\r\n**West C Block - Notties Prep:** Wednesday 14h10 at the turning circle','Approved'),(18,8,'2020-02-11 00:00:00','2020-02-25',11,'B Block Smile Programme','The following boys who signed up for SMILE classes in the first quarter, please meet at the squash court parking area **tomorrow** afternoon at 14h10:\r\nTristan Baker; Bradley Banda; Ayanda Cele; Thomas Deist; Nicholas Howarth; Benjamin Jarvis; Ross Keep; Matthew Marx; Simon Le Vieux; Siyabonga Ncube; Dilan Patel; Heinrich Reyneke; Sello Stone-Mboweni; Anthony Turner.','Pending'),(19,6,'2020-02-12 00:00:00','2020-02-25',11,'B Block Service Representatives','Please meet Mr Coventry in the Media Centre after Chapel **tomorrow**: K Ramnath; C Leisegang; R Fleming; R le Sueur; B Seeiso; V Getyengana ; J Jordaan; N Manyara; T Deist; J-L Ferreira; N Holt','Pending'),(20,4,'2020-02-24 00:00:00','2020-02-25',12,'Inter House Theatre','Two representatives from each house to come to drama classroom **tonight** at 19h30 for playwright introduction and inter house competition rules.','Pending'),(22,1,'2020-02-25 00:00:00','2020-02-25',1,'University Visits','Who: **University of Pretoria**\r\nWhen: **Today** @ 16h30\r\nWhere: KLT','Pending'),(24,5,'2020-02-20 00:00:00','2020-02-25',4,'Chapel Choir','Rehearsals and performances for this week are as follows: Monday and Thursday 17h30 to 18h40; Tuesday 17h20 to 17h50 (due to the Pancake Race); Wednesday 07h30 (Full School Eucharist performance); Friday 18h00 to meet in Chapel for warm-up prior to @Bandroom performance.','Pending'),(25,6,'2020-02-19 00:00:00','2020-02-25',15,'Open Hockey Players','Aitkens astro : Tomorrow 14h45 - 16h00. All open hockey players to attend match sessions for 2nds-5ths.','Pending'),(26,8,'2020-02-23 00:00:00','2020-02-25',10,'Senior Squash Team vs Hilton College','Away **tomorrow** - Bus leaves at 14h00. R Ingledew, C Oellermann, M Ross┬®, M Flanegan, N Bedingham, J Irons, A Nduru, B Harper Dress: Blue shirts, white shorts','Pending'),(27,4,'2020-02-24 00:00:00','2020-02-25',9,'Flying Club','All boys joining the flying club just meet Mr Silk at 14h05 in the music school to discuss this weekendÔÇÖs Flying','Pending'),(28,8,'2020-02-23 00:00:00','2020-02-25',-4,'Please will all paddlers collect medication for Dusi Marathon from the San',NULL,'Pending'),(29,4,'2020-02-25 00:00:00','2020-02-25',-4,'Special Transport at 12h15','M Hamilton','Pending'),(30,1,'2020-02-25 00:00:00','2020-02-25',-4,'Please Report to the San for Impact Test','S Femi-Kayode','Pending'),(31,5,'2020-02-25 00:00:00','2020-02-25',-4,'Please Report to the San for Removal of POP','A Furby','Pending'),(32,8,'2020-02-18 00:00:00','2020-02-25',-4,'Physio with Kirsty Marsh in the First Aid Room','14h00 T Gwiliza; 14h30 K Shazi; 15h00 I Parsons; 16h00 L Granat; 16h30 A Young; 17h00 L Tibshraeny','Pending'),(33,1,'2020-02-18 00:00:00','2020-02-25',-4,'Physio with Leanne St Clair in First Aid Room','14h00 M Christodoulou; 14h30 L van Aardt; 15h00 M Solms; 15h30 S Heinamann; 16h00 A Xulu; 16h30 K Asumaning','Pending'),(34,6,'2020-02-20 00:00:00','2020-02-25',-4,'Assessment with James Fleming in the San at 10h00','H Moller; J Ncamani; A Mkhize','Pending'),(35,6,'2020-02-21 00:00:00','2020-02-25',-4,'Biokinetics with Paul Candler in the New Gym','14h00 J Capazorio; 14h20 L Kaufmann; 14h40 L Tibshraeny/B Oellermann; 15h00 D Hough; 15h20 X Gqweta; 15h40 K Mpobole; 16h00 C Oellermann; 16h20 D du Toit','Pending'),(36,1,'2020-02-19 00:00:00','2020-02-25',-4,'Dr Cook\'s Clinic 16h40 in the San','J Kennedy; K Rathepe; K Mashiyi; M Doyle; M Mlangeni; H Giles; A Mulla; S Apaa; J Trindad','Pending'),(37,4,'2020-02-24 00:00:00','2020-02-25',-4,'Please Come and Collect Your Antibiotics in the San','R Dalais; J James; N Sefara; A Vere; P Hein; S Apaa; B Mitchell-Innes; M Molefi','Pending'),(38,5,'2020-02-25 00:00:00','2020-02-25',-4,'Please Collect Your Medicine in the San','T Deist; M Ross; D Stubbs; N Kuhn; R Pickard; J Gehren; R Borley','Pending'),(39,5,'2020-02-24 00:00:00','2020-02-25',-5,'Tuesday Restrictions : Room 1 : 14h30-16h00 : HdT','Failure to attend Weekday Restrictions will result in an automatic Saturday Night Restriction ÔÇô No Exceptions \r\nBoys must bring their homework \r\nBoys must arrive on time \r\nNo music or earphones permitted \r\nMatthew Asherson, Oliver Bekker, Enrique Benassi, Danilo Ceronio, Anesu Chasi Blake Chittenden, Ethan Cockram, Remi Dalais, Miguel de Freitas, Luke Granat, Joshua James, Alban le Vieux, Mufaro Madiro, Greg McGlashan, Ano McHardy, Thomas Mitchell, Wandile Mlaba, Hugo Phipson, Heinrich Reyneke, George Scott Ethan Stewart, Jack Sutherland, Tom Telford, Liam van Aardt, Graham Wynne, Bayanda Zuma','Pending'),(56,6,'2020-10-05 15:36:11','2020-10-06',9,'GSM','Come for a good time, the best time ;)','Denied'),(57,6,'2020-10-11 08:12:55','2020-10-11',3,'Lost and Found','hello','Pending');
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `section_id` tinyint NOT NULL,
  `name` char(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` tinyint DEFAULT NULL,
  PRIMARY KEY (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'General Notices',2),(2,'Sport',3),(3,'Clubs and Societies',4),(4,'Sanatorium',5),(5,'Restrictions',6),(6,'To See Staff',1);
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `user_id` smallint unsigned NOT NULL,
  `admin_no` smallint unsigned NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_students_admin_no` (`admin_no`),
  CONSTRAINT `FK_students_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (10,1493),(26,1504),(73,1527),(21,1529),(22,1530),(23,2762),(68,2764),(72,2796),(11,2802),(9,3592),(61,3603),(65,3649),(62,3674),(2,4766),(13,4830),(54,5603),(27,5608),(28,5620),(67,5648),(63,5662),(41,6589),(53,6597),(64,6661),(66,6662),(55,7583),(52,7584),(59,7603),(17,7627),(58,7635),(60,7640),(57,8517),(20,8521),(3,8523),(56,9039),(12,10022),(18,10039),(69,10050),(7,10111);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `user_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `grouping_id` tinyint NOT NULL,
  PRIMARY KEY (`user_id`,`grouping_id`),
  CONSTRAINT `FK_subscriptions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,1),(3,12),(4,1),(4,10),(5,9),(6,1),(6,4),(6,5),(6,7),(6,12),(7,6),(8,10),(9,12),(11,12),(12,9),(13,2),(17,12),(18,2),(20,8),(21,15),(23,2),(23,7),(26,9),(27,9),(28,9),(41,8),(52,2),(52,3),(52,4),(52,7),(52,8),(52,20),(53,7),(53,14),(54,1),(54,14),(56,7),(57,12),(58,7),(59,2),(61,2),(63,15),(64,5),(64,14),(66,2),(67,8),(67,9),(68,1),(68,15),(69,4),(69,13),(73,3),(73,11);
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `rights` enum('Students','Staff','Admins') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` char(62) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Staff','Glennie','Murrish','gmurri','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(2,'Students','Bone','Crocket','boncro','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(3,'Students','Vivi','Canty','vivcan','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(4,'Staff','Reyna','Kidds','rkidds','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(5,'Staff','Paxton','Braidley','pbraid','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(6,'Admins','Candace','Peacher','cpeach','$2a$12$zIrPEPbXGMqmBfiDwxCyAeZ94dZxwkyUfquja330Y/rwseAvW2YX6'),(7,'Students','Jenine','Holdron','jenhol','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(8,'Admins','Alf','Roddie','aroddi','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(9,'Students','Silvano','Deegan','sildee','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(10,'Students','Twyla','Colrein','twycol','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(11,'Students','Callum','James','caljam','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(12,'Students','Ian','Parsons','ianpar','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(13,'Students','Johan','Weyers','johwey','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(17,'Students','Abongile','Xulu','aboxul','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(18,'Students','Kofi','Asumaning','kofasu','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(20,'Students','Conor','MacColl','conmac','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(21,'Students','Oliver','Currie','olicur','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(22,'Students','Edward','Hamilton','edwham','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(23,'Students','Joshua','James','josjam','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(26,'Students','Thomas','Deist','thodei','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(27,'Students','Michael','Ross','micros','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(28,'Students','Bradley','Banda','braban','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(41,'Students','Tristan','Baker','tribak','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(52,'Students','Keemal','Ramnath','keeram','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(53,'Students','Chase','Leisegang','chalei','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(54,'Students','Raiffe','Ingledew','raiing','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(55,'Students','Connor','Oellermann','conoel','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(56,'Students','Mitchell','Hamilton','mitham','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(57,'Students','Simi','Femi-Kayode','simfem','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(58,'Students','Aiden','Furby','aidfur','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(59,'Students','Harry','Moller','harmol','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(60,'Students','Junior','Ncamani','junnca','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(61,'Students','Theo','Gwiliza','thegwi','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(62,'Students','Kwanele','Shazi','kwasha','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(63,'Students','Michael','Christodoullou','micchr','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(64,'Students','Liam','van Aardt','liavan','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(65,'Students','Josh','Capazorio','joscap','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(66,'Students','Luke','Kaufmann','lukkau','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(67,'Students','James','Kennedy','jamken','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(68,'Students','Kamohelo','Rathepe','kamrat','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(69,'Students','Remi','Dalais','remdal','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(72,'Students','Matthew','Asherson','matash','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(73,'Students','Oliver','Bekker','olibek','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(74,'Admins','Test','Admin','admin','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(75,'Staff','Test','Staff','staff','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(76,'Students','Test','Pupil','pupil','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu'),(77,'Students','hi','lo','¤à╩éÊ¢╔¥╔│╬▒╔▒Ê¢','$2y$12$h7.4LU3ZQd09NLVrVRKD8.5xfxXnqo5HbfFSIiRBV3iR.Iy9zMPdu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'pat_sandbox'
--
/*!50003 DROP PROCEDURE IF EXISTS `addSubs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addSubs`(IN u_id SMALLINT, IN idsToAdd VARCHAR(255))
BEGIN



  DECLARE front TEXT DEFAULT NULL;

  DECLARE frontlen INT DEFAULT NULL;

  DECLARE TempValue TEXT DEFAULT NULL;

  iterator:

    LOOP  

      IF LENGTH(TRIM(idsToAdd)) = 0 OR idsToAdd IS NULL THEN

        LEAVE iterator;

      END IF;

      SET front = SUBSTRING_INDEX(idsToAdd,',',1);

      SET frontlen = LENGTH(front);

      SET TempValue = TRIM(front);

      INSERT INTO subscriptions (user_id, grouping_id) VALUES (u_id, TempValue);

      SET idsToAdd = INSERT(idsToAdd,1,frontlen + 1,'');

    END LOOP;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `editNotice` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `editNotice`(IN _notice_id VARCHAR(255), IN _title CHAR(100), IN _description VARCHAR(1000), IN _rights TINYINT)
BEGIN

  IF LENGTH(_title) > 0 THEN

    UPDATE notices

    SET title = _title

    WHERE notice_id = _notice_id;

  END IF;



  IF LENGTH(_description) > 0 THEN

    UPDATE notices

    SET description = _description

    WHERE notice_id = _notice_id;

  END IF;



  IF _rights < 3 THEN

    UPDATE notices

    SET approval_status = 1

    WHERE notice_id = _notice_id;

  END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `groupsDeleteRecursive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `groupsDeleteRecursive`(IN _id TINYINT)
BEGIN

  DELETE from notices

  WHERE grouping_id = _id;

  DELETE from groupings

  WHERE grouping_id = _id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tagStudents` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `tagStudents`(IN n_id SMALLINT, IN idsToAdd VARCHAR(255))
BEGIN

  DECLARE front TEXT DEFAULT NULL;

  DECLARE frontlen INT DEFAULT NULL;

  DECLARE TempValue TEXT DEFAULT NULL;

  iterator:

    LOOP  

      IF LENGTH(TRIM(idsToAdd)) = 0 OR idsToAdd IS NULL THEN

        LEAVE iterator;

      END IF;

      SET front = SUBSTRING_INDEX(idsToAdd,',',1);

      SET frontlen = LENGTH(front);

      SET TempValue = TRIM(front);

      INSERT INTO mentions (notice_id, user_id) VALUES (n_id, TempValue);

      SET idsToAdd = INSERT(idsToAdd,1,frontlen + 1,'');

    END LOOP;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-19 19:51:32
