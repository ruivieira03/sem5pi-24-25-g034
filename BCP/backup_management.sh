#!/bin/bash

# Backup Settings
BACKUP_DIR="$HOME/dbbackups"  # Directory where backups are stored
LOG_FILE="$HOME/db_backup_management.log"  # Log file location

# Function to log messages
log_message() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Ensure the backup directory exists
mkdir -p "$BACKUP_DIR"

# Backup Management
log_message "Starting backup management."

# 1. Retain 1 backup per day for the last week
find "$BACKUP_DIR" -type f -name "*.sql" -mtime +7 -exec rm {} \;
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +7 -exec rm {} \;

# 2. Retain 1 backup per week for the last month
find "$BACKUP_DIR" -type f \( -name "*.sql" -o -name "*.gz" \) | while read FILE; do
    FILE_DATE=$(basename "$FILE" | grep -oP '\d{8}')
    FILE_DATE_FORMATTED=$(date -d "$FILE_DATE" +"%Y-%m-%d")
    WEEK_NUMBER=$(date -d "$FILE_DATE_FORMATTED" +"%U")
    CURRENT_WEEK=$(date +"%U")
    YEAR=$(date -d "$FILE_DATE_FORMATTED" +"%Y")
    if [ "$WEEK_NUMBER" -lt "$CURRENT_WEEK" ] && [ "$YEAR" -eq "$(date +"%Y")" ]; then
        rm "$FILE"
    fi
done

# 3. Retain 1 backup per month for the last year
find "$BACKUP_DIR" -type f \( -name "*.sql" -o -name "*.gz" \) | while read FILE; do
    FILE_DATE=$(basename "$FILE" | grep -oP '\d{8}')
    FILE_DATE_FORMATTED=$(date -d "$FILE_DATE" +"%Y-%m-%d")
    MONTH=$(date -d "$FILE_DATE_FORMATTED" +"%m")
    YEAR=$(date -d "$FILE_DATE_FORMATTED" +"%Y")
    PREVIOUS_YEAR=$(date +"%Y" -d "1 year ago")
    if [ "$YEAR" -eq "$PREVIOUS_YEAR" ]; then
        rm "$FILE"
    fi
done

log_message "Backup management completed."
