#Visit Seattle Code Challenge

####[See it live on my portfolio page!](http://nickuhn.net/visit_seattle/index.html)
[Click Here For Code Challenge Source](https://github.com/belief/BeliefAgencyCodeChallenge)

Using a supplied .pdf of the proposed layout I created a functioning website that matches very closely, over the course of about 2.5 days.

The site has as much functionality as could be added with the given the mocks and without a back end. The in site links take you to different sections of the page. The social media links take you to various Visit Seattle pages. The individual neighborhood links do not take you anywhere, they would link up to individual pages for each neighborhood, possibly injected into the page with AJAX.

Load more neighborhoods currently just uses jQuery to build another set of the current neighborhoods. It would perform and AJAX call and use the returned data to build the expanded list. The submit button on the form pops up an alert to show that it is working and would be linked with a server or database.

jQuery was used due to the mostly static format of the site. Depending on how the actual implementation of neighborhoods and expanding them out was done, I would probably expand to an MV* framework such as Angular.js or React.

I started using a grid framework for styling, but was not using the majority of the built in functionality so I reverted to just using custom CSS. I did use normalize.css to allow for better cross browser support and fall-back. As this project expanded out, I would switch over to using SASS for better organization and ease of maintenance.
