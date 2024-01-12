using System.Net;
using System.Runtime.CompilerServices;
using System.Net.Cache;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly ILogger<BasketController> _logger;
        private readonly StoreContext _context;

        public BasketController(StoreContext context, ILogger<BasketController> logger)
        {
            _logger = logger;
            _context = context;
        }

       

        [HttpGet(Name= "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket() {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            Basket basket = await RetrieveBasket();
            if(basket == null) basket = CreateBasket();
            
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return BadRequest(new ProblemDetails{Title="Product Not Found"});

            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));
            return BadRequest(new ProblemDetails{Title ="Problem saving item to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem deleting item from basket" });
        }
        
        private async Task<Basket> RetrieveBasket()
        {
            var cookie = Request.Cookies["buyerId"];
            return await _context
                .Basket
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == cookie);
        }

     
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Basket.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket) {
            return new BasketDto
                {
                    Id = basket.Id,
                    BuyerId = basket.BuyerId,
                    Items = basket.Items.Select(item => new BasketItemDto
                    {
                        ProductId = item.ProductId,
                        Name = item.Product.Name,
                        Price = item.Product.Price,
                        PictureUrl = item.Product.PictureUrl,
                        Type = item.Product.Type,
                        Brand = item.Product.Brand,
                        Quantity = item.Quantity
                    }).ToList()
            };
        }
    }
}