# CMS Assignment

### Node with express to create rules

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/jaihindjonna/cms_assignment.git
cd cms_assignment
```

```bash
npm install
```

## Steps for accessing the server

To start the express server, run the following

```bash
npm start
```

To start the express server in developement mode, run the following

```bash
npm run dev
```

To test all the test cases given in the task, run the following

```bash
npm test
```


#### API to create rules details
```bash
Endpoint:  http://localhost:3000/upload
Method: POST
Payload: form-data:{
    file: {file}
}
```

##### Output

```bash
An xlsx file will be stored in outputs folder

Returns A JSON object of the output xlsx file data
```
