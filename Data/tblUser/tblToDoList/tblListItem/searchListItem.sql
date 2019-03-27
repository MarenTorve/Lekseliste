SELECT DISTINCT "tblUser"."fdUserName", "tblToDoList"."fdCaption", "tblListItem".*, "tblTag"."fdCaption", "tblToDoList"."fdUserID" = 3 as "fdOwner" FROM "tblToDoList"
 LEFT JOIN "tblSharedToDoList" ON
   "tblSharedToDoList"."fdSharedUserID" = "tblToDoList"."fdUserID" AND
   "tblSharedToDoList"."fdToDoListID" = "tblToDoList"."fdToDoListID"
  INNER JOIN "tblListItem" ON
    "tblListItem"."fdToDoListID" = "tblToDoList"."fdToDoListID" AND
    "tblListItem"."fdUserID" = "tblToDoList"."fdUserID"
   INNER JOIN "tblUser" ON "tblUser"."fdUserID" = "tblToDoList"."fdUserID"
   LEFT JOIN "tblTag"  ON "tblTag"."fdTagID" = "tblListItem"."fdTagID"
 WHERE ("tblSharedToDoList"."fdUserID" = 3 OR "tblToDoList"."fdUserID" = 3) AND "tblListItem"."fdCaption" LIKE '%e%'
 ORDER BY "fdOwner" desc,"tblListItem"."fdUserID", "tblListItem"."fdToDoListID", "tblListItem"."fdListItemID";