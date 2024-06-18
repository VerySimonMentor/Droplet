create user if not exists "droplet"@"localhost" identified by "droplet";
GRANT ALL PRIVILEGES ON *.* TO 'droplet'@'localhost' with grant option;
flush privileges;

create database if not exists droplet;

use droplet;

-- 创建user表
create table if not exists user(
    id int primary key auto_increment,

    -- 用户名
    userName varchar(255) not null,
    -- 密码的md5值
    password varchar(255) not null,
    
    -- 性别
    gender int default 0,
    -- 0: 未知 1: 男 2: 女 3: 其他 4: 保密

    -- 中文名
    chineseName varchar(255) default "",
    -- 英文名
    englishName varchar(255) default "",
    -- 别名
    anotherName varchar(255) default "",

    -- 工号
    employeeId varchar(255) default "",

    -- 邮箱
    email varchar(255) default "",
    -- 工作邮箱
    businessEmail varchar(255) default "",

    -- 手机区号
    phoneAreaCode varchar(255) default "+86",
    -- 手机号
    phoneNumber varchar(255) default "",
);

-- 创建department表
create table if not exists department(
    id int primary key auto_increment,

    -- 职位名称
    name varchar(255) not null,
    -- 职位描述
    description varchar(1023) default "",

    -- 上级部门id
    parentId int default null,
    foreign key (parentId) references department(id)
    on delete cascade 
    on update cascade,
);
-- 创建user2Department表
create table if not exists user2Department(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 部门id
    departmentId int not null,
    foreign key (departmentId) references department(id)
    on delete cascade
    on update cascade,
    primary key (userId, departmentId),
    /* -- 入职时间
    entryTime datetime not null,
    -- 离职时间
    leaveTime datetime default null, */
);
-- 创建user2DepartmentAuthority表
create table if not exists user2DepartmentAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 部门id
    departmentId int not null,
    foreign key (departmentId) references department(id)
    on delete cascade
    on update cascade,
    primary key (userId, departmentId),
    -- 权限
    authority bool default 0,
    -- 0: 无权限 1: 只读 2: 读写
    -- 读写权限包括：查看、添加、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限
    -- TODO: 拆分细化读写权限
);

-- service表和serviceFileUrl表用于存储服务信息，服务的文件url，只在后端使用，不在前端显示
-- user2ServiceAuthority表用于存储用户对服务的权限，在前端显示并且可编辑
-- 创建service表
create table if not exists service(
    id int primary key auto_increment,

    -- 服务名称
    name varchar(255) default "",
    -- html中按钮的id
    ownId varchar(255) default "",
    -- html中功能的id
    relatedId varchar(255) default "",

    -- 上级服务id
    parentId int default null,
    foreign key (parentId) references service(id)
    on delete cascade
    on update cascade,
)
-- 创建serviceFileUrl表
create table if not exists serviceFileUrl(
    id int primary key auto_increment,
    -- 服务id
    serviceId int not null,
    foreign key (serviceId) references service(id)
    on delete cascade
    on update cascade,
    -- 文件url
    url varchar(1023) not null,
);
-- 创建user2ServiceAuthority表
create table if not exists user2ServiceAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 服务id
    serviceId int not null,
    foreign key (serviceId) references service(id)
    on delete cascade
    on update cascade,
    primary key (userId, serviceId),
);

-- 创建campus表
create table if not exists campus(
    id int primary key auto_increment,
    -- 校区名称
    name varchar(255) not null,
    -- 校区地址
    address varchar(1023) default "",
    -- 校区电话
    phone varchar(255) default "",
    -- 校区邮箱
    email varchar(255) default "",
    -- 校区网址
    website varchar(255) default "",
    -- 校区简介
    introduction varchar(1023) default "",
);
-- 创建user2Campus表
create table if not exists user2Campus(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 校区id
    campusId int not null,
    foreign key (campusId) references campus(id)
    on delete cascade
    on update cascade,
    primary key (userId, campusId),
);
-- 创建user2CampusAuthority表
create table if not exists user2CampusAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 校区id
    campusId int not null,
    foreign key (campusId) references campus(id)
    on delete cascade
    on update cascade,
    primary key (userId, campusId),
    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 读写
    -- 读写权限包括：查看、添加、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限
    -- TODO: 拆分细化读写权限
);

-- 创建followStatus表
create table if not exists followStatus(
    id int primary key auto_increment,
    -- 跟进状态名称
    name varchar(255) not null,
    -- 跟进状态描述
    description varchar(1023) default "",
);
-- 创建user2FollowStatusAuthority表
create table if not exists user2FollowStatusAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 跟进状态id
    followStatusId int not null,
    foreign key (followStatusId) references followStatus(id)
    on delete cascade
    on update cascade,
    primary key (userId, followStatusId),

    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 读写
    -- 读写权限包括：查看、添加、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限
);

