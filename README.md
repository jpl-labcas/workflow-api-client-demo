# labcas-workflow-api-client-demo

This is a demo project to display a README.md file using plain HTML, CSS, and JavaScript.

You first need to run the local proxy to avoid CORS issus:

    npm install express
    npm install http-proxy-middleware
    export LABCAS_WORKFLOW_API_BASE_URL={the base URL of the Labcas Workflow API}
    node proxy.js

Then publish the file index.html in a web server. You can use Live Server in VSCode IDE or a regualar nginx or apache server.

Go to the URL, with Live Server:

    http://127.0.0.1:5500/index.html