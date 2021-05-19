# The Big Top

## Description
User enters a location (Postal Code) and complete search with one button click to find events by category.

The first result will display the largest image and most detail, additional events will step down in detail.

Technologies used :html: :css: :javascript:

## API and Data Sample

- Ticketmaster 

  - [Ticketmaster API Docs](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)

  - Search API Endpoint & Parameters: `events.json?postalCode=10001&classification=music&apikey=${apikey}`

```json
{
    "_embedded": {
        "events": [
            {
                "name": "Harry Styles: Love On Tour",
                "type": "event",
                "id": "G5diZ4M1cQ32n",
                "test": false,
                "url": "https://www.ticketmaster.com/harry-styles-love-on-tour-new-york-new-york-10-03-2021/event/3B005772AD6923EA",
                "locale": "en-us",
                "images": [
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/987/76ff7a29-6b21-4ac5-bdf3-d7268760e987_1206471_EVENT_DETAIL_PAGE_16_9.jpg",
                        "width": 205,
                        "height": 115,
                        "fallback": false
                    },
                    {
                        "ratio": "3_2",
                        "url": "https://s1.ticketm.net/dam/a/987/76ff7a29-6b21-4ac5-bdf3-d7268760e987_1206471_ARTIST_PAGE_3_2.jpg",
                        "width": 305,
                        "height": 203,
                        "fallback": false
                    },
                    {
                        "ratio": "16_9",
                        "url": "https://s1.ticketm.net/dam/a/987/76ff7a29-6b21-4ac5-bdf3-d7268760e987_1206471_RETINA_LANDSCAPE_16_9.jpg",
                        "width": 1136,
                        "height": 639,
                        "fallback": false
                    },
```

## Wireframes
[Search:Before](https://whimsical.com/mvp-search-before-GKAiJrt2JtRX3Xn3sLdApn)

[Search:After](https://whimsical.com/mvp-search-after-W5SS6ffdSQDNMY5WPStdLt)

## MVP/PostMVP

### MVP 
- Create a location based search
- Grouping search results by event categories (concerts, sports, arts, family, etc.)
- Display multiple images from location search results
- Create modal for category results
- Reset search results for new search

### PostMVP  
Functionality
- Add a date to the search function
- Follow up search bar vs search reset
- Page options and expanded search results

Utility
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
|May 17| Approval 100% - Pseudocode 75% | Project Approval / JS Pseudocode
|May 18| Core Code 20% CSS 10% | Core Code & CSS Pt 1
|May 19| Pending | MVP & CSS Pt 2
|May 20| Pending | Fine Tuning
|May 21| Pending | Presentation

## Priority Matrix
[Link](https://whimsical.com/priority-chart-X3QPMc4fT3tBpvieoTZTbY)

## Timeframes

| Priority | Estimated Time | Time Invested | Actual Time | Component | Status |
| :---:    |  :---:         |  :---:        | :---:       | ---     | :---: |
| H        | 3.0 hrs        | 2.0 hrs      | 0.0 hrs      | API Research | 100%
| H        | 1.0 hrs        | 2.0 hrs      | 0.0 hrs      | Wireframe | 100%
| H        | 2.0 hrs        | 1.5 hrs      | 0.0 hrs      | Project Overview | 100%
| H        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      | JS Pseudocode | 80%
| H        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      | HTML structure | 80%
| H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | CSS Search Results:Before Mobile | 50%
| H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | CSS Search Results:After Mobile | 50%
| H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | CSS Search Results:Before Desktop | 50%
| H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | CSS Search Results:After Desktop | 50%
| H        | 1.5 hrs        | 0.0 hrs      | 0.0 hrs      | JS Search Functionality | 90%
| H        | 1.5 hrs        | 0.0 hrs      | 0.0 hrs      | JS Event Listeners | 100%
| H        | 1.5 hrs        | 0.0 hrs      | 0.0 hrs      | JS API Request | 100%
| H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | JS Filter search results for location | 90%
| H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | JS Filter search results for category | 100%
| H        | 1.5 hrs        | 0.0 hrs      | 0.0 hrs      | JS Create containers & append data | 100%
| H        | 2.5 hrs        | 0.0 hrs      | 0.0 hrs      | JS/CSS Modal creation | 20%
| H        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | JS Display results & images | 50%
| H        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      | JS Remove previous results | 100%
| L        | 3.0 hrs        | 0.0 hrs      | 0.0 hrs      | CSS Advanced Effects |
| M        | 1.0 hrs        | 0.0 hrs      | 0.0 hrs      | Presentation Prep |
| ---      | **42.5 hrs**        | **0.0 hrs**     | **0.0 hrs**      | **Total** |


## Code Snippet

```

```

## Change Log
