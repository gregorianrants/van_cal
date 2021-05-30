an application to manage booking for my man with a van business.

this is as much a project for me to learn web development as to meat the use it is designed for.

this is my first commit of my booking app

i have added mongodb database and google calendar integration to this
i was trying to create an api endpoint that created job on mongo and gcal
this is the current state of it

i also looked at just updating mongo and using a watcher to listen for changes and update gcal on an update event

i got all these things to work but they just didnt seem very elegant.
i.e. should a rest api update 2 resouces?
what if google not availble when event fires

i am going to branch this and make a version that just updates mongo db but i am going to do it in a way that gcal can just be dropped in and it works the same
i have discovered that i can set private properties on gcal so i could use it as a database and wouldnt need mongo.

however gcal may not be great once i start adding more features to the app.