-- 创建rescourse表
create table if not exists rescourse(
    id int primary key auto_increment,

    -- 资源名称
    name varchar(255) default "",
    -- 手机区号
    phoneAreaCode varchar(255) default "+86",
    -- 手机号
    phoneNumber varchar(255) default "",
    -- 微信名
    weixinName varchar(255) default "",
    -- 微信号
    weixinId varchar(255) default "",
    -- qq号
    qqId varchar(255) default "",

    -- 录入时间 存毫秒级时间戳
    loginTime bigint default 0,
    -- 录入人id
    loginUserId int default null,
    foreign key (loginUserId) references user(id)
    on delete set null
    on update cascade,

    -- 跟进状态
    followStatusId int default null,
    foreign key (followStatusId) references followStatus(id)
    on delete set null
    on update cascade,
);
-- 用于设置查看权限的关联表，实现时，user会看到Rescourse2UserCampus中关联的以及本表中关联的（∪），还有Rescourse中loginUserId, loginId默认可读写
-- 创建user2RescourseAuthority表
create table if not exists user2RescourseAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 资源id
    rescourseId int not null,
    foreign key (rescourseId) references rescourse(id)
    on delete cascade
    on update cascade,
    primary key (userId, rescourseId),
    
    -- 权限
    authority int default 0,
    -- 0: 无权限  1: 只读 2: 编辑 3: 管理
    -- 管理权限包括：查看、修改、删除、权限管理
    -- 编辑权限包括：查看、修改
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);
-- 创建rescourse2UserCampus表
create table if not exists rescourse2UserCampus(
    -- 资源id
    rescourseId int not null,
    foreign key (rescourseId) references rescourse(id)
    on delete cascade
    on update cascade,
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 校区id
    campusId int not null,
    foreign key (campusId) references campus(id)
    on delete cascade
    on update cascade,
    primary key (rescourseId, userId, campusId),
);

-- 创建follow表
create table if not exists follow(
    id int primary key auto_increment,

    -- 跟进内容
    content varchar(4095) default "",
    -- 跟进时间 存毫秒级时间戳
    followTime bigint default 0,
    -- 跟进人id
    followUserId int default null,
    foreign key (followUserId) references user(id)
    on delete set null
    on update cascade,

    -- 资源id
    rescourseId int not null,
    foreign key (rescourseId) references rescourse(id)
    on delete cascade
    on update cascade,
);
-- user2FollowAuthority表用于存储用户对跟进编辑的权限，在前端显示并且可编辑
-- 创建user2FollowAuthority表
create table if not exists user2FollowAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 跟进id
    followId int not null,
    foreign key (followId) references follow(id)
    on delete cascade
    on update cascade,
    primary key (userId, followId),

    -- 权限
    authority int default 0,
    -- 0: 无权限  1: 只读 2: 编辑 3: 管理
    -- 管理权限包括：查看、修改、删除、权限管理
    -- 编辑权限包括：查看、修改
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);



-- 创建assignment表
create table if not exists assignment(
    id int primary key auto_increment,

    -- 分配时间 存毫秒级时间戳
    assignedTime bigint default 0,
    -- 分配人id
    assignUserId int not null,
    foreign key (assignUserId) references user(id)
    on delete set null
    on update cascade,

    -- 被分配人校区id
    assignedCampusId int not null,
    foreign key (assignedCampusId) references campus(id)
    on delete set null
    on update cascade,
    -- 被分配人id
    assignedUserId int not null,
    foreign key (assignedUserId) references user(id)
    on delete set null
    on update cascade,

    -- 资源id
    rescourseId int not null,
    foreign key (rescourseId) references rescourse(id)
    on delete cascade
    on update cascade,
);

-- 用ProgramType和Program来强制实现二级分类
-- 创建programType表
create table if not exists programType(
    id int primary key auto_increment,

    -- 项目类型第一名称
    primaryName varchar(255) not null,
    -- 项目类型第二名称
    secondaryName varchar(255) default "",
    -- 项目类型描述
    description varchar(1023) default "",
);
-- 创建program表
create table if not exists program(
    id int primary key auto_increment,

    -- 项目第一名称
    primaryName varchar(255) not null,
    -- 项目第二名称
    secondaryName varchar(255) default "",
    -- 项目描述
    description varchar(1023) default "",
    -- 项目类型id
    programTypeId int not null,
    foreign key (programTypeId) references programType(id)
    on delete cascade
    on update cascade,
);
-- 创建user2ProgramAuthority表
create table if not exists user2ProgramAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    -- 项目id
    programId int not null,
    foreign key (programId) references program(id)
    on delete cascade
    on update cascade,
    primary key (userId, programId),
    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 编辑
    -- 编辑权限包括：查看、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);
-- 创建rescourse2Program表
create table if not exists rescourse2Program(
    -- 资源id
    rescourseId int not null,
    foreign key (rescourseId) references rescourse(id)
    on delete cascade
    on update cascade,
    -- 项目id
    programId int not null,
    foreign key (programId) references program(id)
    on delete cascade
    on update cascade,
    primary key (rescourseId, programId),
);

