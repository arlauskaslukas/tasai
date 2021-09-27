DROP TABLE IF EXISTS AssignmentEntry;
DROP TABLE IF EXISTS TimetableEntry;
DROP TABLE IF EXISTS Media;
DROP TABLE IF EXISTS AttendanceEntry;
DROP TABLE IF EXISTS Assignment;
DROP TABLE IF EXISTS Topic;
DROP TABLE IF EXISTS ProgressTracker;
DROP TABLE IF EXISTS Admins;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Course;
CREATE TABLE Course
(
	Id int NOT NULL AUTO_INCREMENT,
	startDate date,
	title varchar (255),
	shortDescription varchar (255),
	longDescription varchar (255),
	duration int,
	cost float,
	PRIMARY KEY(Id)
);
CREATE TABLE Users
(
	Id integer NOT NULL AUTO_INCREMENT,
	username varchar (255),
	email varchar (255),
	password varchar (255),
	isBlocked boolean DEFAULT false,
	createdAt date,
	PRIMARY KEY(Id)
);

CREATE TABLE Admins
(
	adminId int ,
	Id int,
	PRIMARY KEY(Id),
	FOREIGN KEY(Id) REFERENCES Users(Id)
);

CREATE TABLE ProgressTracker
(
	completedTopics int,
	id_ProgressTracker integer NOT NULL AUTO_INCREMENT,
	fk_UserId integer NOT NULL,
	fk_CourseId int NOT NULL,
	PRIMARY KEY(id_ProgressTracker),
	FOREIGN KEY(fk_UserId) REFERENCES Users (Id),
	FOREIGN KEY(fk_CourseId) REFERENCES Course (Id)
);

CREATE TABLE Topic
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar (255),
	TopicOrder int,
	shortDescription varchar (255),
	theory varchar (255),
	fk_CourseId int NOT NULL,
	PRIMARY KEY(id, fk_CourseId),
	FOREIGN KEY(fk_CourseId) REFERENCES Course (Id)
);

CREATE TABLE Assignment
(
	description varchar (255),
	id int NOT NULL AUTO_INCREMENT,
	title varchar (255),
	deadline date,
	fk_CourseId int NOT NULL,
	fk_Topicid int NOT NULL,
	PRIMARY KEY(id, fk_CourseId),
	CONSTRAINT contain FOREIGN KEY(fk_CourseId) REFERENCES Course (Id),
	CONSTRAINT is_related_to FOREIGN KEY(fk_Topicid) REFERENCES Topic (id)
);

CREATE TABLE AttendanceEntry
(
	isAttending boolean DEFAULT false,
	id_AttendanceEntry integer NOT NULL AUTO_INCREMENT,
	fk_CourseId int NOT NULL,
	fk_Topicid int NOT NULL,
	fk_Topicfk_CourseId int NOT NULL,
	fk_UserId integer NOT NULL,
	PRIMARY KEY(id_AttendanceEntry),
	UNIQUE(fk_Topicid, fk_Topicfk_CourseId),
	FOREIGN KEY(fk_CourseId) REFERENCES Course (Id),
	FOREIGN KEY(fk_Topicid, fk_Topicfk_CourseId) REFERENCES Topic (id, fk_CourseId),
	CONSTRAINT is_filled_by FOREIGN KEY(fk_UserId) REFERENCES Users (Id)
);

CREATE TABLE Media
(
	id int NOT NULL AUTO_INCREMENT,
	fileName varchar (255),
	fk_Topicid int NOT NULL,
	fk_Topicfk_CourseId int NOT NULL,
	PRIMARY KEY(id, fk_Topicid, fk_Topicfk_CourseId),
	CONSTRAINT contain FOREIGN KEY(fk_Topicid, fk_Topicfk_CourseId) REFERENCES Topic (id, fk_CourseId)
);

CREATE TABLE TimetableEntry
(
	id int NOT NULL AUTO_INCREMENT,
	time date,
	entryTitle varchar (255),
	link varchar (255),
	fk_CourseId int NOT NULL,
	fk_Topicid int NOT NULL,
	fk_Topicfk_CourseId int NOT NULL,
	PRIMARY KEY(id, fk_CourseId),
	CONSTRAINT has FOREIGN KEY(fk_CourseId) REFERENCES Course (Id),
	CONSTRAINT is_related_to FOREIGN KEY(fk_Topicid, fk_Topicfk_CourseId) REFERENCES Topic (id, fk_CourseId)
);

CREATE TABLE AssignmentEntry
(
	fileName varchar (255),
	rating integer,
	id_AssignmentEntry integer NOT NULL AUTO_INCREMENT,
	fk_Assignmentid int NOT NULL,
	fk_Assignmentfk_CourseId int NOT NULL,
	fk_UserId integer NOT NULL,
	PRIMARY KEY(id_AssignmentEntry),
	CONSTRAINT is_related_to FOREIGN KEY(fk_Assignmentid, fk_Assignmentfk_CourseId) REFERENCES Assignment (id, fk_CourseId),
	CONSTRAINT uploads FOREIGN KEY(fk_UserId) REFERENCES Users (Id)
);