# Project Overview

## Project Name
The Big Top

## Project Description
User enters a location (city,state) and complete search with one butten click to find events by category.

The first result will display the largest image and most detail, additional events will step down in detail.

Technologies used :html: :css: :javascript:

## API and Data Sample

- Ticketmaster 

  - [Ticketmaster DevTools Link](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)

  - Search Parameters: `events.json?classificationName=music&dmaId=324&apikey=${apikey}`

```
{
    "_embedded": {
        "events": [
            {
                "name": "Eagles",
                "type": "event",
                "id": "vv1AaZAqAGkdPXfSW",
                "test": false,
                "url": "https://www.ticketmaster.com/eagles-inglewood-california-10-16-2021/event/09005745E5F94CFD",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/c40/e0f4dedd-b435-4b8b-8fd0-e73e47e93c40_851341_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
```

## Wireframes
[Search:Before](https://whimsical.com/mvp-search-before-GKAiJrt2JtRX3Xn3sLdApn)

[Search:After](https://whimsical.com/mvp-search-after-W5SS6ffdSQDNMY5WPStdLt)

## MVP/PostMVP

### MVP 
- Create a "geosearch" and display results for local events by genre
- Responsive design for both before & after search results
- Differentiate the image sizing and detail for the search results

### PostMVP  
Functionality
- Add a date to the search function
- Follow up search bar vs search reset
- Page options and expanded search results

Resourcefulness
- Use this to search for nearby places of interest by event
- Create an itinerary search for a selected event

Aesthetic
- Animated transitions
- Hover effects on search results
- Shadowing and layers

## Project Schedule

|  Day | Status | Deliverable
|---|---|---|
|May 14| Complete | API Research / Wireframes 
|May 15| Complete | Wireframes 
|May 16| Complete | Project Overview / Schedule / Priority Matrix
|May 17| Pending | Project Approval / JS Pseudocode
|May 18| Pending | Core Code & CSS Pt 1
|May 19| Pending | MVP & CSS Pt 2
|May 20| Pending | Fine Tuning
|May 21| Pending | Presentation

## Priority Matrix
[Link](https://whimsical.com/priority-chart-X3QPMc4fT3tBpvieoTZTbY)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| ---     | :---:    |  :---:         |  :---:        | :---:       |
| API Research | H        | 3.0 hrs        | 2.0 hrs      | 0.0 hrs      |
| Wireframe | H        | 1.0 hrs        | 2.0 hrs      | 0.0 hrs      |
| Project Overview | H        | 2.0 hrs        | 1.5 hrs      | 0.0 hrs      |
| JS Pseudocode | H        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| HTML structure | H        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| CSS Framework | H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| CSS Search Results:Before Mobile | H        | 2.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| CSS Search Results:After Mobile | H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| CSS Search Results:Before Desktop | H        | 2.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| CSS Search Results:After Desktop | H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS User Input | H        | 0.5 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS Event Listener | H        | 0.5 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS API Request | H        | 1.5 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS Filter search results for location | H        | 2.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS Filter search results for category | H        | 2.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS Create containers & append data | H        | 1.5 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS Transition search query to search results | H        | 1.5 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS Display results & images | H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| JS Remove previous results | H        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| CSS Advanced Effects | L        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| Presentation Prep | M        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      |
| **Total** | ---      | **38.5 hrs**        | **0.0 hrs**     | **0.0 hrs**      |


## Code Snippet

```

```

## Change Log
