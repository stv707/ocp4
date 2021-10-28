# ocp4 - Extra Exercise A
- ocp4 configmap lab for DHL D180 training 
- The Idea of this lab is to have 2 app(containers) to call 1 single configmap 
- The configmap is created via oc command using multi file 

- Before your begin this extra exercise, clone this repo to your workstation machine 
```sh 
[student@workstation ~]$ git clone https://github.com/stv707/ocp4.git

[student@workstation ~]$ cd ocp4/

[student@workstation ocp4]$ ls -l
```


### Step 1 
- Review the content of data/ directory 
```sh 

[student@workstation ocp4]$ cat data/red.yml

[student@workstation ocp4]$ cat data/blue.yml

```

### Step 2 
- Create a new project in ocp and a new configmap to hold blue.yml and red.yml file
```sh 
[student@workstation ocp4]$ oc new-project dhl-demo

[student@workstation ocp4]$ oc get configmaps

[student@workstation ocp4]$ oc create configmap dhlconfigmap --from-file=data/

[student@workstation ocp4]$ oc get configmaps

[student@workstation ocp4]$ oc describe configmaps dhlconfigmap

```

### Step 3 
- Create app1 and app2 
```sh 
[student@workstation ocp4]$ cat app1-cm.yaml

[student@workstation ocp4]$ oc create -f app1-cm.yaml

[student@workstation ocp4]$ cat app2-cm.yaml

[student@workstation ocp4]$ oc create -f app2-cm.yaml

[student@workstation ocp4]$ oc get all

[student@workstation ocp4]$ oc expose service dhlapp1

[student@workstation ocp4]$ oc expose service dhlapp2

[student@workstation ocp4]$ oc get routes.route.openshift.io

```

### Step 4 
- Access OCP4 Web Console and Access Project dhl-demo 
- You should see 2 container pods with external link ( dhlapp1 and dhlapp2 ) 
- Access the url link on each app 


### Step 5 
- Delete all Resources 
```sh 
[student@workstation ocp4]$ oc delete -f app1-cm.yaml

[student@workstation ocp4]$ oc delete -f app2-cm.yaml

[student@workstation ocp4]$ oc get all 

[student@workstation ocp4]$ oc delete routes.route.openshift.io dhlapp1

[student@workstation ocp4]$ oc delete routes.route.openshift.io dhlapp2

```
# ocp4 - Extra Exercise B

### Step 1
- Create DeploymentConfigs 

```sh 
[student@workstation ocp4]$ oc new-app --as-deployment-config --name=dhlapp1 https://github.com/stv707/ocp4.git --context-dir=app1

[student@workstation ocp4]$ oc new-app --as-deployment-config --name=dhlapp2 https://github.com/stv707/ocp4.git --context-dir=app2

[student@workstation ocp4]$ oc expose service dhlapp1

[student@workstation ocp4]$ oc expose service dhlapp2

[student@workstation ocp4]$ oc set volumes dc dhlapp1 --add --configmap-name=dhlconfigmap -m /data

[student@workstation ocp4]$ oc set volumes dc dhlapp2 --add  --configmap-name=dhlconfigmap -m /data

[student@workstation ocp4]$ oc set volume dc dhlapp1

[student@workstation ocp4]$ oc set volume dc dhlapp2

```

### Step 2
- Change configmap and update deployment config 
```sh 
[student@workstation ocp4]$ oc set volume dc dhlapp1

[student@workstation ocp4]$ oc set volume dc/dhlapp1 --remove --name=<volume_name_from_above_output>

[student@workstation ocp4]$ oc set volume dc dhlapp2

[student@workstation ocp4]$ oc set volume dc/dhlapp2 --remove --name=<volume_name_from_above_output>

[student@workstation ocp4]$ oc delete configmaps dhlconfigmap
* Navigate to app1 and app2 route to verify the config goes default

[student@workstation ocp4]$ vim data/blue.yml
* change some value 

[student@workstation ocp4]$ vim data/red.yml
* change some value 

[student@workstation ocp4]$ oc create configmap dhlconfig --from-file=data/

[student@workstation ocp4]$ oc describe configmaps  dhlconfig

[student@workstation ocp4]$ oc set volumes dc dhlapp1 --add --configmap-name=dhlconfig -m /data

[student@workstation ocp4]$ oc set volumes dc dhlapp2 --add --configmap-name=dhlconfig -m /data


```
# END





















