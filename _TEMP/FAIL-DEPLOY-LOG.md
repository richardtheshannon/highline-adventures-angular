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
2d35e02
Aug 28, 2025, 7:29 PM
Active

highline-adventures-angular-production.up.railway.app

Details
Build Logs
Deploy Logs
HTTP Logs
Search build logs

You reached the start of the range
Aug 28, 2025, 7:29 PM
 
[Region: us-west1]
=========================
Using Detected Dockerfile
=========================

context: hvv4-FmM0

internal
load build definition from Dockerfile
0ms

internal
load metadata for docker.io/library/node:22.12.0-alpine
306ms

internal
load .dockerignore
0ms

internal
load build context
0ms

[ 4/13] RUN npm ci cached
0ms

[ 3/13] COPY package*.json ./ cached
0ms

[ 2/13] WORKDIR /app cached
0ms

[ 5/13] COPY . .
46ms

[ 6/13] RUN sed -i "s/${FIREBASE_API_KEY}/98j34f9493uh4938h4/g" src/environments/environment.prod.ts
74ms

[ 7/13] RUN sed -i "s/${GOOGLE_CALENDAR_API_KEY}/AIzaSyD30vJavMZl5S6HJrs18-slnpiKsawz1gw/g" src/environments/environment.prod.ts
224ms

[ 8/13] RUN npm run build
7s
Output location: /app/dist/highline-adventures-angular

[ 9/13] RUN ls -la dist/
91ms
drwxr-xr-x 3 root root 4096 Aug 29 02:29 highline-adventures-angular

1
RUN ls -la dist/highline-adventures-angular/ || echo "Directory doesn't exist, checking alternatives..."
91ms
-rw-r--r-- 1 root root 18 Aug 29 02:29 prerendered-routes.json

1
RUN find dist/ -name "index.html" -type f || echo "No index.html found"
117ms
dist/highline-adventures-angular/browser/index.html

1
RUN npm install -g http-server
2s
run `npm fund` for details

1
RUN npm prune --production
3s
Run `npm audit` for details.

auth
sharing credentials for production-us-west2.railway-registry.com
0ms
Build time: 37.44 seconds
You reached the end of the range
Aug 28, 2025, 7:30 PM


highline-adventures-angular | Railway