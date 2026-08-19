using System.ComponentModel.DataAnnotations;

namespace HotelBookingAPI.Models
{
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        public int HotelId { get; set; }

        [Required]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string CustomerEmail { get; set; } = string.Empty;

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        [Required]
        [Range(1, 20)]
        public int NumberOfRooms { get; set; }

        // This is calculated automatically by BookingsController
        public decimal TotalPrice { get; set; }

        // This is set automatically when the booking is created
        public DateTime BookingDate { get; set; } = DateTime.Now;
    }
}