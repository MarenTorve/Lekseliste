SELECT * FROM "tblListItem"
WHERE "fdToDoListID" = $1 AND "fdUserID" = $2
ORDER BY "fdListItemID";