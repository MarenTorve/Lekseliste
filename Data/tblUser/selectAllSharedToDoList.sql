SELECT "tblUser"."fdUserName", "tblToDoList" .* FROM "tblToDoList"
    INNER JOIN "tblUser" ON "tblUser"."fdUserID" = "tblToDoList"."fdUserID"
    WHERE "fdShared" = TRUE AND "tblToDoList"."fdUserID" <> $1
    ORDER BY "tblUser"."fdUserName";