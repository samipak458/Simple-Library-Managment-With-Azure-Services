# What is Azure Static Web Apps?
From your source code to worldwide availability, Azure Static Web Apps addresses the difficult difficulties. While you concentrate on designing your project, Azure Static Web Apps creates and hosts it using GitHub or Azure DevOps.

Libraries and frameworks such as Angular, React, Svelte, and Vue are often used to create static web apps. HTML, CSS, JavaScript, and picture assets are used to construct these apps. When employing a standard web server design, these files, together with any relevant API endpoints, are provided from a single server.

Static assets are isolated from a standard web server and instead served from points globally spread around the world with Azure Static Web Apps. Because files are physically closer to users, this distribution makes serving files significantly faster. Optional API endpoints are hosted utilizing a serverless architecture, which eliminates the requirement for a full back-end server entirely.

The Azure Static Web Apps approach is that you get exactly what you need, nothing more, nothing less.

![image](https://user-images.githubusercontent.com/52650290/188269931-18a94627-94c8-4d70-99a3-91ccf6151ff6.png)

## Create the Azure Static App
You're a web developer who has developed a web app. A web app is often composed of HTML, JavaScript, or CSS files and can be developed manually or by using a framework.

Before you can deploy the app to Azure, you need to build it.

- Create a repository for your app on GitHub.
- Run the app locally and view it via a browser.

With the copy created locally, you’re all set to start working on your code and site. Now you’ll explore how to deploy your site to the cloud. You’ll use Azure Static Web Apps to host your site. Using Azure Static Web Apps will allow you to quickly post your web site to the world. You can explore more [Azure Tips and Tricks: Static Web Apps](https://docs.microsoft.com/en-us/shows/azure-tips-and-tricks-static-web-apps?wt.mc_id=studentamb_202028) to learn more. 

Next, open Visual Studio Code then Open Folder in the editor.

1) If Azure Static Webs exptension isn't installed then install it first. Inside Visual Studio Code, select the Azure logo in the Activity Bar to open the Azure extensions window.

![image](https://user-images.githubusercontent.com/52650290/188270517-94ecb7aa-553f-4fa5-a315-a57411cdba32.png)

**Note: You are required to sign in to Azure and GitHub in Visual Studio Code to continue. If you are not already authenticated, the extension will prompt you to sign in to both services during the creation process.**

2) Under theStatic Web Apps label, select the plus sign.

![image](https://user-images.githubusercontent.com/52650290/188270550-e8bfc71e-6a78-4316-9865-31d4f53fddab.png)

3) The command palette opens at the top of the editor and prompts you to select a subscription name. 

Select your subscription and press **Enter**.
  
  ![image](https://user-images.githubusercontent.com/52650290/188270927-cf049857-afa6-4f87-87f9-b52245118732.png)
  
4) Next, name your application.
  
  ![image](https://user-images.githubusercontent.com/52650290/188270957-fcdcbc30-dcf1-40e5-b26e-34b462fcc7e7.png)

5) Select a region close to you.
  
**Note: Azure Static Web Apps globally distributes your static assets. The region you select determines where your optional staging environments and API function app will be located.**  
  
6) Select Custom 
  
  ![image](https://user-images.githubusercontent.com/52650290/188271044-613bdc41-77ba-4079-9b58-22e8d90f0c04.png)

Enter the location for the application files and press **Enter**.
  
This app does not produce a build output. Ensure the build output location is empty and press **Enter**.
  
7) Select “Open Actions in GitHub.” This will launch the GitHub Actions tab in your browser. You will see the workflow run as it is creating the app. When your webapp is built and deployed,you will see a check for the workflow run.  

Once the app is created, navigate back to Visual Studio Code -a confirmation notification is shown there. The Visual Studio Code extension also reports the build status to you as the deployment is in progress–and will update you when your app is built and deployed.
  
![image](https://user-images.githubusercontent.com/52650290/188271110-c08e7ab2-fa37-42c8-86e9-e55f6e8c82ff.png)

![image](https://user-images.githubusercontent.com/52650290/188271208-fbfd3728-3861-4ee7-bf91-0130a0b2e577.png)

Once the deployment is complete, you can navigate directly to your website.

8) To view the website in the browser, right-click on the project in the Static Web Apps extension, and select **Browse Site**.
  
![image](https://user-images.githubusercontent.com/52650290/188271276-e035840d-a291-436f-be25-765d8dea7810.png)

With your app deployed, Let's pushed your code to GitHub. You can push it in multiple ways. We do it with GitHub Desktop.

1) Do changes in code if required and save your changes in VS Code.
2) Navigate to GitHub Desktop and ensure that your Current Repository is opened (GitHub Desktop should reflect your recent changes like below)

![image](https://user-images.githubusercontent.com/52650290/188271450-327cc01f-4d75-4598-ace1-a7888845ed45.png)

3) In the bottom left of GitHub Desktop, give your changes a title (like “Added My Name” and add a description.
4) Select “Commit to Main”
5) Now, push your changes to GitHub by selecting “Push Origin”
6) Navigate to Actions in GitHub and view your web app’s build progress
7) When the build is complete, refresh your app and the changes should be reflected

### Note: If you want to host your app which is build using framework then follow this [Publish an Angular, React, Svelte, or Vue JavaScript app with Azure Static Web Apps](https://docs.microsoft.com/en-us/learn/modules/publish-app-service-static-web-app-api/2-exercise-get-started?wt.mc_id=studentamb_202028)

## Resource
[Azure Static Web Apps](https://docs.microsoft.com/en-us/learn/modules/publish-app-service-static-web-app-api?wt.mc_id=studentamb_202028)
  
