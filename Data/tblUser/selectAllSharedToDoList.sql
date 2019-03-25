select
    "tblUser"."fdUserName",
    "tblToDoList"."fdToDoListID",
    "tblToDoList"."fdUserID",
    "tblToDoList"."fdCaption",
    "tblSharedToDoList"."fdUserID" is not null  and "tblSharedToDoList"."fdUserID" = $1 as "fdFollow"
  from "tblToDoList"
    inner join "tblUser" on "tblUser"."fdUserID" = "tblToDoList"."fdUserID"
    full join "tblSharedToDoList" on
    "tblSharedToDoList"."fdToDoListID" = "tblToDoList"."fdToDoListID" and
    "tblSharedToDoList"."fdSharedUserID" = "tblToDoList"."fdUserID" and
    "tblSharedToDoList"."fdUserID" = $1
where "fdShared" = true and "tblToDoList"."fdUserID" <> $1
order by "tblUser"."fdUserName", "tblToDoList"."fdToDoListID";