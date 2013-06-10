
# calendar-events

  Add events to an instance of [JayceTDE/calendar](https://github.com/JayceTDE/calendar)
  
  This adds a div to dates with events with a counter for the number of events

## Installation

    $ component install JayceTDE/calendar-events

## Example

```js

var Calendar = require('calendar')
  , calendarEvents = require('calendar-events')
  , cal = new Calendar()
;

calendarEvents.plugin(cal);

// Add an array of dates events
cal.events([ new Date(), "2000/1/01" ]);

// Add a single date event
cal.addEvent(new Date("2010/5/18"));

```

## License

  MIT
