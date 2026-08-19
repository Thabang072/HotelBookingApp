using HotelBookingAPI.Data;
using HotelBookingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly HotelBookingContext _context;

        public BookingsController(HotelBookingContext context)
        {
            _context = context;
        }

        // =====================================================
        // GET ALL BOOKINGS
        // GET: api/bookings
        // =====================================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            var bookings = await _context.Bookings.ToListAsync();

            return Ok(bookings);
        }

        // =====================================================
        // GET ONE BOOKING
        // GET: api/bookings/1
        // =====================================================
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound(new
                {
                    message = $"Booking with ID {id} was not found."
                });
            }

            return Ok(booking);
        }

        // =====================================================
        // CREATE BOOKING
        // POST: api/bookings
        // =====================================================
        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking(
            [FromBody] Booking booking)
        {
            // Check that the booking data was provided
            if (booking == null)
            {
                return BadRequest(new
                {
                    message = "Booking data is required."
                });
            }

            // Check that the hotel exists
            var hotel = await _context.Hotels.FindAsync(booking.HotelId);

            if (hotel == null)
            {
                return NotFound(new
                {
                    message = $"Hotel with ID {booking.HotelId} was not found."
                });
            }

            // Check that check-out is after check-in
            if (booking.CheckOutDate <= booking.CheckInDate)
            {
                return BadRequest(new
                {
                    message = "Check-out date must be after check-in date."
                });
            }

            // Check number of rooms
            if (booking.NumberOfRooms <= 0)
            {
                return BadRequest(new
                {
                    message = "Number of rooms must be at least 1."
                });
            }

            // Check available rooms
            if (booking.NumberOfRooms > hotel.AvailableRooms)
            {
                return BadRequest(new
                {
                    message = $"Only {hotel.AvailableRooms} rooms are available."
                });
            }

            // Calculate number of nights
            int numberOfNights =
                (booking.CheckOutDate.Date - booking.CheckInDate.Date).Days;

            // Calculate total price
            booking.TotalPrice =
                hotel.PricePerNight *
                booking.NumberOfRooms *
                numberOfNights;

            // Set booking date
            booking.BookingDate = DateTime.Now;

            // Reduce available rooms
            hotel.AvailableRooms -= booking.NumberOfRooms;

            // Add booking
            _context.Bookings.Add(booking);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetBooking),
                new { id = booking.Id },
                booking
            );
        }

        // =====================================================
        // DELETE BOOKING
        // DELETE: api/bookings/1
        // =====================================================
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound(new
                {
                    message = $"Booking with ID {id} was not found."
                });
            }

            // Find the hotel
            var hotel = await _context.Hotels.FindAsync(booking.HotelId);

            // Return rooms to the hotel
            if (hotel != null)
            {
                hotel.AvailableRooms += booking.NumberOfRooms;
            }

            _context.Bookings.Remove(booking);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Booking deleted successfully.",
                deletedBookingId = id
            });
        }
    }
}