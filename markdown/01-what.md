So what are we talking about here? Let us show you. What you see on
your screen right now is a platform that we run, City Cloud
Academy. It is a learning management system that's based on Open edX,
which _itself_ is a big set of Django applications that could be a
DjangoCon talk -- or tutorial! on its own. And in fact, probably the
only reason why this is the _only_ Open edX talk in the conference is
that Open edX had its _own_ annual conference just last week.

So we run this learning platform to teach people complex technology
-- like Ceph, Kubernetes, OpenStack, Terraform, that sort of
thing. And we hope that you agree with us that most people learn best
by doing. So, you don't want to just _read_ about all those things or
watch someone _else_ do them, you of course want to do them yourself.

And because all those technologies are inherently distributed, you
want to learn them on distributed systems. _Real platforms._ Like a
lab that your company might otherwise have available in hardware.

But. A hardware lab is really expensive. And it's usually a scarce and
overbooked resource. And sometimes outright inaccessible, such as when
everyone is working from home in a middle of a pandemic. So, in comes
cloud technology. As it happens we work for a cloud company so that
comes in handy for us, but that is of secondary importance to what
we're about to show you, as you'll see in a moment. So this totally
applies to you even if you're _not_ working in a cloud company.

So. What's happening here is that we open up a page on the learning
management system -- the "LMS" -- and it contains a little magic
window. And that window is your entry point to your own little
lab. Without you knowing it, once you hit this page, the LMS makes an
API call to the cloud platform on your behalf, spins up an arbitrarily
complex stack -- could be one virtual machine, could be 5, could be
10, could be 3 that each run 50 containers, whatever -- and then
presents you with a terminal, right there in your browser.

And -- as you can see in the next lab here --, that terminal needn't
be a boring old text terminal, but it can be a full-blown desktop as
well.

Now, today we're not going to talk about all the fun little details of
how the interaction with this cloud platform works, or how the lab
stacks spin up, or how they automatically go to sleep when you don't
need them, or how they magically wake up when you come back to them --
because we've already done a bunch of talks on that, they're on the
internet, and we have YouTube links for them at the end of the talk,
and you can try this out yourself on our platform, as well.

Today we're instead going to zoom in on precisely how this entry point
works. How, exactly, you can make a fully interactive terminal or
desktop session pop up in someone's browser -- using Django, of
course.
