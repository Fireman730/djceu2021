# Apache Guacamole

<!-- Note -->
So the technology that this all revolves around is Apache
Guacamole. And we're going to do a bit of a refresher on Guacamole
terms and technology here.

So from here on out we're assuming two things.


<!-- .slide: data-background-image="images/guacamole-overview-01.svg" data-background-size="contain" -->

<!-- Note -->
1. You're a learner on our platform, and you've opened a page in a
   course that contains a lab. That lab has successfully spun up a
   random box somewhere in the cloud. So, "there is something for us
   to work with".


<!-- .slide: data-background-image="images/guacamole-overview-02.svg" data-background-size="contain" -->

<!-- Note -->
2. We’re able to connect to an IP address (IPv4 or IPv6, doesn't
   matter) that's been exposed on that box, and to two TCP ports: one
   for secure shell (usually port 22), and one for RDP (usually port
   3389). (We could also be using VNC, but the same principle
   applies. So we'll just stick with SSH and RDP for now, to keep it
   simple.)


<!-- .slide: data-background-image="images/guacamole-overview-03.svg" data-background-size="contain" -->

<!-- Note -->
All right, now. The first thing we'll look at is the Guacamole
**server**, or `guacd`. This is a server binary that's written in C,
so it's very fast and efficient, and it connects to upstream SSH or RDP
(or VNC) services using **protocol plugins**.

So, to the services running on your box, the guacd *server* acts as an
SSH or RDP *client*. (Yes, the terminology easily gets confusing, so
stay with us here.)


<!-- .slide: data-background-image="images/guacamole-overview-04.svg" data-background-size="contain" -->

<!-- Note -->
The guacd server's job is to take all these various upstream protocols
and translate them into a unified event stream using what's called the
Guacamole **protocol**. The idea is that whatever comes down the pipe,
whether it's SSH or RDP or VNC or whatever, is translated into one event
stream that's always the Guacamole protocol.

OK but your browser of course doesn't _speak_ the Guacamole
protocol. It speaks HTTP and Websockets. So we need another
translation engine.


<!-- .slide: data-background-image="images/guacamole-overview-05.svg" data-background-size="contain" -->

<!-- Note -->
And here's where the naming gets really confusing, because in
Guacamole's documentation this thing is called the Guacamole _client,_
even though it's very much a _server_ to your browser. But the naming
is correct in that it is indeed the _client_ part of the communication
between two endpoints _speaking the Guacamole protocol,_ the server
being guacd.


<!-- .slide: data-background-image="images/guacamole-overview-06.svg" data-background-size="contain" -->

<!-- Note -->
So the Guacamole "client" is the thing that speaks the Guacamole
protocol on one end -- to the guacd server --, and Websockets on the
other -- to your browser. And then to complete the picture you've got
some JavaScript on the browser that is responsible for rendering what
it gets from the websocket stream.


<!-- .slide: data-background-image="images/guacamole-overview.svg" data-background-size="contain" -->

<!-- Note -->
So keep this picture in mind; we'll come back to it at the end.


<!-- .slide: data-background-iframe="https://player.vimeo.com/video/116207678" -->

<!-- Note -->
Now, the Guacamole "client" which those of you who know Guacamole
already will be most familiar with is a Java servlet application. Most
of the time, what people do is

* deploy guacd
* deploy the guacamole servlet application

(all of which they can do either natively, or via Docker containers),
and what they get is a nice remote-desktop manager. 

And this bit here is an admittedly really old version of Guacamole
being showcased in a little video that you can find on the Guacamole
website, where you can see how you can connect, from that
remote-desktop manager application, to some Windows hosts and Linux
hosts and anything that speaks one of the protocols that `guacd` can
understand.


<!-- .slide: data-background-image="images/guacamole-overview-java-tomcat.svg" data-background-size="contain" -->

<!-- Note -->
So the general architecture looks like this.

Now if you don't need the standard Guacamole remote-desktop manager,
and you want to incorporate Guacamole into your own application, the
developers give you a nice how-to for [how to build your
own](https://guacamole.apache.org/doc/1.3.0/gug/writing-you-own-guacamole-app.html)
-- again, using a Java servlet stack.


<!-- .slide: data-background-iframe="https://guacamole.apache.org/doc/gug/writing-you-own-guacamole-app.html" -->

<!-- Note -->
OK, but now **what if** you don't want to take the Java detour? For
example, what if you already have some data in Django models that you
can nicely access in the Django ORM, that you somehow want to make
accessible to Guacamole.

As a simple example: you may be generating one-time SSH keys for
connecting to your labs. So, you now want to store that data in Django
somewhere, like, say two FileFields pointing to the private and public
key files. When you tear the lab down you'll throw them both away, but
while the lab is alive you want to grab that data from your database
and create a Guacamole connection.

Now, you *could* do some really bad data mangling and then copy all
that data from your Django model into a database that the Java
application could read from, but that gets ugly very quickly. So you
really don't want to do that.


<!-- .slide: data-background-image="images/guacamole-overview-python-django.svg" data-background-size="contain" -->

<!-- Note -->
So, what if instead you did this, and bypassed the Java servlet bits
altogether? What if you could write a full blown Guacamole client, in
Python, using Django, that has access to everything that's in your
data model and that you can just plug into your Django deployment
pipeline? Well it turns out that you can do exactly that.
