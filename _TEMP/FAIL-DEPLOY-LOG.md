just-inspiration


production
Architecture
Observability
Logs
Settings

Share





Activity


highline-adventures-angular
Deployments
Variables
Metrics
Settings
highline-adventures-angular-production.up.railway.app
us-west2
1 Replica














History

highline-adventures-angular
/
72191ca
Aug 28, 2025, 6:54 PM
Failed

highline-adventures-angular-production.up.railway.app
Get Help

Details
Build Logs
Deploy Logs
HTTP Logs
Search build logs

You reached the start of the range
Aug 28, 2025, 6:54 PM
 
[Region: us-west1]
=========================
Using Detected Dockerfile
=========================

context: rlx2-6acp

internal
load build definition from Dockerfile
0ms

internal
load metadata for docker.io/library/node:22.12.0-alpine
731ms

auth
library/node:pull token for registry-1.docker.io
0ms

internal
load .dockerignore
0ms

1
FROM docker.io/library/node:22.12.0-alpine@sha256:51eff88af6dff26f59316b6e356188ffa2c422bd3c3b76f2556a2e7e89d080bd
5ms

internal
load build context
0ms

2
WORKDIR /app
44ms

3
COPY package*.json ./
13ms

4
RUN npm ci --only=production
8s
npm notice

5
COPY . .
212ms

6
RUN npm run build
253ms
> highline-adventures-angular@0.0.0 build
> ng build
sh: ng: not found
Dockerfile:15
-------------------
13 |
14 |     # Build the Angular app
15 | >>> RUN npm run build
16 |
17 |     # Install serve globally
-------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 127
You reached the end of the range
Aug 28, 2025, 6:54 PM


highline-adventures-angular | Railway