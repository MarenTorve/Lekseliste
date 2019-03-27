SELECT  "tblUser"."fdUserName",
        "tblToDoList"."fdToDoListID",
        "tblToDoList"."fdUserID",
        "tblToDoList"."fdCaption",
        "tblSharedToDoList"."fdUserID" IS NOT NULL AND "tblSharedToDoList"."fdUserID" = $1 AS "fdFollow"
 FROM "tblToDoList"
 INNER JOIN "tblUser" ON "tblUser"."fdUserID" = "tblToDoList"."fdUserID"
 FULL JOIN "tblSharedToDoList" on
    "tblSharedToDoList"."fdSharedUserID" = "tblToDoList"."fdUserID" AND
    "tblSharedToDoList"."fdToDoListID" = "tblToDoList"."fdToDoListID" AND
    "tblSharedToDoList"."fdUserID" = $1
 WHERE "fdShared" = TRUE AND "tblToDoList"."fdUserID" <> $1
 ORDER BY "tblUser"."fdUserName", "tblToDoList"."fdToDoListID" ;