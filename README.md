# GoDaddy Proxy
Google cloud function for GoDaddy queries. To be used in conjunction with [Name Hacker](https://github.com/kolloldas/Namehacker)

### What does it do?
All this function does is to query the [GoDaddy](http://www.godaddy.com) for domain availability. GoDaddy requires an Authorization key to make this query hence I made this cloud function to keep the key private. Also GoDaddy servers have CORS disabled so anyways you can't make this query from a proper browser. Although meant to be deployed as a Google Cloud Function you can easily port the code to run on an Express server with minimal changes.

### Setting the Authorization Key
1. Register at [GoDaddy Developer](https://developer.godaddy.com/) and create an API key
2. Clone this repository
3. Create a `.env` file in the root of the repository and add the following entry
`GODADDY_API_KEY=<your API key>`

### Deploying the Function
Check this [tutorial](https://cloud.google.com/functions/docs/tutorials/http) for a step-by-step guide to writing and deploying cloud functions. Here I'll quickly walk you through the steps:
1. Register for Google Cloud
2. Create a new project and enable Cloud-Functions + Billing
3. Install and initialize the Google Cloud SDK
4. Install `gloud` Beta components
5. Create a Cloud Storage Bucket to host the function. Note the name.
6. Navigate to the root of the cloned repository and run the following command:
```
  gcloud beta functions deploy godaddyProxy --stage-bucket <your bucket name> --trigger-http
```
7. The function will be deployed and the corresponding URL will be shown on the terminal

### Testing the function
You can use cURL to make a query to the endpoint:
```
curl <cloud-url>?domain=terriblenames.com
```
You will get a json response like (the same response returned from GoDaddy):
```
{"available":true,"domain":"terriblenames.com","definitive":false,"price":7490000,"currency":"USD","period":1}
```

### Restricting Calls
If you want to restrict calls to this function from a specific domain (browser only) you can set the following in the `.env` file:
```
ALLOWED_DOMAIN=https://mysite.com
```
This will basically set the `Access-Control-Allow-Origin` header to your domain
