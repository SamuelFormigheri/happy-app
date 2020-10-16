## The CACHE PROVIDER is not being used, and neither the NOTIFICATIONS REPOSITORY, but it's ready and working.

# CACHE PROVIDER Details...

Use the CACHE PROVIDER in routes that load a lot of data and just remove from cache when the data loaded was updated, deleted or removed.
For example, if you have appointments being loaded in a route, you load the appointments the next time from cache, except if the appointments changed, then you remove the cache.

# NOTIFICATIONS REPOSITORY Details...

Use if you want to notificate a user when it's realize an operation that involves him. 
For example, an appointment was created and the user A create with the user B the appointment. So you notificate the user B.


