-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: localhost    Database: coco
-- ------------------------------------------------------
-- Server version	5.6.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` blob,
  `creator_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `topic_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES ('1427207334966','d68e1ac5c2d6815dffedad4662529261eced072a','测试博客','这是一个测试','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,1),('1427207419102','366160fddb80196aa0e7fab76e19f8bf9165642d','测试2','测试我的博客','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,2),('1427207465739','4234a7366b464afd1559acfb57e9092e39ef344d','测试5','测试我的博客d','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,3),('1427207527287','01a20e3f4bde38647285d828c4aa0556db539adf','ceshc','csadc','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,4),('1427207572816','888d87c54a6a9f5f1856e8425391ba4bb6d9a14c','ddceshc','csadcd','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,5),('1427207602776','b3ce0bbb72e2d17c77ee06b078f0d67bf1ef0976','ddceshc12','csadcd','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,6),('1427207638928','7c16a45d8632262f94b39fb146ddf1ddda8b84c1','asdcc','asdcsdc','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,7),('1427207825072','f8e54d0c3255fa7d68fa78327f203ed62396b76b','asdc','casdc','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,8),('1427207846732','7bd2d164d8230f302e96ba14e0faf34eeb4e3ca0','sdcas','cdasdcasdccc','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,9),('1427207910334','0df507fec3613de6361b240a55d17edae0f61937','casdc','asdcasdcascd','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,10),('1427207948323','c12ed241553b4f6acd2cbe0a6ec61180b90278cb','asdccc','cccc','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,11),('1427208044504','c9482087662978d9b337cd187eb02f8bd695fa5c','cascc12121212','ccc','[]','65554e066c6a0542d930f2fe30c1b4b9bddd476d',NULL,12),('1427211439279','4afd018fcd82802679413bdf585ca74eb76e3cd9','asdcasdca','asdc','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7',NULL,13),('1427211445506','6aab91ede14a4a432bcc3ea3cf9b5a468f43b603','asdcas','asdcasd','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7',NULL,14),('1427211457278','aa94dc4292122502c585cfeaf73342f9c86313b6','asdcas','asdc','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7',NULL,15),('1427211489077','0005e46e1f467d00a26364e95d1cb0f36e037da2','123','sadcasdc','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7',NULL,16),('1427211496707','64f3f28c6ecae2cf8bb5ea43d936fff0fece912b','12121111','sdcsdc','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7',NULL,17);
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concern`
--

DROP TABLE IF EXISTS `concern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concern` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `topic_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `block` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concern`
--

LOCK TABLES `concern` WRITE;
/*!40000 ALTER TABLE `concern` DISABLE KEYS */;
/*!40000 ALTER TABLE `concern` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `friend_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `my_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `block` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES ('1427125862829','5c66f1e602c94f33423b52bbf3759796e607df08','e6a78691c06d430c2bdced993d2362cee11da826','208e3cbced6f0ae48ee0e7156441ec655fb494d7','false',1),('1427125862829','5c66f1e602c94f33423b52bbf3759796e607df08','c2dfccb8afdc721d3b1a9b9fcdcf3a15f9c33779','208e3cbced6f0ae48ee0e7156441ec655fb494d7','false',2),('1427125862829','5c66f1e602c94f33423b52bbf3759796e607df08','447e370b31c9676bf1d9c55272580d7e8f775cf9','208e3cbced6f0ae48ee0e7156441ec655fb494d7','false',3);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` blob,
  `creator_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `related` blob,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES ('1427211932846','3bd371bccf45e6397b8ba2daf794455b05be1044','ceshizhuti','ccc','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7','[]',1),('1427211967887','d8aa4bef973382d47972ccd0ea391a0e6969d8ae','风景','美好的风景','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7','[]',2),('1427212009094','fadafd30a72b6407d27e8c32ae68e7f94e46f7f3','阿萨德吃','asdcas','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7','[]',3),('1427212060359','06bac26c358e85825fb6d6bde59acd9526e9869a','测试','asdcas','[]','208e3cbced6f0ae48ee0e7156441ec655fb494d7','[]',4);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `head_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nb_friend` float DEFAULT NULL,
  `nb_blog` float DEFAULT NULL,
  `nb_topic` float DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1427209743521','208e3cbced6f0ae48ee0e7156441ec655fb494d7','user1','9a1ac7f1c57a398c3e5c093f52408984c4186590','','','d696756b5a7557b73d1e7e157afc404ba434acb1.jpg','user1@gmail.com','15238228827','',0,0,0,1),('1427209780690','e6a78691c06d430c2bdced993d2362cee11da826','user2','5c66f1e602c94f33423b52bbf3759796e607df08','','','51a0b3e89f106ba1600f75e2c834a5933aef1c4f.jpg','user2@gmail.com','16279330090','',0,0,0,2),('1427209808475','c2dfccb8afdc721d3b1a9b9fcdcf3a15f9c33779','user3','268fb34f7ccd887c98702bd6aacb36524eb6d01f','','','a308eefe4821db444c7da788a8e93e7278fafd7d.jpg','user3@gmail.com','17622234421','',0,0,0,3),('1427209839677','447e370b31c9676bf1d9c55272580d7e8f775cf9','user4','8d2d1c094282f1512fd7fb3fa0d9af92b0e1ec27','','','6feaf6f31f5907d8b4ab6310dc65d37d5ff28788.jpg','user4@gmail.com','1278330002d','',0,0,0,4);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-26 23:24:33
