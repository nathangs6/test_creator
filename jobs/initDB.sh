#!/bin/bash
# Drop and create new database
dropdb tctest || echo "tctest doesn't exist, moving on"
createdb -O yewlkang -U yewlkang tctest

# Run the init.sql script
psql -U yewlkang -d tctest -a -f "initDB.sql"
