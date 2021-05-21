// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({

    controls: false,

    progress: true,
    history: true,
    center: true,
    showNotes: false,

    transition: 'none',

    // Advance to the next slide when pressing the return (enter) key
    keyboard: {
	13: 'next'
    },

    menu: {
        themes: true,
        themesPath: 'reveal.js/css/theme',
        transitions: false,
        openButton: false,
        openSlideNumber: true,
        markers: true
    },





    // Optional libraries used to extend on reveal.js
    dependencies: [
        { src: 'reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        { src: 'reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        { src: 'reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
        { src: 'reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },


        { src: 'reveal.js-menu/menu.js', async: true, condition: function() { return !!document.body.classList; } },


    ]
});
