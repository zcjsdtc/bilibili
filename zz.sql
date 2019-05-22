SET NAMES UTF8;
DROP DATABASE IF EXISTS zz;
CREATE DATABASE zz CHARSET=UTF8;
USE zz;
#主页轮播图片表
CREATE TABLE zz_index_banner(
  uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  index_banner_url VARCHAR(128) #轮播图片路径
);

INSERT INTO zz_index_banner VALUES
(NULL,  'http://127.0.0.1:3333/img/index-banner1.webp'),
(NULL,  'http://127.0.0.1:3333/img/index-banner2.webp'),
(NULL,  'http://127.0.0.1:3333/img/index-banner3.webp'),
(NULL,  'http://127.0.0.1:3333/img/index-banner4.webp');

#主页内容表
CREATE TABLE zz_index(
  pid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  counts VARCHAR(128), #播放次数
  pcounts VARCHAR(128), #弹幕数
  texts VARCHAR(128), #文本内容
  index_url VARCHAR(128) #内容图片路径
);

INSERT INTO zz_index VALUES
(NULL,"641.5万","12.1万","这动画也太沙雕了吧！2019四月新番吐槽大盘点（第二弹）","http://127.0.0.1:3333/img/221464310c29c08be976376b8184812b3823f066.jpg@320w_200h.webp"),
(NULL,"131.5万","9356","【官方】吴亦凡《大碗宽面》MV（动画版）","http://127.0.0.1:3333/img/5313a7244976f744f69e8041a2242dde12c872ba.jpg@320w_200h.webp"),
(NULL,"85.8万","4124","网红歌《绿色》神改编，唱出“悲惨”童年","http://127.0.0.1:3333/img/20007b18c86ef1992a2849014ab2433d6f4796b6.jpg@320w_200h.webp"),
(NULL,"71.6万","3699","日语版《绿色》好听爆哭预警！！超火神曲秒变日剧主题歌awsl？！","http://127.0.0.1:3333/img/d89a767d635dcc4a96f64ef8dcae3b2172b8eeea.jpg@320w_200h.webp"),
(NULL,"94.6万","7863","如何5秒钟把一首歌变土","http://127.0.0.1:3333/img/3b03a5a909c24160acf5712acec239ceb6e671d7.jpg@320w_200h.webp"),
(NULL,"29.1万","1321","《Shape Of You》的 24 种唱法，简直是 24 首歌","http://127.0.0.1:3333/img/7598cc751531057669ce8d7bac72333f006f64f0.jpg@320w_200h.webp"),
(NULL,"26.8万","3281","日语版《勾指起誓》歌ってみた【鹿乃】","http://127.0.0.1:3333/img/e3df33953dcde93716dca3ba621fb5f93b040781.jpg@320w_200h.webp"),
(NULL,"87.5万","6842","［顶风作案］《鸡你太美》 唢呐送葬！！feat.惨叫鸡","http://127.0.0.1:3333/img/486d45c41b5034cda8f85378d8f035fef4f06a33.jpg@320w_200h.webp"),
(NULL,"71.4万","5565","【孙笑川首支单曲】《年少有为》","http://127.0.0.1:3333/img/b90d219df6a6be3e467a21d520648e21891c0569.jpg@320w_200h.webp"),
(NULL,"25.8万","1515","2个小技巧，帮你改掉喉咙唱歌的坏习惯！纯干货","http://127.0.0.1:3333/img/da5f311d545911c70ab7e2c5d1894f1a6f409c2e.jpg@320w_200h.webp"),
(NULL,"51.7万","2139","4536251能唱多少林俊杰的歌曲？","http://127.0.0.1:3333/img/6f7f35581a1cdb540223e4aaf0d5523515e50dbd.jpg@320w_200h.webp");

#登录表
CREATE TABLE zz_user(
  uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(25), #用户名
  pwd VARCHAR(32), #密码
  uppic_url VARCHAR(128), #投稿地址
  gender BOOL #性别  0-女  1-男
);
INSERT INTO zz_user VALUES
(NULL, 'dingding', md5(123456),null, '1'),
(NULL, 'dangdang', md5(123456),null,'1'),
(NULL, 'doudou', md5(123456),null,  '1'),
(NULL, 'yaya', md5(123456),null, '0');

#个人内容表
CREATE TABLE zz_user_person(
  pid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  counts VARCHAR(128), #播放次数
  pcounts VARCHAR(128), #弹幕数
  texts VARCHAR(128), #文本内容
  index_url VARCHAR(128), #内容图片路径
  uid INT
);
INSERT INTO zz_user_person VALUES
(NULL,"231.5万","9356","这动画也太沙雕了吧！2019四月新番吐槽大盘点（第二弹）","http://127.0.0.1:3333/img/5313a7244976f744f69e8041a2242dde12c872ba.jpg@320w_200h.webp",1),
(NULL,"331.5万","9356","这动画也太沙雕了吧！2019四月新番吐槽大盘点（第二弹）","http://127.0.0.1:3333/img/5313a7244976f744f69e8041a2242dde12c872ba.jpg@320w_200h.webp",1),
(NULL,"111.5万","9356","这动画也太沙雕了吧！2019四月新番吐槽大盘点（第二弹）","http://127.0.0.1:3333/img/5313a7244976f744f69e8041a2242dde12c872ba.jpg@320w_200h.webp",1),
(NULL,"121.5万","9356","这动画也太沙雕了吧！2019四月新番吐槽大盘点（第二弹）","http://127.0.0.1:3333/img/5313a7244976f744f69e8041a2242dde12c872ba.jpg@320w_200h.webp",2),
(NULL,"135.5万","9356","这动画也太沙雕了吧！2019四月新番吐槽大盘点（第二弹）","http://127.0.0.1:3333/img/5313a7244976f744f69e8041a2242dde12c872ba.jpg@320w_200h.webp",2);

#评论表
CREATE TABLE zz_comments(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  texts VARCHAR(128), #文本内容
  uid INT,  #用户uid
  name VARCHAR(25), #用户名
  pid INT  #作品pid
);
INSERT INTO zz_comments VALUES(null,"看完了lorre的视频
                    =看完了21部漫威电影
                    =看完了整个漫威宇宙
                    =看完了复联4[蛆音娘_滑稽]
                    那么，接下来我就要开始剧透了[阴险]",1,"dingding",1);
#投稿表
CREATE TABLE zz_upload(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  upload_url VARCHAR(128), #投稿地址
  uid INT  #用户uid
);