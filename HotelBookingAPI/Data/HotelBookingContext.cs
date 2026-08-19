using HotelBookingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingAPI.Data
{
    public class HotelBookingContext : DbContext
    {
        public HotelBookingContext(DbContextOptions<HotelBookingContext> options)
            : base(options)
        {
        }

        public DbSet<Hotel> Hotels { get; set; }

        public DbSet<Booking> Bookings { get; set; }
    }
}