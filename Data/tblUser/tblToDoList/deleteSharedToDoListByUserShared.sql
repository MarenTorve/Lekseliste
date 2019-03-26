DELETE FROM "tblSharedToDoList"
WHERE "fdToDoListID" = $1 AND "fdSharedUserID" = $2;