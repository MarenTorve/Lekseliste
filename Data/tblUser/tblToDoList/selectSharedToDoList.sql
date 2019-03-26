SELECT  "tblUser"."fdUserName",
        "tblToDoList"."fdCaption",
        "tblSharedToDoList"."fdCaption" AS "fdSharedCaption",
        "tblSharedToDoList"."fdToDoListID",
        "tblSharedToDoList"."fdSharedUserID"
    FROM "tblToDoList"
INNER JOIN "tblUser" ON
    "tblUser"."fdUserID" = "tblToDoList"."fdUserID"
INNER JOIN "tblSharedToDoList" ON
    "tblSharedToDoList"."fdSharedUserID" = "tblToDoList"."fdUserID" AND
    "tblSharedToDoList"."fdToDoListID" = "tblToDoList"."fdToDoListID" AND
    "tblSharedToDoList"."fdUserID" = $1
ORDER BY "fdUserName","fdCaption","tblSharedToDoList"."fdCaption"