using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            PhysicalFileResult pf = PhysicalFile(
                Path.Combine(
                    Directory.GetCurrentDirectory(), 
                    "wwwroot", 
                    "index.html"), 
                "text/HTML");

			Console.WriteLine("----xxx----");
			Console.WriteLine(Directory.GetCurrentDirectory());
			Console.WriteLine("----xxx----");

			return pf;
        }
    }
}