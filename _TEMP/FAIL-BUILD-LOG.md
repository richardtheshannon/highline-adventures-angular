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
Filter settings
Filter Settings...

/
Source
Source Repo
richardtheshannon/highline-adventures-angular



Disconnect
Add Root Directory (used for build and deploy steps. Docs↗)
Branch connected to production
Changes made to this GitHub branch will be automatically pushed to this environment.
master

Disconnect
Wait for CI
Trigger deployments after all GitHub actions have completed successfully.

Networking
Public Networking
Access your application over HTTP with the following domains
highline-adventures-angular-production.up.railway.app
Port 8081

 · 
Metal Edge




Domain
highline-adventures-angular-production
.up.railway.app

Custom port
Enter the port your app is listening on

Target port
8081
Domain Available!


Cancel

Update

Custom Domain

TCP Proxy
Private Networking
Communicate with this service from within the Railway network.
highline-adventures-angular.railway.internal
IPv6


Ready to talk privately ·
You can also simply call me
highline-adventures-angular
.

DNS
highline-adventures-angular
.railway.internal

Endpoint name available!


Cancel

Update
Static Outbound IPs
This will assign a permanent IP address which your service will use for outbound traffic, however it cannot be used for inbound traffic.

Build
Builder

Dockerfile

Automatically Detected

Build with a Dockerfile using BuildKit. Docs↗

Watch Paths
Gitignore-style rules to trigger a new deployment based on what file paths have changed. Docs↗

Watch Paths
Deploy
Custom Start Command
Command that will be run to start new deployments. Docs↗

Start Command
Add pre-deploy step (Docs↗)
Regions
Configure how many instances of this service are deployed in each region.
US West (California, USA)

Replicas
1
Instance

Add Region
Teardown
Configure old deployment termination when a new one is started. Docs↗

Resource Limits
Max amount of vCPU and Memory to allocate to each replica for this service.
CPU: 32 vCPU

Plan limit: 32 vCPU

Memory: 32 GB

Plan limit: 32 GB

Increase your resources
Cron Schedule
Run the service according to the specified cron schedule.

Cron Schedule
Healthcheck Path
Endpoint to be called before a deploy completes to ensure the new deployment is live. Docs↗

Healthcheck Path
Serverless
Containers will scale down to zero and then scale up based on traffic. Requests while the container is sleeping will be queued and served when the container wakes up. Docs↗

Restart Policy
Configure what to do when the process exits. Docs↗
On Failure

Restart the container if it exits with a non-zero exit code.


Number of times to try and restart the service if it stopped due to an error.
Max restart retries
10
Config-as-code
Railway Config File
Manage your build and deployment settings through a config file. Docs↗

Add File Path
Delete Service
Deleting this service will permanently delete all its deployments and remove it from this environment. This cannot be undone.

Delete service
Source
Networking
Build
Deploy
Config-as-code
Feature-flags
Danger
highline-adventures-angular | Railway