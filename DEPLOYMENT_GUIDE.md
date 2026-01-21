# n8n VPS Deployment Guide

This guide provides step-by-step instructions to deploy n8n with PostgreSQL on a Virtual Private Server (VPS), specifically tailored for Google Cloud Platform (GCP).

## 1. Prerequisites

Before you begin, ensure you have:

- **VPS**: A Google Cloud VM instance (or similar Linux server).
  - **OS**: Debian or Ubuntu recommended.
  - **Public IP**: The external IP of your instance (e.g., `34.143.140.23`).
- **Firewall Rules**: You MUST open port **5678** (TCP) to allow web access.
- **Docker**: Installed on the VPS.

### 1.1 Configure Google Cloud Firewall (Crucial)

1.  Go to **VPC Network** > **Firewall**.
2.  Click **Create Firewall Rule**.
3.  **Name**: `allow-n8n`
4.  **Targets**: `All instances in the network`
5.  **Source IPv4 ranges**: `0.0.0.0/0`
6.  **Protocols and ports**: TCP `5678`
7.  Click **Create**.

---

## 2. Configuration Setup

Ensure these files are properly configured in your local project folder:

### `.env` File

Contains your secrets and server IP.

```env
# Postgres (Root & User)
POSTGRES_USER=n8n
POSTGRES_PASSWORD=your_secure_root_password
POSTGRES_DB=n8n
POSTGRES_NON_ROOT_USER=n8n
POSTGRES_NON_ROOT_PASSWORD=your_secure_user_password

# n8n Configuration
N8N_HOST=YOUR_VPS_IP
N8N_PORT=5678
N8N_PROTOCOL=http
WEBHOOK_URL=http://YOUR_VPS_IP:5678/
GENERIC_TIMEZONE=Asia/Manila
N8N_CORS_ORIGIN=*
N8N_SECURE_COOKIE=false

# n8n Database Connection (Must match NON_ROOT values above)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=your_secure_user_password

# API Keys
GEMINI_API_KEY=your_gemini_api_key
```

### `docker-compose.yml`

Defines the `n8n` and `postgres` services, including healthchecks and initialization scripts.

### `init-data.sh`

A shell script that automatically creates the non-root Postgres user.

---

## 3. Deployment

Choose ONE of the following methods.

### Method A: Manual Upload (Recommended for Google Cloud)

This method is reliable if you like using the "SSH-in-browser" feature.

1.  **Open SSH**: Click "SSH" on your VM instance in Google Cloud Console.
2.  **Upload Files**: Click the **Upload File** button (gear icon or top menu) and upload these 4 files:
    - `docker-compose.yml`
    - `.env`
    - `init-data.sh`
    - `n8n_workflow.json` (Optional)
3.  **Run Deployment Commands**:
    Copy and paste these commands into your SSH terminal:

    ```bash
    # 1. Create directory and move files
    mkdir -p n8n
    mv docker-compose.yml .env init-data.sh n8n_workflow.json n8n/ 2>/dev/null || mv docker-compose.yml .env init-data.sh n8n/

    # 2. Go into directory
    cd n8n

    # 3. Fix line endings (Crucial for Windows uploads)
    sed -i 's/\r$//' init-data.sh
    chmod +x init-data.sh

    # 4. Start Services
    sudo docker compose up -d
    ```

### Method B: Automated Script (PowerShell)

If you have SSH access from your local terminal:

```powershell
.\deploy.ps1 -Ip "YOUR_VPS_IP" -User "your_ssh_username"
```

---

## 4. Troubleshooting

### "Site Can't Be Reached" / Connection Timed Out

- **Cause**: Firewall is blocking port 5678.
- **Fix**: Follow step **1.1 Configure Google Cloud Firewall** above.

### "Container n8n-postgres-1 is unhealthy"

- **Cause**: `init-data.sh` has Windows line endings (`\r\n`), causing it to fail on Linux.
- **Fix**:
  ```bash
  cd ~/n8n
  sed -i 's/\r$//' init-data.sh
  sudo docker compose down -v
  sudo docker compose up -d
  ```

### "Invalid Tar Header" / Docker Errors

- **Cause**: Corrupted Docker download cache.
- **Fix** (The "Nuclear Option"):
  ```bash
  sudo systemctl stop docker
  sudo rm -rf /var/lib/docker
  sudo systemctl start docker
  sudo docker compose up -d
  ```

### Verify Deployment

Run this command to check status:

```bash
sudo docker compose ps
```

Both `n8n` and `postgres` should show status **Up (healthy)**.
