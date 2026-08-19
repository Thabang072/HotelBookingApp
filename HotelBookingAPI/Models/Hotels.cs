namespace HotelBookingAPI.Models
{
    public class Hotel
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal PricePerNight { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public int AvailableRooms { get; set; }
    }
}