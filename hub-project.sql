# 初步创建用户表
USE coderhub;
CREATE TABLE `users`  (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(30)  NOT NULL UNIQUE,
  `password` VARCHAR(50)  NOT NULL,
  `createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# 插入数据
INSERT INTO users (NAME,PASSWORD) VALUES ('张三','123abc')

#根据用户名查询用户信息
SELECT * FROM users WHERE NAME='张三';

# 创建用户动态表
CREATE TABLE IF NOT EXISTS `moment` (
   `id` INT PRIMARY KEY AUTO_INCREMENT, 
   `content` VARCHAR(1000) NOT NULL, `user_id` INT NOT NULL, 
   `createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
   `updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
   FOREIGN KEY (user_id) REFERENCES users(id) 
  ); 
#创建用户动态
  INSERT INTO `moment` (user_id,content) VALUES (8,'这是评论内容')

#查询单条动态（包含用户信息）
SELECT m.`id` id,m.`content`,m.`createAt` createTime, m.`updateAt` updateTime, 
	JSON_OBJECT('id',u.id,'name',u.`name`) USER
FROM moment m 
LEFT JOIN  users u ON m.`user_id`=u.`id`
WHERE m.id=8;

#批量插入动态
INSERT INTO `moment` VALUES (1, '我说错了，C语言才是最好的语言', 1, '2020-11-24 18:22:54', '2020-11-29 16:25:41');
INSERT INTO `moment` VALUES (2, '曾几何时，他也好，她也好，都是这家伙的被害者。所以我才憎恶着。这个强求着所谓“大家”的世界。必须建立在牺牲某人之上才能成立的低劣的和平。以温柔和正义粉饰，明明是恶毒之物却登大雅之堂，随着时间的流逝越发凶恶，除欺瞒外别无其二的空虚的概念。过去和世界都是无法改变的。发生过的事情和所谓的“大家”都是无法改变的。但是，并不是说自己只能隶属于他们', 1, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (3, '不要告诉我你不需要保护，不要告诉我你不寂寞，知微，我只希望你，在走过黑夜的那个时辰，不要倔强的选择一个人。', 3, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (4, 'If you shed tears when you miss the sun, you also miss the stars.如果你因失去了太阳而流泪，那么你也将失去群星了。', 1, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (5, 'JavaScript 是世界上最好的语言', 2, '2020-11-24 18:27:42', '2020-11-28 17:17:28');
INSERT INTO `moment` VALUES (6, '某一天，突然发现，许多结果都与路径无关。', 4, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (8, '翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来', 4, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (9, '一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。', 2, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (10, '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', 3, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (11, '如果你给我的，和你给别人的是一样的，那我就不要了。', 3, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (12, '故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。', 2, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (13, '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。', 2, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (14, '你如果认识从前的我，也许你会原谅现在的我。', 4, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (15, '每一个不曾起舞的日子，都是对生命的辜负。', 2, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (16, '向来缘浅，奈何情深。', 2, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (17, '心之所向 素履以往 生如逆旅 一苇以航', 3, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (18, '生如夏花之绚烂，死如秋叶之静美。', 3, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (19, '答案很长，我准备用一生的时间来回答，你准备要听了吗？', 4, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (20, '因为爱过，所以慈悲；因为懂得，所以宽容。', 4, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (21, '我们听过无数的道理，却仍旧过不好这一生。', 1, '2020-11-24 18:27:42', '2020-11-24 18:27:42');
INSERT INTO `moment` VALUES (22, '我来不及认真地年轻，待明白过来时，只能选择认真地老去。', 2, '2020-11-24 18:27:42', '2020-11-24 18:27:42');


#创建动态的评论表
CREATE TABLE IF NOT EXISTS `comment`  (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(1000) NOT NULL,
  moment_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_id INT DEFAULT NULL,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES COMMENT(id) ON DELETE CASCADE ON UPDATE CASCADE
) 

# 创建标签表
CREATE TABLE IF NOT EXISTS label  (
  `id` INT  PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(20)  NOT NULL UNIQUE,
  `createAt` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) 

#创建 标签_动态 表
CREATE TABLE `moment_label`  (
  `moment_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  `createAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`, `label_id`) ,
  FOREIGN KEY (`moment_id`) REFERENCES moment(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`label_id`) REFERENCES label(`id`) ON DELETE CASCADE ON UPDATE CASCADE
)