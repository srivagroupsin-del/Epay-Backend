CREATE DATABASE  IF NOT EXISTS `category_eparecharge_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `category_eparecharge_db`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: category_eparecharge_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `module` varchar(50) NOT NULL,
  `record_id` bigint(20) unsigned NOT NULL,
  `action` enum('create','update','delete') NOT NULL,
  `old_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_data`)),
  `new_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,1,'sector_title',14,'create',NULL,'{\"name\":\"hari4\",\"image_path\":null}','2026-01-23 06:13:13'),(2,1,'sector_title',14,'update',NULL,'{\"name\":\"hari14\",\"image_path\":null}','2026-01-23 06:25:43'),(3,1,'sector_title',14,'delete',NULL,NULL,'2026-01-23 06:36:08'),(4,1,'sector_title',15,'create',NULL,'{\"user_id\":\"1\",\"name\":\"user\",\"description\":\"llll\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":null}','2026-01-23 08:20:11'),(5,1,'sector_title',15,'update',NULL,'{\"user_id\":\"1\",\"name\":\"user\",\"description\":\"llll\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"inactive\",\"image_path\":null}','2026-01-23 08:29:53'),(6,1,'sector_title',15,'delete',NULL,NULL,'2026-01-23 09:43:43'),(7,1,'sector_title',13,'delete',NULL,NULL,'2026-01-23 09:43:51'),(8,1,'sector',6,'create',NULL,'{\"sector_title_id\":\"12\",\"sector_name\":\"ballon\",\"description\":\"dddd\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image\":null}','2026-01-24 05:33:41'),(9,1,'sector',7,'create',NULL,'{\"sector_title_id\":\"12\",\"sector_name\":\"speaker\",\"description\":\"wwww\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image\":null}','2026-01-24 05:34:31'),(10,1,'sector_title',16,'create',NULL,'{\"user_id\":\"1\",\"name\":\"kkk\",\"description\":\"ggg\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":null}','2026-01-24 05:41:35'),(11,1,'sector_title',16,'update',NULL,'{\"user_id\":\"1\",\"name\":\"kkk\",\"description\":\"ggg\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1769233318673-820893534.png\"}','2026-01-24 05:41:58'),(12,1,'sector_title',16,'delete',NULL,NULL,'2026-01-24 05:42:05'),(13,1,'sector',12,'update',NULL,'[5]','2026-01-24 05:47:45'),(14,1,'sector',10,'update',NULL,'[7]','2026-01-24 05:48:00'),(15,1,'sector',12,'update',NULL,'[7]','2026-01-24 05:48:29'),(16,1,'sub_sector',5,'create',NULL,'{\"sector_title_id\":\"12\",\"sector_id\":\"6\",\"sub_sector_name\":\"cast\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"status\":\"Active\",\"image\":null}','2026-01-24 05:51:57'),(17,2,'sector_title',17,'create',NULL,'{\"user_id\":\"1\",\"name\":\"phone\",\"description\":\"aaa\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1769234488318-659482780.png\"}','2026-01-24 06:01:28'),(18,2,'sector',8,'create',NULL,'{\"sector_title_id\":\"17\",\"sector_name\":\"vivo\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image\":null}','2026-01-24 06:01:54'),(19,2,'sector',17,'update',NULL,'[6]','2026-01-24 06:02:19'),(20,2,'sub_sector',6,'create',NULL,'{\"sector_title_id\":\"17\",\"sector_id\":\"8\",\"sub_sector_name\":\"cast\",\"description\":\"200000\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"status\":\"Active\",\"image\":null}','2026-01-24 06:02:49'),(21,2,'category',22,'create',NULL,NULL,'2026-01-24 06:04:03'),(22,2,'category',21,'update',NULL,'\"bulkConvertToSecondary\"','2026-01-24 06:04:53'),(23,2,'category',22,'update',NULL,'\"remapMultipleSecondary\"','2026-01-24 06:07:48'),(24,2,'sub_sector',2,'update',NULL,'{\"sector_title_id\":\"\",\"sector_id\":\"3\",\"sub_sector_name\":\"aravind\",\"description\":\"ak des\",\"info\":\"ak info\",\"note\":\"ak note\",\"system_note\":\"ak sys note\",\"status\":\"active\",\"image\":null}','2026-01-24 06:10:37'),(25,2,'brand',11,'create',NULL,'{\"brand_name\":\"kkk\",\"description\":\"sss\",\"info\":\"ggg\",\"note\":\"\",\"system_note\":\"\",\"icon_text\":\"\",\"link\":\"\",\"status\":\"active\",\"image\":\"1769236021048-502807495.png\"}','2026-01-24 06:27:01'),(26,2,'brand',12,'create',NULL,'{\"brand_name\":\"kkk2\",\"description\":\"gggg\",\"info\":\"fff\",\"note\":\"\",\"system_note\":\"\",\"icon_text\":\"\",\"link\":\"\",\"status\":\"active\",\"image\":null}','2026-01-24 06:29:39'),(27,2,'brand',12,'delete',NULL,NULL,'2026-01-24 06:29:52'),(28,2,'sector',12,'update',NULL,'[8]','2026-01-24 08:31:32'),(29,2,'sector',17,'update',NULL,'[8]','2026-01-24 08:31:44'),(30,2,'category_brand_mapping',5,'update',NULL,'\"{\\\"assigned_brands\\\":[11]}\"','2026-01-24 09:41:56'),(31,2,'category_brand_mapping',3,'update',NULL,'\"{\\\"assigned_brands\\\":[11]}\"','2026-01-24 09:42:18'),(32,2,'category_brand_mapping',5,'update',NULL,'\"{\\\"assigned_brands\\\":[11]}\"','2026-01-24 09:55:41'),(33,2,'category_brand_mapping',5,'update',NULL,'\"{\\\"assigned_brands\\\":[11]}\"','2026-01-24 09:56:07'),(34,2,'product',4,'create',NULL,'{\"product_name\":\"ooo\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"\",\"status\":\"active\"}','2026-01-27 05:27:43'),(35,2,'product',4,'delete',NULL,NULL,'2026-01-27 05:39:49'),(36,2,'product',6,'create',NULL,'{\"product_name\":\"aaa\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"4\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"\",\"status\":\"active\"}','2026-01-27 05:45:35'),(37,2,'product',7,'create',NULL,'{\"product_name\":\"ooo\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"1001\",\"status\":\"active\",\"base_image\":\"1769493569569-345048496.png\"}','2026-01-27 05:59:29'),(38,2,'product',6,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"4\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"null\",\"status\":\"active\",\"base_image\":\"1769493585899-29973269.png\"}','2026-01-27 05:59:45'),(39,2,'product',6,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"4\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"1000000000000\",\"status\":\"active\",\"base_image\":\"1769493648657-352820399.png\"}','2026-01-27 06:00:48'),(40,2,'product',7,'update',NULL,'{\"product_name\":\"ooo\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"1002\",\"status\":\"active\",\"base_image\":\"1769493685639-429745696.png\"}','2026-01-27 06:01:25'),(41,2,'product',8,'create',NULL,'{\"product_name\":\"aaa\",\"model\":\"te123\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"122\",\"status\":\"active\",\"base_image\":\"1769494035052-168732237.png\"}','2026-01-27 06:07:15'),(42,2,'product',9,'create',NULL,'{\"product_name\":\"aaa\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"\",\"status\":\"active\",\"base_image\":\"1769496184903-410639099.png\"}','2026-01-27 06:43:04'),(43,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"121\",\"status\":\"active\",\"base_image\":\"1769496900959-143502842.png\"}','2026-01-27 06:55:00'),(44,2,'product',6,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"4\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"1222221\",\"status\":\"active\"}','2026-01-27 07:04:52'),(45,2,'product',6,'delete',NULL,NULL,'2026-01-27 07:05:05'),(46,2,'product',7,'delete',NULL,NULL,'2026-01-27 07:05:10'),(47,2,'product',8,'delete',NULL,NULL,'2026-01-27 07:05:15'),(48,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12000\",\"status\":\"active\"}','2026-01-27 07:05:36'),(49,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"1199\",\"status\":\"active\"}','2026-01-27 07:06:10'),(50,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"90\",\"price\":\"90\",\"status\":\"active\"}','2026-01-27 07:07:58'),(51,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"11\",\"price\":\"11\",\"status\":\"active\"}','2026-01-27 07:08:48'),(52,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"9\",\"price\":\"9\",\"status\":\"active\"}','2026-01-27 07:09:28'),(53,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"128\",\"price\":\"128\",\"status\":\"active\"}','2026-01-27 07:13:09'),(54,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"119\",\"price\":\"119\",\"status\":\"active\"}','2026-01-27 07:14:18'),(55,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"10\",\"price\":\"10\",\"status\":\"active\"}','2026-01-27 07:25:31'),(56,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"8\",\"price\":\"8\",\"status\":\"active\"}','2026-01-27 07:26:30'),(57,2,'product',10,'create',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"\",\"price\":\"\",\"status\":\"active\"}','2026-01-27 07:27:11'),(58,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"122\",\"price\":\"122\",\"status\":\"active\",\"base_image\":\"1769498850068-389392755.png\"}','2026-01-27 07:27:30'),(59,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"11\",\"price\":\"11\",\"status\":\"active\"}','2026-01-27 07:57:20'),(60,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"121\",\"price\":\"121\",\"status\":\"active\"}','2026-01-27 07:59:48'),(61,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"11\",\"price\":\"11\",\"status\":\"active\"}','2026-01-27 08:00:49'),(62,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"1200\",\"price\":\"1200\",\"status\":\"active\"}','2026-01-27 08:09:54'),(63,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"2000\",\"price\":\"2000\",\"status\":\"active\"}','2026-01-27 08:10:12'),(64,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"2000\",\"price\":\"2000\",\"status\":\"active\"}','2026-01-27 08:10:37'),(65,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"2000\",\"price\":\"2000\",\"status\":\"active\"}','2026-01-27 08:11:14'),(66,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"3000\",\"price\":\"3000\",\"status\":\"active\"}','2026-01-27 08:12:50'),(67,2,'product',3,'update',NULL,'{\"product_name\":\"iPhone 15\",\"model\":\"A3102\",\"brand_id\":\"5\",\"primary_category_id\":\"2\",\"secondary_category_id\":\"18\",\"description\":\"Apple smartphone\",\"info\":\"256GB, Titanium body\",\"note\":\"Top seller\",\"mrp\":\"129999\",\"price\":\"129999\",\"status\":\"active\"}','2026-01-27 08:13:02'),(68,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12\",\"price\":\"12\",\"status\":\"active\"}','2026-01-27 08:15:53'),(69,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12\",\"price\":\"12\",\"status\":\"active\"}','2026-01-27 08:16:19'),(70,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"1000\",\"price\":\"1000\",\"status\":\"active\"}','2026-01-27 08:18:13'),(71,2,'product',11,'create',NULL,'{\"product_name\":\"llll\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12000\",\"price\":\"12000\",\"status\":\"active\"}','2026-01-27 08:19:56'),(72,2,'product',11,'update',NULL,'{\"product_name\":\"llll\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12000\",\"price\":\"12000\",\"status\":\"active\"}','2026-01-27 08:20:07'),(73,2,'product',11,'update',NULL,'{\"product_name\":\"llll\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"17000\",\"price\":\"17000\",\"status\":\"active\"}','2026-01-27 08:20:32'),(74,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"122\",\"price\":\"122\",\"status\":\"active\"}','2026-01-27 08:24:16'),(75,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"120\",\"status\":\"active\"}','2026-01-27 08:26:00'),(76,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12\",\"status\":\"active\"}','2026-01-27 08:57:42'),(77,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12\",\"status\":\"active\"}','2026-01-27 08:57:50'),(78,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12222\",\"status\":\"active\"}','2026-01-27 09:07:32'),(79,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12\",\"status\":\"active\"}','2026-01-27 09:07:51'),(80,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"19\",\"price\":\"19\",\"status\":\"active\"}','2026-01-27 09:08:31'),(81,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"11\",\"price\":\"11\",\"status\":\"active\"}','2026-01-27 09:10:45'),(82,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12\",\"price\":\"12\",\"status\":\"active\"}','2026-01-27 09:11:12'),(83,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"29\",\"price\":\"29\",\"status\":\"active\"}','2026-01-27 09:13:36'),(84,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"28\",\"price\":\"28\",\"status\":\"active\"}','2026-01-27 09:13:57'),(85,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"2\",\"price\":\"2\",\"status\":\"active\"}','2026-01-27 09:27:53'),(86,2,'product',11,'update',NULL,'{\"product_name\":\"llll\",\"model\":\"audio\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"12000.00\",\"price\":\"12000.00\",\"status\":\"active\",\"base_image\":\"1769506460814-999254231.png\"}','2026-01-27 09:34:20'),(87,1,'dynamic_table',1,'create',NULL,'{\"dynamic_page_id\":1,\"table_name\":\"about_page_form\"}','2026-01-27 09:43:13'),(88,1,'dynamic_field',1,'create',NULL,'{\"dynamic_table_id\":1,\"label\":\"Company Name\",\"field_name\":\"company_name\",\"field_type\":\"text\",\"placeholder\":\"Enter company name\",\"is_required\":1}','2026-01-27 09:44:00'),(89,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"10\",\"primary_category_id\":\"4\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"28.00\",\"price\":\"28.00\",\"status\":\"active\"}','2026-01-27 09:44:22'),(90,1,'dynamic_field',2,'create',NULL,'{\"dynamic_table_id\":1,\"label\":\"Company Type 2\",\"field_name\":\"company_type 2\",\"field_type\":\"select\",\"placeholder\":\"Select type\",\"is_required\":1}','2026-01-27 09:44:42'),(91,1,'dynamic_field_option',2,'create',NULL,'{\"field_id\":2,\"option_value\":\"private\",\"option_label\":\"Private Limited\",\"is_default\":0}','2026-01-27 09:45:15'),(92,1,'dynamic_record',1,'create',NULL,'{\"company_name\":\"SRIVA Groups\",\"company_type\":\"private\"}','2026-01-27 09:46:23'),(93,1,'dynamic_record',2,'create',NULL,'{\"company_name\":\"HARI Groups\",\"company_type\":\"GOVT\",\"sample feilds\":\"test\"}','2026-01-27 09:55:02'),(94,2,'category',5,'update',NULL,'\"bulkConvertToPrimary\"','2026-01-28 06:39:24'),(95,2,'category',5,'update',NULL,'\"bulkConvertToSecondary\"','2026-01-28 06:43:51'),(96,2,'sector_title',18,'create',NULL,'{\"user_id\":\"1\",\"name\":\"QQQ\",\"description\":\"QQQ\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1769583264526-289904093.png\"}','2026-01-28 06:54:24'),(97,2,'sector_title',18,'update',NULL,'{\"user_id\":\"1\",\"name\":\"QQQ\",\"description\":\"QQQ\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1769583439047-347098577.png\"}','2026-01-28 06:57:19'),(98,2,'sector_title',18,'delete',NULL,NULL,'2026-01-28 06:57:33'),(99,2,'sector_title',19,'create',NULL,'{\"user_id\":\"1\",\"name\":\"bk\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1769583787426-42354381.png\"}','2026-01-28 07:03:07'),(100,2,'category',12,'update',NULL,'\"bulkConvertToSecondary\"','2026-01-28 08:01:59'),(101,2,'category',13,'update',NULL,'\"bulkConvertToSecondary\"','2026-01-28 08:01:59'),(102,2,'category',22,'update',NULL,'\"bulkConvertToPrimary\"','2026-01-28 08:05:35'),(103,2,'sector',8,'update',NULL,'{\"sector_title_id\":\"17\",\"sector_name\":\"vivo 31\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"status\":\"active\",\"image\":\"1769588111126-745620041.png\"}','2026-01-28 08:15:11'),(104,2,'sector',17,'update',NULL,'[7]','2026-01-28 08:49:07'),(105,2,'sector_title',19,'update',NULL,'{\"user_id\":\"1\",\"name\":\"bk\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"inactive\",\"image_path\":null}','2026-01-28 08:55:28'),(106,2,'sector_title',19,'update',NULL,'{\"user_id\":\"1\",\"name\":\"bk\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"inactive\",\"image_path\":\"1769590562401-577697431.png\"}','2026-01-28 08:56:02'),(107,2,'sector_title',19,'update',NULL,'{\"user_id\":\"1\",\"name\":\"bk\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"inactive\",\"image_path\":null}','2026-01-28 08:59:12'),(108,2,'category',21,'update',NULL,'\"bulkConvertToPrimary\"','2026-01-28 09:11:22'),(109,2,'sector_title',20,'create',NULL,'{\"user_id\":\"1\",\"name\":\"FF\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1769591734051-523479115.png\"}','2026-01-28 09:15:34'),(110,2,'sector',9,'create',NULL,'{\"sector_title_id\":\"20\",\"sector_name\":\"vivo\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image\":\"1769591947891-976031294.png\"}','2026-01-28 09:19:07'),(111,2,'category',20,'update',NULL,'\"{\\\"operation\\\":\\\"bulkConvertToSecondary\\\",\\\"category_id\\\":20}\"','2026-01-29 02:19:52'),(112,2,'category',20,'update',NULL,'\"{\\\"operation\\\":\\\"bulkConvertToSecondary\\\",\\\"category_id\\\":20}\"','2026-01-29 02:24:17'),(113,2,'category_brand_mapping',22,'update',NULL,'\"{\\\"assigned_brands\\\":[]}\"','2026-01-29 02:58:36'),(114,2,'product',10,'update',NULL,'{\"product_name\":\"www\",\"model\":\"\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"5\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"2800\",\"price\":\"2800\",\"status\":\"active\"}','2026-01-29 03:24:31'),(115,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"80\",\"price\":\"80\",\"status\":\"active\"}','2026-01-29 03:24:48'),(116,2,'product',9,'update',NULL,'{\"product_name\":\"aaa\",\"model\":\"audio\",\"series\":\"\",\"alternative_name\":\"\",\"brand_id\":\"11\",\"primary_category_id\":\"3\",\"secondary_category_id\":\"\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"mrp\":\"200\",\"price\":\"200\",\"status\":\"active\"}','2026-01-29 03:28:54'),(117,2,'multitab_menu',6,'create',NULL,NULL,'2026-01-30 04:46:13'),(118,2,'multitab_menu',7,'create',NULL,NULL,'2026-01-30 04:46:26'),(119,2,'multitab_menu',8,'create',NULL,NULL,'2026-01-30 04:47:13'),(120,2,'multitab_menu',9,'create',NULL,NULL,'2026-01-30 04:56:44'),(121,2,'multitab_heading',7,'create',NULL,NULL,'2026-01-30 05:01:01'),(122,2,'multitab_heading',8,'create',NULL,NULL,'2026-01-30 05:01:08'),(123,2,'multitab_heading',9,'create',NULL,NULL,'2026-01-30 05:01:24'),(124,2,'sector_title',21,'create',NULL,'{\"user_id\":\"1\",\"name\":\"wfef\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":null}','2026-01-30 05:39:24'),(125,2,'multitab_menu',10,'create',NULL,NULL,'2026-01-30 06:05:37'),(126,2,'multitab_menu',11,'create',NULL,NULL,'2026-01-30 06:08:15'),(127,2,'multitab_menu',15,'create',NULL,NULL,'2026-01-30 06:50:55'),(128,2,'multitab_menu',16,'create',NULL,NULL,'2026-01-30 06:51:07'),(129,2,'multitab_menu',17,'create',NULL,NULL,'2026-01-30 06:51:19'),(130,2,'multitab_menu',18,'create',NULL,NULL,'2026-01-30 06:52:44'),(131,2,'multitab_menu',19,'create',NULL,NULL,'2026-01-30 06:53:06'),(132,2,'multitab_menu',20,'create',NULL,NULL,'2026-01-30 06:53:19'),(133,2,'multitab_menu',21,'create',NULL,NULL,'2026-01-30 06:54:31'),(134,2,'multitab_menu',22,'create',NULL,NULL,'2026-01-30 06:55:31'),(135,2,'multitab_menu',23,'create',NULL,NULL,'2026-01-30 06:57:18'),(136,2,'multitab_menu',24,'create',NULL,NULL,'2026-01-30 06:58:33'),(137,2,'multitab_menu',25,'create',NULL,NULL,'2026-01-30 07:08:33'),(138,2,'multitab_menu',26,'create',NULL,NULL,'2026-01-30 07:11:03'),(139,2,'multitab_menu',27,'create',NULL,NULL,'2026-01-30 07:13:38'),(140,2,'multitab_menu',28,'create',NULL,NULL,'2026-01-30 07:15:49'),(141,2,'multitab_menu',29,'create',NULL,NULL,'2026-01-30 07:17:01'),(142,2,'multitab_menu',30,'create',NULL,NULL,'2026-01-30 07:40:17'),(143,2,'multitab_menu',31,'create',NULL,NULL,'2026-01-30 07:49:29'),(144,2,'multitab_menu',32,'create',NULL,NULL,'2026-01-30 07:50:49'),(145,2,'multitab_menu',33,'create',NULL,NULL,'2026-01-30 07:53:12'),(146,2,'multitab_menu',34,'create',NULL,NULL,'2026-01-30 07:58:10'),(147,2,'multitab_menu',35,'create',NULL,NULL,'2026-01-30 08:32:14'),(148,2,'multitab_menu',36,'create',NULL,NULL,'2026-01-30 08:45:09'),(149,2,'multitab_menu',37,'create',NULL,NULL,'2026-01-30 09:01:32'),(150,2,'multitab_menu',38,'create',NULL,NULL,'2026-01-30 09:07:13'),(151,2,'multitab_menu',39,'create',NULL,NULL,'2026-01-30 09:08:51'),(152,2,'multitab_menu',40,'create',NULL,NULL,'2026-01-30 09:11:12'),(153,2,'multitab_menu',41,'create',NULL,NULL,'2026-01-30 09:15:00'),(154,2,'multitab_menu',42,'create',NULL,NULL,'2026-01-30 09:20:35'),(155,2,'multitab_menu',43,'create',NULL,NULL,'2026-01-30 09:22:28'),(156,2,'multitab_menu',44,'create',NULL,NULL,'2026-01-30 09:24:01'),(157,2,'multitab_menu',45,'create',NULL,NULL,'2026-01-30 09:26:10'),(158,2,'multitab_menu',46,'create',NULL,NULL,'2026-01-30 09:27:10'),(159,2,'multitab_menu',47,'create',NULL,NULL,'2026-01-30 09:29:19'),(160,2,'multitab_checkbox',11,'create',NULL,NULL,'2026-02-02 02:15:56'),(161,2,'sector_title',22,'create',NULL,'{\"user_id\":\"1\",\"name\":\"Kavin Bk\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1770095516324-189938493.png\"}','2026-02-03 05:11:56'),(162,2,'sector_title',22,'delete',NULL,NULL,'2026-02-03 05:12:06'),(163,2,'sector',19,'update',NULL,'[9]','2026-02-03 05:24:20'),(164,2,'sector',10,'create',NULL,'{\"sector_title_id\":\"20\",\"sector_name\":\"oo\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image\":null}','2026-02-03 05:25:12'),(165,2,'sector',19,'update',NULL,'[10]','2026-02-03 05:25:38'),(166,2,'sector_title',21,'update',NULL,'{\"user_id\":\"1\",\"name\":\"wfef\",\"description\":\"\",\"info\":\"\",\"note\":\"\",\"system_note\":\"\",\"icon_name\":\"\",\"link\":\"\",\"status\":\"active\",\"image_path\":\"1770196390129-697460071.png\"}','2026-02-04 09:13:10'),(167,2,'sector',20,'update',NULL,'[10]','2026-02-05 04:07:19');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(150) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `system_note` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Redmiss',NULL,'test redmi',NULL,NULL,'1768975861897-263360213.jpg',1,1,'inactive','2026-01-21 06:09:52','2026-01-21 06:11:01'),(2,'Apple',NULL,NULL,NULL,NULL,'uploads/brands/apple.png',1,1,'active','2026-01-21 07:28:05','2026-01-22 07:22:33'),(3,'Xiaomi','Budget smartphone brand','Value for money devices','Fast growing brand','Seed data','uploads/brands/xiaomi.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(4,'Realme','Smart devices brand','Youth focused products','Online popular brand','Seed data','uploads/brands/realme.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(5,'OnePlus','Flagship smartphone brand','Performance focused phones','Premium Android','Seed data','uploads/brands/oneplus.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(6,'Sony','Electronics and audio brand','Known for audio products','Quality brand','Seed data','uploads/brands/sony.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(7,'LG','Electronics brand','TVs and appliances','Trusted brand','Seed data','uploads/brands/lg.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(8,'Bosch','Electronics and tools','Industrial quality products','Global brand','Seed data','uploads/brands/bosch.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(9,'Arduino','Microcontroller boards','DIY electronics','Developer brand','Seed data','uploads/brands/arduino.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(10,'Boat','Audio accessories brand','Headphones and speakers','Indian brand','Seed data','uploads/brands/boat.png',1,1,'active','2026-01-21 07:28:05','2026-01-21 07:28:05'),(11,'kkk','sss','ggg',NULL,NULL,'1769236021048-502807495.png',1,1,'active','2026-01-24 06:27:01','2026-01-24 06:27:01'),(12,'kkk2','gggg','fff',NULL,NULL,NULL,0,1,'active','2026-01-24 06:29:39','2026-01-24 06:29:52');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sector_title_id` bigint(20) unsigned NOT NULL,
  `sector_id` bigint(20) unsigned NOT NULL,
  `sub_sector_id` bigint(20) unsigned NOT NULL,
  `category_type` enum('primary','secondary') NOT NULL DEFAULT 'primary',
  `parent_category_id` bigint(20) unsigned DEFAULT NULL,
  `category_name` varchar(150) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `system_note` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_category_sector_title` (`sector_title_id`),
  KEY `fk_category_sector` (`sector_id`),
  KEY `fk_category_sub_sector` (`sub_sector_id`),
  KEY `fk_category_parent` (`parent_category_id`),
  CONSTRAINT `fk_category_parent` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_category_sector` FOREIGN KEY (`sector_id`) REFERENCES `sector` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_category_sector_title` FOREIGN KEY (`sector_title_id`) REFERENCES `sector_title` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_category_sub_sector` FOREIGN KEY (`sub_sector_id`) REFERENCES `sub_sector` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,1,2,1,'primary',NULL,'Mobile Recharge','All mobile recharge services',NULL,NULL,NULL,NULL,1,1,'active','2026-01-20 09:43:18','2026-01-20 09:43:18'),(3,1,1,1,'primary',NULL,'Mobile',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-21 07:22:20','2026-01-21 07:22:20'),(4,1,1,1,'primary',NULL,'Arduino Boards',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-21 07:22:20','2026-01-21 07:22:20'),(5,1,1,1,'secondary',5,'Amplifiers',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-21 07:22:20','2026-01-28 06:43:51'),(18,1,1,1,'secondary',3,'Smartphones',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-21 07:24:45','2026-01-21 07:24:45'),(19,1,1,1,'secondary',3,'Feature Phones',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-21 07:24:45','2026-01-21 07:24:45'),(20,1,3,2,'secondary',22,'motorola','motomotomoto','moto','motomotomotomoto',NULL,'1768992206537-467028438.png',1,1,'active','2026-01-21 10:08:29','2026-01-29 02:19:52'),(21,1,5,4,'primary',NULL,'Appliances','Appliances',NULL,NULL,NULL,NULL,1,1,'active','2026-01-21 10:58:17','2026-01-28 09:11:22'),(22,1,8,6,'primary',NULL,'phone_1',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-24 06:04:03','2026-01-28 08:05:35');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_brand_context`
--

DROP TABLE IF EXISTS `category_brand_context`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_brand_context` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `primary_category_id` bigint(20) unsigned NOT NULL,
  `secondary_category_id` bigint(20) unsigned DEFAULT NULL,
  `is_secondary_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_cb_context_primary` (`primary_category_id`),
  KEY `fk_cb_context_secondary` (`secondary_category_id`),
  CONSTRAINT `fk_cb_context_primary` FOREIGN KEY (`primary_category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cb_context_secondary` FOREIGN KEY (`secondary_category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_brand_context`
--

LOCK TABLES `category_brand_context` WRITE;
/*!40000 ALTER TABLE `category_brand_context` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_brand_context` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_brand_mapping`
--

DROP TABLE IF EXISTS `category_brand_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_brand_mapping` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL,
  `brand_id` bigint(20) unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_category_brand` (`category_id`,`brand_id`),
  KEY `fk_cbm_brand` (`brand_id`),
  CONSTRAINT `fk_cbm_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cbm_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_brand_mapping`
--

LOCK TABLES `category_brand_mapping` WRITE;
/*!40000 ALTER TABLE `category_brand_mapping` DISABLE KEYS */;
INSERT INTO `category_brand_mapping` VALUES (2,2,1,1,1,'active','2026-01-21 07:07:34','2026-01-21 07:07:34'),(3,4,1,1,1,'active','2026-01-21 07:29:31','2026-01-21 07:29:31'),(4,4,3,1,1,'active','2026-01-21 07:29:31','2026-01-21 07:29:31'),(5,4,7,1,1,'active','2026-01-21 07:29:31','2026-01-21 07:29:31'),(6,18,2,1,1,'active','2026-01-21 07:30:53','2026-01-21 07:30:53'),(7,18,5,1,1,'active','2026-01-21 07:30:53','2026-01-21 07:30:53'),(8,18,9,1,1,'active','2026-01-21 07:30:53','2026-01-21 07:30:53'),(9,5,11,1,1,'active','2026-01-24 09:41:56','2026-01-24 09:41:56'),(10,3,11,1,1,'active','2026-01-24 09:42:18','2026-01-24 09:42:18');
/*!40000 ALTER TABLE `category_brand_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dynamic_field_options`
--

DROP TABLE IF EXISTS `dynamic_field_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dynamic_field_options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` bigint(20) unsigned NOT NULL,
  `option_value` varchar(100) NOT NULL,
  `option_label` varchar(100) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `is_enabled` tinyint(1) DEFAULT 1,
  `status` enum('active','inactive','blocked') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_field_options_field` (`field_id`),
  CONSTRAINT `fk_field_options_field` FOREIGN KEY (`field_id`) REFERENCES `dynamic_fields` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dynamic_field_options`
--

LOCK TABLES `dynamic_field_options` WRITE;
/*!40000 ALTER TABLE `dynamic_field_options` DISABLE KEYS */;
INSERT INTO `dynamic_field_options` VALUES (1,2,'private','Private Limited',0,1,1,'active','2026-01-27 09:45:15','2026-01-27 09:45:15');
/*!40000 ALTER TABLE `dynamic_field_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dynamic_fields`
--

DROP TABLE IF EXISTS `dynamic_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dynamic_fields` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dynamic_table_id` bigint(20) unsigned NOT NULL,
  `label` varchar(150) DEFAULT NULL,
  `field_name` varchar(150) NOT NULL,
  `field_type` varchar(100) NOT NULL,
  `placeholder` varchar(255) DEFAULT NULL,
  `is_required` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `is_enabled` tinyint(1) DEFAULT 1,
  `status` enum('active','inactive','blocked') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_dynamic_fields_table` (`dynamic_table_id`),
  CONSTRAINT `fk_dynamic_fields_table` FOREIGN KEY (`dynamic_table_id`) REFERENCES `dynamic_tables` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dynamic_fields`
--

LOCK TABLES `dynamic_fields` WRITE;
/*!40000 ALTER TABLE `dynamic_fields` DISABLE KEYS */;
INSERT INTO `dynamic_fields` VALUES (1,1,'Company Name','company_name','text','Enter company name',1,1,1,'active','2026-01-27 09:44:00','2026-01-27 09:44:00'),(2,1,'Company Type 2','company_type 2','select','Select type',1,1,1,'active','2026-01-27 09:44:42','2026-01-27 09:44:42');
/*!40000 ALTER TABLE `dynamic_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dynamic_pages`
--

DROP TABLE IF EXISTS `dynamic_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dynamic_pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `folder_name` varchar(100) NOT NULL,
  `route_link` varchar(150) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `info` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_enabled` tinyint(1) DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dynamic_pages`
--

LOCK TABLES `dynamic_pages` WRITE;
/*!40000 ALTER TABLE `dynamic_pages` DISABLE KEYS */;
INSERT INTO `dynamic_pages` VALUES (1,'about','/about-us','About Us',NULL,NULL,1,1,'active','2026-01-27 08:28:41','2026-01-27 08:28:41');
/*!40000 ALTER TABLE `dynamic_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dynamic_table_records`
--

DROP TABLE IF EXISTS `dynamic_table_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dynamic_table_records` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dynamic_table_id` bigint(20) unsigned NOT NULL,
  `submitted_by` bigint(20) unsigned DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `dynamic_table_id` (`dynamic_table_id`),
  CONSTRAINT `dynamic_table_records_ibfk_1` FOREIGN KEY (`dynamic_table_id`) REFERENCES `dynamic_tables` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dynamic_table_records`
--

LOCK TABLES `dynamic_table_records` WRITE;
/*!40000 ALTER TABLE `dynamic_table_records` DISABLE KEYS */;
INSERT INTO `dynamic_table_records` VALUES (1,1,1,'{\"company_name\":\"SRIVA Groups\",\"company_type\":\"private\"}',1,'2026-01-27 09:46:23'),(2,1,1,'{\"company_name\":\"HARI Groups\",\"company_type\":\"GOVT\",\"sample feilds\":\"test\"}',1,'2026-01-27 09:55:02');
/*!40000 ALTER TABLE `dynamic_table_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dynamic_tables`
--

DROP TABLE IF EXISTS `dynamic_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dynamic_tables` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dynamic_page_id` bigint(20) unsigned NOT NULL,
  `table_name` varchar(150) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `status` enum('active','inactive','blocked') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `table_name` (`table_name`),
  KEY `fk_dynamic_tables_page` (`dynamic_page_id`),
  CONSTRAINT `fk_dynamic_tables_page` FOREIGN KEY (`dynamic_page_id`) REFERENCES `dynamic_pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dynamic_tables`
--

LOCK TABLES `dynamic_tables` WRITE;
/*!40000 ALTER TABLE `dynamic_tables` DISABLE KEYS */;
INSERT INTO `dynamic_tables` VALUES (1,1,'about_page_form',1,'active','2026-01-27 09:43:13','2026-01-27 09:43:13');
/*!40000 ALTER TABLE `dynamic_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_fields`
--

DROP TABLE IF EXISTS `menu_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_fields` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_title_id` bigint(20) unsigned NOT NULL,
  `page_title` varchar(150) NOT NULL,
  `itab` varchar(100) DEFAULT NULL,
  `icon_name` varchar(100) DEFAULT NULL,
  `icon_image` longblob DEFAULT NULL,
  `link` varchar(200) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_menu_fields_menu_title` (`menu_title_id`),
  CONSTRAINT `fk_menu_fields_menu_title` FOREIGN KEY (`menu_title_id`) REFERENCES `menu_title` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_fields`
--

LOCK TABLES `menu_fields` WRITE;
/*!40000 ALTER TABLE `menu_fields` DISABLE KEYS */;
INSERT INTO `menu_fields` VALUES (1,1,'Home','home_tab','home',NULL,'/dashboard/home',1,1,'active','2026-01-19 06:08:14','2026-01-19 06:08:14'),(2,1,'Overview','overview_tab','chart',NULL,'/dashboard/overview',1,1,'active','2026-01-19 06:08:14','2026-01-19 06:08:14'),(3,2,'Sales Reporter','sales_tab','file-text',NULL,'/reports/sales',0,1,'inactive','2026-01-19 06:08:14','2026-01-19 10:54:14'),(4,3,'User Management','users_tab','users',NULL,'/settings/users',0,1,'inactive','2026-01-19 06:08:14','2026-01-28 05:11:09'),(5,1,'hario','fff','fa-folder',NULL,'gg',0,1,'inactive','2026-01-19 13:07:07','2026-01-27 06:51:42'),(6,24,'fff','s',NULL,NULL,'',1,1,'active','2026-01-30 02:07:42','2026-01-30 02:07:42');
/*!40000 ALTER TABLE `menu_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_page`
--

DROP TABLE IF EXISTS `menu_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_page` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `page_title` varchar(150) NOT NULL,
  `itab` varchar(100) DEFAULT NULL,
  `icon_name` varchar(100) DEFAULT NULL,
  `icon_image` longblob DEFAULT NULL,
  `link` varchar(200) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_page`
--

LOCK TABLES `menu_page` WRITE;
/*!40000 ALTER TABLE `menu_page` DISABLE KEYS */;
INSERT INTO `menu_page` VALUES (1,'Dashboard Home','home_tab','home',NULL,'/dashboard/home',1,1,'active','2026-01-19 06:08:14','2026-01-19 06:08:14'),(2,'Dashboard Overview','overview_tab','chart',NULL,'/dashboard/overview',1,1,'active','2026-01-19 06:08:14','2026-01-19 06:08:14'),(3,'Sales Report Page','sales_tab','file-text',NULL,'/reports/sales',1,1,'active','2026-01-19 06:08:14','2026-01-19 06:08:14'),(4,'User Management Page','users_tab','users',NULL,'/settings/users',1,1,'active','2026-01-19 06:08:14','2026-01-19 06:08:14');
/*!40000 ALTER TABLE `menu_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_title`
--

DROP TABLE IF EXISTS `menu_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_title` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_title` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_title`
--

LOCK TABLES `menu_title` WRITE;
/*!40000 ALTER TABLE `menu_title` DISABLE KEYS */;
INSERT INTO `menu_title` VALUES (1,'',0,1,'inactive','2026-01-19 06:08:14','2026-01-19 13:18:03'),(2,'',0,1,'inactive','2026-01-19 06:08:14','2026-01-19 13:18:02'),(3,'',0,1,'inactive','2026-01-19 06:08:14','2026-01-19 13:17:59'),(4,'jio1',0,1,'blocked','2026-01-19 06:55:15','2026-01-29 08:59:48'),(5,'leo2',0,1,'active','2026-01-19 06:59:17','2026-01-30 05:16:33'),(6,'GOAT1',0,1,'inactive','2026-01-19 08:18:53','2026-01-19 08:31:42'),(7,'mersal2',0,1,'inactive','2026-01-19 10:40:36','2026-01-19 11:43:24'),(8,'aaa',0,1,'active','2026-01-19 13:27:48','2026-01-29 08:59:42'),(9,'gggg',0,1,'active','2026-01-29 04:37:02','2026-01-29 08:59:40'),(10,'ppp',0,1,'active','2026-01-29 04:56:06','2026-01-29 09:00:04'),(11,'ppp',0,1,'inactive','2026-01-29 04:56:06','2026-01-29 08:59:58'),(12,'JK',0,1,'active','2026-01-29 05:28:47','2026-01-29 05:36:57'),(13,'kkk',0,1,'active','2026-01-29 07:38:13','2026-01-29 09:00:02'),(14,'Sector Title',0,1,'active','2026-01-29 08:48:33','2026-01-30 05:26:56'),(15,'Sector',0,1,'active','2026-01-29 08:48:33','2026-01-30 05:26:54'),(16,'Sub Sector',0,1,'active','2026-01-29 08:48:33','2026-01-30 05:26:52'),(17,'Category',0,1,'active','2026-01-29 08:48:33','2026-01-30 05:26:50'),(18,'Brand',0,1,'active','2026-01-29 08:48:33','2026-01-30 05:26:48'),(19,'Products',0,1,'active','2026-01-29 08:48:33','2026-01-29 09:08:13'),(20,'kkk',0,1,'active','2026-01-29 09:06:36','2026-01-29 09:08:19'),(21,'kkkkkkk',0,1,'active','2026-01-29 09:08:03','2026-01-29 09:08:10'),(22,'kkk',0,1,'active','2026-01-29 09:12:00','2026-01-30 05:24:50'),(23,'gk',0,1,'active','2026-01-29 09:15:39','2026-01-30 05:16:07'),(24,'ll',0,1,'inactive','2026-01-30 01:59:31','2026-01-30 05:16:01'),(25,'td',0,1,'active','2026-01-30 04:45:54','2026-01-30 05:09:18'),(26,'Products',0,1,'active','2026-01-30 05:24:46','2026-01-30 05:26:46'),(27,'Category Brand Mapping',0,1,'active','2026-01-30 05:26:06','2026-01-30 05:26:44'),(28,'Products',1,1,'active','2026-01-30 05:27:07','2026-01-30 05:27:07'),(29,'Category Brand Mapping',1,1,'active','2026-01-30 05:27:22','2026-01-30 05:27:22'),(30,'Brand',1,1,'active','2026-01-30 05:27:28','2026-01-30 05:27:28'),(31,'Category',1,1,'active','2026-01-30 05:27:34','2026-01-30 05:27:34'),(32,'SubSector',1,1,'active','2026-01-30 05:27:47','2026-01-30 05:27:47'),(33,'Sector',1,1,'active','2026-01-30 05:27:52','2026-01-30 05:27:52'),(34,'Sector Title',1,1,'active','2026-01-30 05:28:03','2026-01-30 08:32:40'),(35,'kk',0,1,'active','2026-01-30 05:41:33','2026-01-30 05:46:25'),(36,'kk',1,1,'inactive','2026-01-30 06:07:05','2026-01-30 08:33:03'),(37,'ddd',1,1,'inactive','2026-01-30 07:35:38','2026-01-30 07:36:49'),(38,'k2',0,1,'inactive','2026-01-30 08:55:06','2026-01-30 09:00:09'),(39,'oo',0,1,'active','2026-02-03 05:21:52','2026-02-04 05:16:14');
/*!40000 ALTER TABLE `menu_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_title_menu_fields_mapping`
--

DROP TABLE IF EXISTS `menu_title_menu_fields_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_title_menu_fields_mapping` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_title_id` bigint(20) unsigned NOT NULL,
  `menu_field_id` bigint(20) unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_menu_title_field` (`menu_title_id`,`menu_field_id`),
  KEY `fk_menu_field` (`menu_field_id`),
  CONSTRAINT `fk_menu_field` FOREIGN KEY (`menu_field_id`) REFERENCES `menu_fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_menu_title` FOREIGN KEY (`menu_title_id`) REFERENCES `menu_title` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_title_menu_fields_mapping`
--

LOCK TABLES `menu_title_menu_fields_mapping` WRITE;
/*!40000 ALTER TABLE `menu_title_menu_fields_mapping` DISABLE KEYS */;
INSERT INTO `menu_title_menu_fields_mapping` VALUES (1,1,1,1,'active','2026-01-19 06:08:14'),(2,1,2,1,'active','2026-01-19 06:08:14'),(3,2,3,1,'active','2026-01-19 06:08:14'),(4,3,4,1,'active','2026-01-19 06:08:14');
/*!40000 ALTER TABLE `menu_title_menu_fields_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multitab_checkbox_master`
--

DROP TABLE IF EXISTS `multitab_checkbox_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multitab_checkbox_master` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `menu_title_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_checkbox_label` (`label`),
  KEY `idx_checkbox_title` (`menu_title_id`),
  CONSTRAINT `fk_checkbox_menu_title` FOREIGN KEY (`menu_title_id`) REFERENCES `menu_title` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multitab_checkbox_master`
--

LOCK TABLES `multitab_checkbox_master` WRITE;
/*!40000 ALTER TABLE `multitab_checkbox_master` DISABLE KEYS */;
INSERT INTO `multitab_checkbox_master` VALUES (1,'4 GB RAM','4GB',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(2,'8 GB RAM','8GB',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(3,'16 GB RAM','16GB',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(4,'128 GB Storage','128GB',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(5,'256 GB Storage','256GB',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(6,'1 Year Warranty','1YR',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(7,'2 Year Warranty','2YR',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(8,'AMOLED Display','AMOLED',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(9,'6000 mAh Battery','6000MAH',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(10,'Samsung Knox Security','KNOX',1,1,'active','2026-01-28 06:41:49','2026-01-29 11:59:52',14),(11,'r','r',1,1,'active','2026-02-02 02:15:56','2026-02-02 02:15:56',21);
/*!40000 ALTER TABLE `multitab_checkbox_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multitab_mapping`
--

DROP TABLE IF EXISTS `multitab_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multitab_mapping` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tab_heading_id` bigint(20) unsigned NOT NULL,
  `checkbox_id` bigint(20) unsigned NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_heading_checkbox` (`tab_heading_id`,`checkbox_id`),
  UNIQUE KEY `uq_heading_checkbox` (`tab_heading_id`,`checkbox_id`),
  KEY `idx_mapping_heading` (`tab_heading_id`),
  KEY `idx_mapping_checkbox` (`checkbox_id`),
  CONSTRAINT `fk_multitab_mapping_checkbox` FOREIGN KEY (`checkbox_id`) REFERENCES `multitab_checkbox_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_multitab_mapping_heading` FOREIGN KEY (`tab_heading_id`) REFERENCES `multitab_tab_heading` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multitab_mapping`
--

LOCK TABLES `multitab_mapping` WRITE;
/*!40000 ALTER TABLE `multitab_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `multitab_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multitab_menu`
--

DROP TABLE IF EXISTS `multitab_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multitab_menu` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(100) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `menu_title_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_menu_sort` (`menu_title_id`,`sort_order`),
  KEY `idx_sort` (`menu_title_id`,`sort_order`),
  KEY `idx_menu_sort` (`menu_title_id`,`sort_order`),
  CONSTRAINT `fk_multitab_menu_title` FOREIGN KEY (`menu_title_id`) REFERENCES `menu_title` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multitab_menu`
--

LOCK TABLES `multitab_menu` WRITE;
/*!40000 ALTER TABLE `multitab_menu` DISABLE KEYS */;
INSERT INTO `multitab_menu` VALUES (1,'Specifications',1,1,1,'active','2026-01-28 06:41:17','2026-01-29 11:30:19',2),(2,'Warranty',2,1,1,'active','2026-01-28 06:41:17','2026-01-29 11:30:19',2),(3,'Mobile Specs',3,1,1,'active','2026-01-28 06:41:17','2026-01-29 12:39:55',2),(4,'Accessories',4,1,1,'active','2026-01-28 06:41:17','2026-01-29 12:39:55',2),(5,'Samsung Features',5,1,1,'active','2026-01-28 06:41:17','2026-01-29 12:39:55',2),(6,'fsdf',1,1,1,'active','2026-01-30 04:46:13','2026-01-30 04:46:13',19),(7,'ddadwe',2,1,1,'active','2026-01-30 04:46:26','2026-01-30 04:46:26',19),(8,'yry45y',1,1,1,'active','2026-01-30 04:47:13','2026-01-30 04:47:13',1),(9,'gfeg',1,1,1,'active','2026-01-30 04:56:44','2026-01-30 04:56:44',20),(10,'ddd',1,1,1,'active','2026-01-30 06:05:37','2026-01-30 06:05:37',34),(11,'ggg',1,1,1,'active','2026-01-30 06:08:15','2026-01-30 06:08:15',36),(15,'dwedf2efd',2,1,1,'active','2026-01-30 06:50:55','2026-01-30 06:50:55',1),(16,'wedf3wf',3,1,1,'active','2026-01-30 06:51:07','2026-01-30 06:51:07',1),(17,'wdewef3r',4,1,1,'active','2026-01-30 06:51:19','2026-01-30 06:51:19',1),(18,'dqwd21ef',5,1,1,'active','2026-01-30 06:52:44','2026-01-30 06:52:44',1),(19,'dd2e',6,1,1,'active','2026-01-30 06:53:06','2026-01-30 06:53:06',1),(20,'dqd2qe',7,1,1,'active','2026-01-30 06:53:19','2026-01-30 06:53:19',1),(21,'dddd',8,1,1,'active','2026-01-30 06:54:31','2026-01-30 06:54:31',1),(22,'feferf',9,1,1,'active','2026-01-30 06:55:31','2026-01-30 06:55:31',1),(23,'sasws',10,1,1,'active','2026-01-30 06:57:18','2026-01-30 06:57:18',1),(24,'sqwsd2d',11,1,1,'active','2026-01-30 06:58:33','2026-01-30 06:58:33',1),(25,'dddd',12,1,1,'active','2026-01-30 07:08:33','2026-01-30 07:08:33',1),(26,'dd2ed',13,1,1,'active','2026-01-30 07:11:03','2026-01-30 07:11:03',1),(27,'wdwd',14,1,1,'active','2026-01-30 07:13:38','2026-01-30 07:13:38',1),(28,'dfsfws',15,1,1,'active','2026-01-30 07:15:49','2026-01-30 07:15:49',1),(29,'kkkk',16,1,1,'active','2026-01-30 07:17:01','2026-01-30 07:17:01',1),(30,'fsdf',1,1,1,'active','2026-01-30 07:40:17','2026-01-30 07:40:17',37),(31,'ggg',2,1,1,'active','2026-01-30 07:49:29','2026-01-30 07:49:29',37),(32,'hhh',3,1,1,'active','2026-01-30 07:50:49','2026-01-30 07:50:49',37),(33,'kkk',4,1,1,'active','2026-01-30 07:53:12','2026-01-30 07:53:12',37),(34,'dwqed',5,1,1,'active','2026-01-30 07:58:10','2026-01-30 07:58:10',37),(35,'jjjj',2,1,1,'active','2026-01-30 08:32:14','2026-01-30 08:32:14',36),(36,'h',6,1,1,'active','2026-01-30 08:45:09','2026-01-30 08:45:09',37),(37,'fff',7,1,1,'active','2026-01-30 09:01:32','2026-01-30 09:01:32',37),(38,'fgeg',8,1,1,'active','2026-01-30 09:07:13','2026-01-30 09:07:13',37),(39,'f',9,1,1,'active','2026-01-30 09:08:51','2026-01-30 09:08:51',37),(40,'l',10,1,1,'active','2026-01-30 09:11:12','2026-01-30 09:11:12',37),(41,'f',11,1,1,'active','2026-01-30 09:15:00','2026-01-30 09:15:00',37),(42,'e',12,1,1,'active','2026-01-30 09:20:35','2026-01-30 09:20:35',37),(43,'h',13,1,1,'active','2026-01-30 09:22:28','2026-01-30 09:22:28',37),(44,'g',14,1,1,'active','2026-01-30 09:24:01','2026-01-30 09:24:01',37),(45,'t',15,1,1,'active','2026-01-30 09:26:10','2026-01-30 09:26:10',37),(46,'t',16,1,1,'active','2026-01-30 09:27:10','2026-01-30 09:27:10',37),(47,'t',17,1,1,'active','2026-01-30 09:29:19','2026-01-30 09:29:19',37);
/*!40000 ALTER TABLE `multitab_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multitab_tab_heading`
--

DROP TABLE IF EXISTS `multitab_tab_heading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multitab_tab_heading` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `multitab_menu_id` bigint(20) unsigned NOT NULL,
  `heading_name` varchar(100) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_tab_heading` (`multitab_menu_id`),
  KEY `idx_heading_sort` (`multitab_menu_id`,`sort_order`),
  CONSTRAINT `fk_heading_tab` FOREIGN KEY (`multitab_menu_id`) REFERENCES `multitab_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multitab_tab_heading`
--

LOCK TABLES `multitab_tab_heading` WRITE;
/*!40000 ALTER TABLE `multitab_tab_heading` DISABLE KEYS */;
INSERT INTO `multitab_tab_heading` VALUES (1,1,'RAM',NULL,NULL,NULL,1,1,1,'active','2026-01-28 06:41:34','2026-01-28 06:41:34'),(2,1,'Storage',NULL,NULL,NULL,2,1,1,'active','2026-01-28 06:41:34','2026-01-28 06:41:34'),(3,2,'Warranty Type',NULL,NULL,NULL,1,1,1,'active','2026-01-28 06:41:34','2026-01-28 06:41:34'),(4,3,'Display',NULL,NULL,NULL,1,1,1,'active','2026-01-28 06:41:34','2026-01-28 06:41:34'),(5,3,'Battery',NULL,NULL,NULL,2,1,1,'active','2026-01-28 06:41:34','2026-01-28 06:41:34'),(6,5,'Samsung Exclusive',NULL,NULL,NULL,1,1,1,'active','2026-01-28 06:41:34','2026-01-28 06:41:34'),(7,7,'lllll','ffff','','',1,1,1,'active','2026-01-30 05:01:01','2026-01-30 05:01:01'),(8,7,'','','','',2,1,1,'active','2026-01-30 05:01:08','2026-01-30 05:01:08'),(9,6,'dfvqwergv','ferf34','wfqwref','',1,1,1,'active','2026-01-30 05:01:24','2026-01-30 05:01:24');
/*!40000 ALTER TABLE `multitab_tab_heading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `primary_category_id` bigint(20) unsigned NOT NULL,
  `secondary_category_id` bigint(20) unsigned DEFAULT NULL,
  `brand_id` bigint(20) unsigned NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `model` varchar(150) DEFAULT NULL,
  `series` varchar(150) DEFAULT NULL,
  `alternative_name` varchar(200) DEFAULT NULL,
  `mrp` decimal(10,2) DEFAULT NULL,
  `description` text NOT NULL,
  `info` text NOT NULL,
  `note` text DEFAULT NULL,
  `system_note` text DEFAULT NULL,
  `base_image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_product_primary_category` (`primary_category_id`),
  KEY `fk_product_secondary_category` (`secondary_category_id`),
  KEY `fk_product_brand` (`brand_id`),
  CONSTRAINT `fk_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product_primary_category` FOREIGN KEY (`primary_category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product_secondary_category` FOREIGN KEY (`secondary_category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,2,18,5,'Samsung Galaxy A14','A14','Galaxy A Series','Galaxy A14 5G',14999.00,'Budget smartphone with large display and battery.','Supports 5G and long battery life.','Popular budget phone','Inserted by admin','uploads/products/samsung_galaxy_a14.png',1,1,'active','2026-01-21 11:56:05','2026-01-21 12:29:45'),(3,2,18,5,'iPhone 15','A3102',NULL,NULL,129999.00,'Apple smartphone','256GB, Titanium body','Top seller',NULL,NULL,1,1,'active','2026-01-21 12:21:24','2026-01-27 08:13:02'),(4,5,NULL,11,'ooo',NULL,NULL,NULL,NULL,'','',NULL,NULL,NULL,0,1,'active','2026-01-27 05:27:43','2026-01-27 05:39:49'),(6,4,NULL,11,'aaa',NULL,NULL,NULL,NULL,'','',NULL,NULL,'1769493648657-352820399.png',0,1,'active','2026-01-27 05:45:35','2026-01-27 07:05:05'),(7,5,NULL,11,'ooo',NULL,NULL,NULL,1001.00,'','',NULL,NULL,'1769493685639-429745696.png',0,1,'active','2026-01-27 05:59:29','2026-01-27 07:05:10'),(8,5,NULL,11,'aaa','te123',NULL,NULL,122.00,'','',NULL,NULL,'1769494035052-168732237.png',0,1,'active','2026-01-27 06:07:15','2026-01-27 07:05:15'),(9,3,NULL,11,'aaa','audio',NULL,NULL,200.00,'','',NULL,NULL,'1769496900959-143502842.png',1,1,'active','2026-01-27 06:43:04','2026-01-29 03:28:54'),(10,5,NULL,11,'www',NULL,NULL,NULL,2800.00,'','',NULL,NULL,'1769498850068-389392755.png',1,1,'active','2026-01-27 07:27:11','2026-01-29 03:24:31'),(11,5,NULL,11,'llll','audio',NULL,NULL,12000.00,'','',NULL,NULL,'1769506460814-999254231.png',1,1,'active','2026-01-27 08:19:56','2026-01-27 09:34:20');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sector_title_id` bigint(20) unsigned NOT NULL,
  `sector_name` varchar(150) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `system_note` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_sector_sector_title` (`sector_title_id`),
  CONSTRAINT `fk_sector_sector_title` FOREIGN KEY (`sector_title_id`) REFERENCES `sector_title` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (1,10,'Mobile Recharge','All mobile recharge services',NULL,NULL,NULL,NULL,1,1,'active','2026-01-19 09:44:29','2026-01-21 05:52:11'),(2,1,'test Recharge','test services',NULL,NULL,NULL,NULL,0,1,'inactive','2026-01-19 10:41:48','2026-01-20 12:34:28'),(3,6,'ballon','testing','ddd','dfgdf','dfgdfg','1768911587020-694124855.png',1,1,'inactive','2026-01-20 12:19:47','2026-01-21 05:43:24'),(4,6,'ball','description','addda','addda','addda','1768972255053-56721517.png',1,1,'active','2026-01-20 13:22:14','2026-01-21 05:43:39'),(5,12,'speaker','speaker',NULL,NULL,NULL,'1768993004497-476795669.png',1,1,'active','2026-01-21 10:56:44','2026-01-24 05:47:45'),(6,17,'ballon','dddd',NULL,NULL,NULL,NULL,1,1,'active','2026-01-24 05:33:41','2026-01-24 06:02:19'),(7,17,'speaker','wwww',NULL,NULL,NULL,NULL,1,1,'active','2026-01-24 05:34:31','2026-01-28 08:49:07'),(8,17,'vivo 31',NULL,NULL,NULL,NULL,'1769588111126-745620041.png',1,1,'active','2026-01-24 06:01:54','2026-01-28 08:15:11'),(9,19,'vivo',NULL,NULL,NULL,NULL,'1769591947891-976031294.png',1,1,'active','2026-01-28 09:19:07','2026-02-03 05:24:20'),(10,20,'oo',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-02-03 05:25:12','2026-02-05 04:07:19');
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector_title`
--

DROP TABLE IF EXISTS `sector_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector_title` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `system_note` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `icon_name` varchar(100) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector_title`
--

LOCK TABLES `sector_title` WRITE;
/*!40000 ALTER TABLE `sector_title` DISABLE KEYS */;
INSERT INTO `sector_title` VALUES (1,'Recharge Services','All recharge related services','General info about recharge sector','Internal note for admins','System generated note',NULL,NULL,NULL,NULL,'wallet','/recharge',1,1,'active','2026-01-14 10:02:42','2026-01-14 10:02:42'),(2,'Healthcare',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-14 12:47:05','2026-01-22 07:31:20'),(6,'img test','description',NULL,NULL,NULL,'uploads\\1768905321590-317016711.jpg',NULL,NULL,NULL,'hg','test',1,1,'active','2026-01-20 10:35:21','2026-01-20 10:35:21'),(7,'Television','jhg','sfgh','kgh,','fdghfx',NULL,NULL,NULL,NULL,'','tv',1,1,'active','2026-01-20 10:35:44','2026-01-20 10:35:44'),(8,'hari','khj','fgb','cn','xfgb',NULL,NULL,NULL,NULL,'','hh',1,1,'inactive','2026-01-20 10:38:27','2026-01-20 10:38:27'),(9,'img test 1','description test img 1',NULL,NULL,NULL,'uploads\\1768905557142-126684557.jpg',NULL,NULL,NULL,'hg','test',1,1,'active','2026-01-20 10:39:17','2026-01-20 10:39:17'),(10,'ak','jg','gjgh','hjghj','ghjgdj','uploads\\1768906978744-408612709.png',NULL,NULL,NULL,'','ak',1,1,'active','2026-01-20 11:02:58','2026-01-20 11:02:58'),(11,'laptop','ccc','bbb','zzsz','dfgbsdfbsg','1768909514274-301142983.png',NULL,NULL,NULL,'','bbb',1,1,'inactive','2026-01-20 11:29:34','2026-01-20 12:31:46'),(12,'hari1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-22 10:50:05','2026-01-22 10:50:05'),(13,'hari2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,'active','2026-01-22 11:01:23','2026-01-23 09:43:51'),(14,'hari14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,'active','2026-01-23 06:13:13','2026-01-23 06:36:08'),(15,'user','llll',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','',0,1,'inactive','2026-01-23 08:20:11','2026-01-23 09:43:43'),(16,'kkk','ggg',NULL,NULL,NULL,'1769233318673-820893534.png',NULL,NULL,NULL,'','',0,1,'active','2026-01-24 05:41:35','2026-01-24 05:42:05'),(17,'phone','aaa',NULL,NULL,NULL,'1769234488318-659482780.png',NULL,NULL,NULL,'','',1,1,'active','2026-01-24 06:01:28','2026-01-24 06:01:28'),(18,'QQQ','QQQ',NULL,NULL,NULL,'1769583439047-347098577.png',NULL,NULL,NULL,'','',0,1,'active','2026-01-28 06:54:24','2026-01-28 06:57:33'),(19,'bk',NULL,NULL,NULL,NULL,'1769590562401-577697431.png',NULL,NULL,NULL,'','',1,1,'inactive','2026-01-28 07:03:07','2026-01-28 08:56:02'),(20,'FF',NULL,NULL,NULL,NULL,'1769591734051-523479115.png',NULL,NULL,NULL,'','',1,1,'active','2026-01-28 09:15:34','2026-01-28 09:15:34'),(21,'wfef',NULL,NULL,NULL,NULL,'1770196390129-697460071.png',NULL,NULL,NULL,'','',1,1,'active','2026-01-30 05:39:24','2026-02-04 09:13:10'),(22,'Kavin Bk',NULL,NULL,NULL,NULL,'1770095516324-189938493.png',NULL,NULL,NULL,'','',0,1,'active','2026-02-03 05:11:56','2026-02-03 05:12:06');
/*!40000 ALTER TABLE `sector_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector_title_users_link`
--

DROP TABLE IF EXISTS `sector_title_users_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector_title_users_link` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sector_title_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `action` enum('created','updated') NOT NULL DEFAULT 'created',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_sector_user` (`sector_title_id`,`user_id`),
  KEY `fk_sector_title_users_user` (`user_id`),
  CONSTRAINT `fk_sector_title_users_sector` FOREIGN KEY (`sector_title_id`) REFERENCES `sector_title` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sector_title_users_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector_title_users_link`
--

LOCK TABLES `sector_title_users_link` WRITE;
/*!40000 ALTER TABLE `sector_title_users_link` DISABLE KEYS */;
INSERT INTO `sector_title_users_link` VALUES (1,1,1,'created','2026-01-14 10:02:42'),(2,2,1,'updated','2026-01-14 12:47:05'),(3,6,1,'created','2026-01-20 10:35:21'),(4,7,1,'created','2026-01-20 10:35:44'),(5,8,1,'created','2026-01-20 10:38:27'),(6,9,1,'created','2026-01-20 10:39:17'),(7,10,1,'created','2026-01-20 11:02:58'),(8,11,1,'updated','2026-01-20 11:29:34');
/*!40000 ALTER TABLE `sector_title_users_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_sector`
--

DROP TABLE IF EXISTS `sub_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_sector` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sector_id` bigint(20) unsigned NOT NULL,
  `sub_sector_name` varchar(150) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `system_note` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_sub_sector_sector` (`sector_id`),
  CONSTRAINT `fk_sub_sector_sector` FOREIGN KEY (`sector_id`) REFERENCES `sector` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_sector`
--

LOCK TABLES `sub_sector` WRITE;
/*!40000 ALTER TABLE `sub_sector` DISABLE KEYS */;
INSERT INTO `sub_sector` VALUES (1,2,'Prepaid Recharge','All prepaid recharge services','Recharge related info','Admin only note','System generated note',NULL,1,1,'active','2026-01-20 05:10:50','2026-01-20 05:10:50'),(2,3,'aravind','ak des','ak info','ak note','ak sys note',NULL,1,1,'active','2026-01-21 06:36:39','2026-01-21 08:15:18'),(3,3,'caster','cast5','cast6','cast7','cast8','1768983283045-552031033.png',1,1,'inactive','2026-01-21 07:02:45','2026-01-21 08:15:18'),(4,5,'2.1 speaker','2.1 speaker',NULL,NULL,NULL,'1768993039297-782833430.png',1,1,'active','2026-01-21 10:57:19','2026-01-21 10:57:19'),(5,6,'cast',NULL,NULL,NULL,NULL,NULL,1,1,'active','2026-01-24 05:51:57','2026-01-24 05:51:57'),(6,8,'cast','200000',NULL,NULL,NULL,NULL,1,1,'active','2026-01-24 06:02:49','2026-01-24 06:02:49');
/*!40000 ALTER TABLE `sub_sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`details`)),
  `add_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`add_json`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sri Hari','srihari8489@gmail.com','000000','{\"role\":\"admin\",\"phone\":\"9876543210\"}','{\"createdBy\":\"mysql\",\"source\":\"manual\"}',1,1,'active','2026-01-14 08:52:49','2026-01-14 09:15:40'),(2,'krishna','kavinbk035@gmail.com','000000',NULL,NULL,1,1,'active','2026-01-24 05:55:25','2026-01-24 06:00:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05 11:40:58
