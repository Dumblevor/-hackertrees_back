# hackertrees

## Overview

This is the third project of the software engineering immersive course at General Assembly London. The assignment was to create a full-stack website with React and Node.js. The project was to be completed **in a group** within **6 days** over 2 weeks. 

Preview: ![preview-screen](./readme-assets/preview-screen.png)
(navbar is shown for preview purposes, it us unavailable unless signed-in)


## Technologies used 

- React
- Node.js
- Mongoose
- Express
- MongoDB
- HTML
- CSS
- JavaScript
- Git and GitHub
- Bulma

## Approach

The idea from the beginning was to create a specialised professional network site for IT professionals. 
Me and my team wrote up user stories and wireframes using Miro:
![miro-screen](./readme-assets/miro-screen.png)

I took the lead on the social aspect of the site, including filtering, show/hide comments, tags, CRUD posts and comments, both on the fronend and backend. I also contributed to the home page, the middleware on the backend, the footer, about us page, login, register and logout. 


## Timeline
- Day 1 - Brainstorming & wireframes, user stories, pseudo models
- Day 2 - Boiler plate setup, Git setup, Jira, start of Sprint 1
- Day 4 - End of sprint 1, start of sprint 2
- Day 6 - End of sprint 2
- Day 7 - Deployment


## Jira setup 

My tickets are marked orange.

### Sprint 1:
#### MVP Roadmap
![initial-bakcklog](./readme-assets/MVP-roadmap.png)

#### Initial Backlog
![initial-bakcklog](./readme-assets/initial-backlog.png)

#### Backlog
![sprint-1-backlog](./readme-assets/Sprint-1-board.png)

#### Stretchgoals
![sprint-1-stretchgoals](./readme-assets/Stretchgoals-1.png)

#### MVP done
![mvp-done](./readme-assets/MVP-done.png)

--------


### Sprint 2
#### Board
![sprint-2-board](./readme-assets/Sprint-2-board.png)

#### Backlog
![sprint-2-bakcklog](./readme-assets/Spint-2-backlog.png)

#### Roadmap
![sprint-2-roadmap](./readme-assets/Spint-2-roadmap.png)

In total I completed 12 of 28 issues ~ 43% + initial teachnical, Git and Jira setups.

## Bugs, Wins & Learnings
Many features that were stretch goals were not finished, including search for the whole site, filtering by tags, upvotes for posts.
It was a great project and there is a throve of features that can be added to make it a proper product. 

Working in team is fun and can get a lot done when the group is in sync. 
I personally learned quite a bit about react, router, state and bulma on this project. 

A good idea was to keep updating the front end with a time interval:
```
  const getPostData = async () => {
    const { data } = await axios.get(`${baseUrl}/posts/`,
      {
        headers: { "authorization": `Bearer ${localStorage.getItem("token")}` },
      })
    setAllUserPosts(data)
  }

  useEffect(() => {
    getPostData()
    setInterval(() => {
      getPostData()
    }, 2000);
  }, [])
  ```

  That way the user will see up-to-date data. 
  Deleting comments and posts in real time using state also improves drastically the UX. 
  I aslo added a show/hide button for the comments so the feed doesn't clutter. 

Final version of the newsfeed:
![newsfeed](./readme-assets/final-social.png)


## Credits
- Logo: Dimitar Vidolov (via canva.com).
--------
