INSERT INTO "tblListItem" ("fdListItemID","fdToDoListID", "fdUserID", "fdCaption", "fdDateCreate", "fdDateDone", "fdDateDue")
VALUES (
    (SELECT COALESCE(MAX("fdListItemID"),0) + 1 AS "newID" FROM "tblListItem" WHERE "fdToDoListID" = $1 AND "fdUserID" = $2), $1, $2, $3, $4, $5, $6
  );
