DELETE FROM "tblSharedToDoList" WHERE "fdSharedUserID" = $1;
DELETE FROM "tblListItem" WHERE "fdUserID" = $1;
DELETE FROM "tblToDoList" WHERE "fdUserID" = $1;
DELETE FROM "tblUser" WHERE "fdUserID" = $1;