var dateAttr = require('calendar').dateAttr
  , classes = require('classes')
;

function events(events) {
    var cal = this
      , i = 0
      , l = events.length
    ;
    
    while (i < l) {
        cal.addEvent(events[i]);
        i += 1;
    }
    
}

function addEvent(date) {
    
    date = date instanceof Date ? dateAttr(date) : date;
    
    var cal = this
      , events = cal._events
    ;
    
    if (!events[date]) events[date] = 0;
    
    events[date] += 1;
    
    attachEvent(cal, date, events[date]);
    
    return cal;
}

function renderEvents(date) {
    var cal = this;
    
    if (cal.fetchEvents) {
        cal.fetchEvents(date, function (events) {
            attachEvents(cal, events);
        });
    }
    
    attachEvents(cal, cal._events);
    
}

function attachEvents(cal, events) {
    
    var date = new Date(cal._date);
    
    date.setDate(1);
    
    var start = dateAttr(date);
    
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    
    var end = dateAttr(date);
    
    for (var date in events) {
        if (events.hasOwnProperty(date)) {
            if (date >= start && date <= end) {
                attachEvent(cal, date, events[date]);
            }
        }
    }
}

function attachEvent(cal, date, events) {
    
    var el = cal.getElementByDate(date)
      , ev
      , existing
    ;
    
    if (!el) return;
    
    existing = el.querySelector('.events');
    
    if (existing) {
        existing.textContent = events;
    } else {
        var ev = document.createElement('div');
        
        ev.className = 'events';
        ev.textContent = events;
        
        el.appendChild(ev);
    }
    
}

exports.plugin = function (calendar) {
    
    calendar._events = {};
    
    calendar.events = events;
    calendar.addEvent = addEvent;
    
    calendar.on('render', renderEvents);
    
};