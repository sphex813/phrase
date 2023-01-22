### Memsource Developer Assignment

Please prepare a production quality JavaScript/TypeScript (TS preferred) application with 2 screens:

- List of the projects
- Create a new project

#### Project list
on this page user should be able to:
- See total overview
    - no. of projects by the status
    - no. of projects with due date in the past
    - most prominent source language 
    
- See list of the projects
- Sort list by:
    - id
    - name
    - status
    - date due
- Filter list
    - name
    - status
- invoke the project creation
- invoke project edit action

![localhost_4173_ (1)](https://user-images.githubusercontent.com/26482886/213909914-c8cfe710-69ce-4312-b908-1245ffd5e03f.png)
    
    
#### Project create/edit page
On this page, user should be able to:
 - create/edit the project's:
    - name
    - source language
    - target language
    
![localhost_4173_](https://user-images.githubusercontent.com/26482886/213909919-659c28a1-0872-48ee-ad40-45a3aff3b96a.png)


Please, use this application as a backend for your app. 

Application is simple spring boot app and can be fired with `mvn spring-boot:run`

App starts on port `8090`

API documentation can be found on [http://localhost:8090/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config](http://localhost:8090/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config)
