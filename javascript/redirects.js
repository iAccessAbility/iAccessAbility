window.onload = function() {
    var path = window.location.pathname; // Get the current path
    if (window.location.pathname !== '/404.html') {
        window.location.replace(
            window.location.pathname === '/recommendations' ? '/html/recommendations.html' :
            window.location.pathname === '/news' ? '/news/index.html' :
            window.location.pathname === '/about' ? '/html/about.html' :
            window.location.pathname === '/connect' ? '/html/connect.html' :
            window.location.pathname === '/techtalks' ? '/html/tech-talks.html' :
            window.location.pathname === '/theapplecollection' ? '/html/theapplecollection.html' :
            '/404.html'
        );
    }
};
