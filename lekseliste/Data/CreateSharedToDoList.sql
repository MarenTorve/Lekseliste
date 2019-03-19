create table "tblSharedToDoListList"
(
	"fdSharedUserID"  integer not null,
	"fdToDoListID"    integer not null,
	"fdUserID"        integer not null,
	"fdCaption"       text,
	constraint "tblSharedList_pkey"
		primary key ("fdSharedUserID", "fdToDoListID", "fdUserID"),
	constraint "tblSharedList_fkey"
		foreign key ("fdToDoListID", "fdUserID") references "tblToDoList"
);