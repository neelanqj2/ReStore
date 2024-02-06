using API.Entities;

namespace API.DTOs
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }   
        public ShippingAddress ShippingAddress { get; set; }
    }
}