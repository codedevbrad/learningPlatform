<div align="center">
    <h1 id="the-coding-bootcamp"> The Coding Bootcamp </h1>
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hundred%20Points.png" alt="Hundred Points" width="90" height="90" />
</div>

<div align="center">
    <div align="center">
      The Coding Bootcamp is a Learning Platform built for my students who I tutor. The platform provides the student with the ability to message and book sessions with the tutor whilst being set quizzes, tasks, mini challenges, explanations, and videos derived through concepts and challenges tagged by a language and type. 
    </div>
    <br />
    <a href="https://skillicons.dev">
      <img src="https://skillicons.dev/icons?i=nextjs,tailwind,mongodb,prisma,ai" />
    </a>
</div>

<br />

<div align="center">
    <h3 id="follow-my-journey-in-notion"> Follow my journey in notion </h3>
    <a href="https://bradlumberdev.notion.site/Learning-platform-8674b50ceed74ff2bb1d964a01d3a709?pvs=4">
      <img src="https://skillicons.dev/icons?i=notion" />
    </a>
</div>

## Table of Contents

<div align="left">

1. [The Coding Bootcamp](#the-coding-bootcamp)
2. [Project Features](#project-features)
   - [The Bootcamp](#the-bootcamp)
   - [Tutor Area for Management of Students and Bootcamp Content](#tutor-area-for-management-of-students-and-bootcamp-content)
   - [Tutor Sessions and Messaging](#tutor-sessions-and-messaging)
3. [In Depth](#in-depth)
   - [Content Blocks](#content-blocks)
   - [A.I Integration](#ai-integration)
4. [Setup](#setup)
   - [.ENV Variables](#env-variables)
5. [Services](#services)
   - [Clerk Authentication](#clerk-authentication)
   - [OpenAI Integration](#openai-integration)
6. [Running the App](#running-the-app)

</div>

<br />

## Project Features

<div align="center">
   <div>
    <h3 id="the-bootcamp">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="55" height="55" style="vertical-align: middle;" /> 
        The Bootcamp 
    </h3> 
    <p> A full-featured coding bootcamp platform, designed for ease of use, with tasks, challenges, and learning materials tailored for students. </p>
    <div> 
      <img src="https://github.com/user-attachments/assets/238bdc13-34bd-48cc-a2e0-bf550bba5318" />   
    <div>
   </div>
   <div>
    <h3 id="tutor-area-for-management-of-students-and-bootcamp-content"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Artist%20Medium%20Skin%20Tone.png" alt="Artist Medium Skin Tone" width="55" height="55" style="vertical-align: middle;" /> Tutor Area for Management of Students and Bootcamp Content </h3>
    <p> Tutors can manage students, create new course content, assign challenges, and track progress through the platform. </p>
   </div>
   </div>
   </br>
    <div align="center"> 
      <img src="https://github.com/user-attachments/assets/d50d5a5f-0141-40fe-a0f5-67ffa3e040e8"
    <div>
   </div>
   <div>
    <h3 id="tutor-sessions-and-messaging"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Calendar.png" alt="Calendar" width="55" height="55" style="vertical-align: middle;" /> Student Learning area </h3>
     <p> complete concept pages and write notes within the pages detailing any learning. View all of the work you've done in your student area. </p>
   </div>
    <div>
    <h3 id="tutor-sessions-and-messaging"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Calendar.png" alt="Calendar" width="55" height="55" style="vertical-align: middle;" /> Tutor Sessions and Messaging </h3>
     <p> Integrated scheduling and messaging system for booking sessions and communicating directly with students. </p>
   </div>
</div>

<br />
<br />

<h1 id="in-depth"> In Depth </h1>
<h3 id="content-blocks"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png" alt="Bubbles" width="45" height="45" /> Content Blocks </h3> 
<div align="center">
    <div>
        <h3> Video and image </h3>
    </div>
    <div>
        <h3> explanation </h3>
    </div>
    <div>
        <h3> Quiz </h3>
    </div>
    <div>
        <h3> Task and challenges </h3>
    </div> 
    </div>
</div>

<div align="center">
    <br />
    <h3 id="ai-integration"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png" alt="Robot" width="45" height="45" /> A.I Integration </h3> 
    <p>
        Currently, OpenAI is used for generating concept blocks in the creation phase.
    </p>
    <div align="center"> 
      <img src="https://github.com/user-attachments/assets/81738be9-8f1e-4d22-a727-5e2f3893845f"
    <div>
</div>

<br />

## Setup

<h3 id="setup"> environment Setup </h3>

### .ENV Variables
| Variable                             | Description                                          |
|--------------------------------------|------------------------------------------------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY    | Public key for the Clerk authentication service.     |
| CLERK_SECRET_KEY                     | Secret key for the Clerk authentication service.     |
| DATABASE_URL                         | URL for the database connection.                     |
| BASE_URL                             | Base URL for the application.                        |
| OPENAI_CREDS                         | Credentials for the OpenAI service.                  |
| CLOUDINARY_API_SECRET                | Cloudinary API secret.                               |
| CLOUDINARY_API_KEY                   | Cloudinary API key.                                  |
| CLOUDINARY_CLOUD_NAME                | Cloudinary cloud name.                               |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME    | Public cloud name for Cloudinary.                    |
| NEXT_PUBLIC_CLOUDINARY_PRESET_NAME   | Cloudinary preset name.                              |

### .development.env 
| Variable                             | Description                                          |
|--------------------------------------|------------------------------------------------------|
| DATABASE_URL                         | URL for the dev database connection.                 |

### .production.env
| Variable                             | Description                                          |
|--------------------------------------|------------------------------------------------------|
| DATABASE_URL                         | URL for the prod database connection.                |

---

<br />

<h3 id="adminsetup"> Admin access </h3>

you need to run 
</br>

    npm run setup:create-admin <userid> "<name>"
    
In order to create an admin role for a user so they can access the admin and start interacting with Students or working on creating the platform content.

the userid should be gathered from clerk


![gif-clerk](https://github.com/user-attachments/assets/be4f188c-1ed3-4dba-a7a9-5e28bdb734cc)


</br>

<h2 id="services"> Services </h2>

<div align="left">
    
### Clerk Authentication
Clerk.com is an authentication and user management service that simplifies the process of adding user authentication and management to your web applications. Steps involved:
1. Head to https://dashboard.clerk.com/
2. Add a new application and fill in name and login providers.
3. Select Next.js from the quickstart and copy the API keys to the `.env` file.

### OpenAI Integration
ChatGPT, the sibling model to InstructGPT, is a form of generative AI — a tool that lets users enter prompts to receive humanlike images and text. We use this tool to generate social media post ideas. Steps involved to set up:
1. Head to https://openai.com/ and sign up.
2. Navigate to https://platform.openai.com/account/api-keys and generate a new secret key.
3. Paste the key into the `.env` file with the appropriate key name.

### cloudinary
Cloudinary is used to store the project assets and block images.
1. navigate to ...
2. get the secret keys and paste into. 

</div>


## Running the App
Follow the steps to set up and run the application.

</div>


## working with the project.

Linking Commits to Issues:

When working on an issue, reference it directly in the commit messages. Use keywords like 
* Fixes #issue_number, 
* Closes #issue_number, 
* Resolves #issue_number. 
This automatically closes the issue when the commit is merged into the main branch. For example:
sql.
 
```git commit -m "Fixes #12 - Add feature X"
You can also use References #issue_number if you’re working on the issue but aren’t resolving it yet. This links the commit to the issue without closing it.
Branch Naming:

Use descriptive branch names that include the issue number, like feature/12-add-login-form or bug/15-fix-loading-state. This keeps the branch history organized and helps you track progress by feature or bug.
Pull Requests (PRs):

When you create a pull request (PR), 

mention the issue in the description. GitHub will automatically link the PR to the issue.
Using Closes #issue_number in the PR description will also close the issue upon merge. 
This approach is often better than closing from a single commit, as it tracks all the work involved.
Track Progress with Project Boards (Optional):

For a more visual overview, use GitHub Projects or the Kanban board built into the repository. You can create a card for each issue and move it across columns like "To Do," "In Progress," and "Done" to track the issue's status.
Regular Updates in Issues:

Drop comments in the issue as you make progress, especially for larger tasks. This provides a log of decisions and progress for yourself and collaborators.
Milestones and Labels:


Use labels to categorize issues (e.g., bug, enhancement, documentation) and milestones for larger goals. Milestones can help you track overall progress for a set of issues, especially if you’re working toward a release.



## resources used

https://www.flaticon.com/
..