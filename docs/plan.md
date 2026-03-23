# PLAN.md: Jarvis Nano Deployment Architecture

## Project Overview

Jarvis Nano is a multi-service web environment deployed on a single Hetzner Ubuntu Virtual Machine for the NGO, Asociatia Idei. It utilizes Docker for containerization and Nginx Proxy Manager (NPM) for routing and SSL management. The Next.js frontend will initially be deployed to a staging subdomain for testing prior to the final production launch.

## Tech Stack

- **Infrastructure:** Hetzner Cloud VM (16GB RAM / 8 vCPU) - IP: 46.224.64.146
- **Domain:** asociatia-idei.eu (Managed via Hostinger)
- **Containerization:** Docker & Docker Compose
- **Routing & SSL:** Nginx Proxy Manager (NPM)
- **Container Management:** Portainer
- **Frontend:** Next.js (integrated with Builder.io)
- **LMS Backend:** Open edX (deployed via Tutor)

---

## Execution Phases

### Phase 1: Server Preparation & Firewall

_Secure the bare VM and install the containerization engine._

1. SSH into the Hetzner VM: `ssh root@46.224.64.146`
2. Update the system packages:
   `sudo apt update && sudo apt upgrade -y`
3. Install Docker Engine using the official convenience script:
   `curl -fsSL https://get.docker.com -o get-docker.sh`
   `sudo sh get-docker.sh`
4. Configure the Uncomplicated Firewall (UFW) to lock down external access:
   `sudo ufw allow 22/tcp`
   `sudo ufw allow 80/tcp`
   `sudo ufw allow 443/tcp`
   `sudo ufw enable`

### Phase 2: Hostinger DNS Configuration

_Point the subdomains from Hostinger to the Hetzner VM. Do not include ports._

1. Log in to the Hostinger hPanel and navigate to **Advanced -> DNS Zone Editor** for `asociatia-idei.eu`.
2. Create **A Records** with the following exact values:
   - **Name:** `staging` -> **Points To:** `46.224.64.146`
   - **Name:** `portainer` -> **Points To:** `46.224.64.146`
   - **Name:** `npm` -> **Points To:** `46.224.64.146`
   - **Name:** `learn` -> **Points To:** `46.224.64.146`
   - **Name:** `studio.learn` -> **Points To:** `46.224.64.146`
3. Save the records and wait for DNS propagation.

### Phase 3: Management & Routing Layer

_Deploy the tools needed to route traffic and manage the server visually._

1. Create a directory on the VM for the routing stack:
   `mkdir -p /opt/jarvis-nano/routing && cd /opt/jarvis-nano/routing`
2. Create the `docker-compose.yml` file containing Nginx Proxy Manager and Portainer.
3. Start the stack: `docker compose up -d`
4. Access the NPM web interface by navigating to `http://46.224.64.146:81` in your browser.
5. Inside NPM, set up **Proxy Hosts** to route traffic internally and generate Let's Encrypt SSL certificates:
   - Map `npm.asociatia-idei.eu` to the NPM container's internal port (`81`).
   - Map `portainer.asociatia-idei.eu` to the Portainer container's internal port (`9000`).

### Phase 4: Frontend Deployment (Next.js Staging)

_Deploy the Next.js website in an isolated staging environment._

1. Add the multi-stage `Dockerfile` to your Next.js project repository.
2. Clone the repository onto the VM or pull the pre-built image.
3. Spin up the Next.js container, mapping it to internal port `3000`.
4. In the NPM visual UI, create a new Proxy Host mapping `staging.asociatia-idei.eu` to the server's local IP on port `3000`.
5. Request an SSL certificate for `staging.asociatia-idei.eu` via the NPM interface.

### Phase 5: LMS Deployment (Open edX via Tutor)

_Install and configure the learning management system._

1. Download and install the latest Tutor binary on the Ubuntu VM:
   `sudo curl -L "https://github.com/overhangio/tutor/releases/latest/download/tutor-$(uname -s)_$(uname -m)" -o /usr/local/bin/tutor`
   `sudo chmod 0755 /usr/local/bin/tutor`
2. Disable Tutor's internal web proxy to prevent it from conflicting with NPM. Run:
   `tutor config save --set ENABLE_WEB_PROXY=false`
   `tutor config save --set CADDY_HTTP_PORT=8181`
3. Initialize the Open edX environment:
   `tutor local launch`
4. In the NPM visual UI, create Proxy Hosts mapping both `learn.asociatia-idei.eu` and `studio.learn.asociatia-idei.eu` to the server's local IP on port `8181`.
5. Request SSL certificates for both LMS domains via the NPM interface.
