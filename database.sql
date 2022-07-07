show databases;
create database smart_tube;
use smart_tube;
drop table video;
create table video
(
    id BIGINT primary key auto_increment,
    uuid varchar(200),
    video_name varchar(200),
    video_path varchar(200)
);
insert into video(uuid,video_name,video_path) values("517e78b3-8154-4820-a192-9746c579e3eb","Sample","sample_01.mp4");
select * from video;