-- 创建schoolType表
create table if not exists schoolType(
    id int primary key auto_increment,

    -- 学校类型第一名称
    primaryName varchar(255) not null,
    -- 学校类型第二名称
    secondaryName varchar(255) default "",
    -- 学校类型描述
    description varchar(1023) default "",
);
-- 创建school表
create table if not exists school(
    id int primary key auto_increment,

    -- 学校第一名称
    primaryName varchar(255) not null,
    -- 学校第二名称
    secondaryName varchar(255) default "",
    -- 学校描述
    description varchar(1023) default "",

    -- 学校类型id
    schoolTypeId int not null,
    foreign key (schoolTypeId) references schoolType(id)
    on delete cascade
    on update cascade,
);
-- 创建college表
create table if not exists college(
    id int primary key auto_increment,

    -- 学院第一名称
    primaryName varchar(255) not null,
    -- 学院第二名称
    secondaryName varchar(255) default "",
    -- 学院描述
    description varchar(1023) default "",

    -- 学校id
    schoolId int not null,
    foreign key (schoolId) references school(id)
    on delete cascade
    on update cascade,
);
-- 能查看的学校类型是user2SchoolTypeAuthority以及能查看的学校的父对象的并集
-- 能编辑的学校类型只有user2SchoolTypeAuthority中能编辑的
-- 创建user2SchoolTypeAuthority表
create table if not exists user2SchoolCollegeAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    
    -- 学校类型id
    schoolTypeId int not null,
    foreign key (schoolTypeId) references schoolType(id)
    on delete cascade
    on update cascade,

    primary key (userId, schoolTypeId),

    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 编辑
    -- 编辑权限包括：查看、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);
-- 能查看的学校是user2SchoolAuthority以及user2CollegeAuthority记录的父对象的并集
-- 能编辑的学校只有user2SchoolAuthority中能编辑的
-- 创建user2SchoolAuthority表
create table if not exists user2SchoolAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    
    -- 学校id
    schoolId int not null,
    foreign key (schoolId) references school(id)
    on delete cascade
    on update cascade,

    primary key (userId, schoolId),

    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 编辑
    -- 编辑权限包括：查看、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);
-- 创建user2CollegeAuthority表
create table if not exists user2CollegeAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    
    -- 学院id
    collegeId int not null,
    foreign key (collegeId) references college(id)
    on delete cascade
    on update cascade,

    primary key (userId, collegeId),

    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 编辑
    -- 编辑权限包括：查看、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);
-- 创建enrollmentSemester表
create table if not exists enrollmentSemester(
    id int primary key auto_increment,

    -- 学期名称
    name varchar(255) not null,
    -- 学期描述
    description varchar(1023) default "",
);
-- 创建user2EnrollmentSemesterAuthority表
create table if not exists user2EnrollmentSemesterAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    
    -- 学期id
    enrollmentSemesterId int not null,
    foreign key (enrollmentSemesterId) references enrollmentSemester(id)
    on delete cascade
    on update cascade,

    primary key (userId, enrollmentSemesterId),

    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 编辑
    -- 编辑权限包括：查看、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);
-- 创建rescourse2SchoolCollege表
create table if not exists rescourse2SchoolCollege(
    -- 资源id
    rescourseId int not null,
    foreign key (rescourseId) references rescourse(id)
    on delete cascade
    on update cascade,
    -- 学校类型id
    schoolTypeId int not null,
    foreign key (schoolTypeId) references schoolType(id)
    on delete cascade
    on update cascade,
    -- 学校id
    schoolId int not null,
    foreign key (schoolId) references school(id)
    on delete cascade
    on update cascade,
    -- 学院id
    collegeId int,
    foreign key (collegeId) references college(id)
    on delete cascade
    on update cascade,
    primary key (rescourseId, schoolId, collegeId),
    -- 入学学期id
    enrollmentSemesterId int not null,
    foreign key (enrollmentSemesterId) references enrollmentSemester(id)
    on delete cascade
    on update cascade,

    primary key (rescourseId, enrollmentSemesterId),
);

-- 创建channel表
create table if not exists channel(
    id int primary key auto_increment,

    -- 渠道第一名称
    primaryName varchar(255) not null,
    -- 渠道第二名称
    secondaryName varchar(255) default "",
    -- 渠道描述
    description varchar(1023) default "",
    -- 千分比的返点
    rebate int default 0,

    -- 上级渠道id
    parentId int default null,
);
-- 创建user2ChannelAuthority表
create table if not exists user2ChannelAuthority(
    -- 用户id
    userId int not null,
    foreign key (userId) references user(id)
    on delete cascade
    on update cascade,
    
    -- 渠道id
    channelId int not null,
    foreign key (channelId) references channel(id)
    on delete cascade
    on update cascade,

    primary key (userId, channelId),

    -- 权限
    authority int default 0,
    -- 0: 无权限 1: 只读 2: 编辑
    -- 编辑权限包括：查看、修改、删除
    -- 只读权限包括：查看
    -- 无权限包括：无权限，等价于没有这条记录
);
-- 创建rescourse2Channel表
-- 从属关系
create table if not exists rescourse2Channel(
    -- 资源id
    rescourseId int not null,
    foreign key (rescourseId) references rescourse(id)
    on delete cascade
    on update cascade,
    -- 渠道id
    channelId int not null,
    foreign key (channelId) references channel(id)
    on delete cascade
    on update cascade,
    primary key (rescourseId, channelId),
);