CREATE TABLE "tblSharedToDoList"
(
    "fdSharedUserID" integer NOT NULL,
    "fdToDoListID" integer NOT NULL,
    "fdUserID" integer NOT NULL,
    "fdCaption" text,
    constraint "tblSharedToDoList_pkey"
        primary key ("fdSharedUserID", "fdToDoListID", "fdUserID"),
    constraint "tblSharedToDoList_fkey"
        foreign key ("fdSharedUserID", "fdToDoListID") references "tblToDoList"("fdUserID","fdToDoListID"),
    constraint "tblUser_fkey"
        foreign key ("fdUserID") references "tblUser"

);