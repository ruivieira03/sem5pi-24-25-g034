#!/bin/bash

# Diretórios e arquivos relevantes
BACKUP_DIR="$HOME/dbbackups"
LOG_FILE="$HOME/db_backup_management.log"
ACCESS_GROUP="backup_admins"

# Criar o grupo de usuários (se necessário)
if ! grep -q "^$ACCESS_GROUP" /etc/group; then
    sudo groupadd $ACCESS_GROUP
    echo "Group $ACCESS_GROUP created."
fi

# Adicionar o usuário atual ao grupo
sudo usermod -aG $ACCESS_GROUP $USER
echo "User $USER added to $ACCESS_GROUP."

# Configurar permissões no diretório de backups
sudo chown -R $USER:$ACCESS_GROUP "$BACKUP_DIR"
sudo chmod -R 770 "$BACKUP_DIR"
echo "Permissions set for $BACKUP_DIR."

# Configurar permissões no arquivo de log
sudo chown $USER:$ACCESS_GROUP "$LOG_FILE"
sudo chmod 660 "$LOG_FILE"
echo "Permissions set for $LOG_FILE."

# Configurar auditoria de acessos (se disponível)
if command -v auditctl &> /dev/null; then
    sudo auditctl -w "$BACKUP_DIR" -p rwxa -k backup_access
    sudo auditctl -w "$LOG_FILE" -p rwxa -k log_access
    echo "Auditing enabled for $BACKUP_DIR and $LOG_FILE."
else
    echo "Auditctl not found. Skipping access auditing."
fi

echo "Access management configuration completed."
