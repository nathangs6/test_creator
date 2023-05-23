#!/bin/bash
# Create new database
createdb -O postgres -U postgres tcDB

# Run the init.sql script
psql -U postgres -d tcDB -a -f "initDB.sql"
