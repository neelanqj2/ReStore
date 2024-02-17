There seems to be an issue with the experimental version of VITE with the version of .NET that I used for this project consequently, while the project is complete and workable the initial load screen links do not redirect. But if you reload the page with the sub urls, which loads the same page, it begins to work.
I'll fix this when I can be bothered by this. But for now, I'll continue back to doing interview preparation.

The fix is probably in the Programs.cs directory. You get rid of using the static files and the wwwroot folder and go back to using the controllers. It should work regularly again (although the angular files will not be compressed, I suspect this anomaly is an issue with the vite packager)
