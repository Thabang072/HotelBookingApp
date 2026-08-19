using HotelBookingAPI.Data;
using HotelBookingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly HotelBookingContext _context;

        public HotelsController(HotelBookingContext context)
        {
            _context = context;
        }

        // =====================================================
        // GET ALL HOTELS
        // GET: http://localhost:5168/api/hotels
        // =====================================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels()
        {
            var hotels = await _context.Hotels.ToListAsync();

            return Ok(hotels);
        }


        // =====================================================
        // GET ONE HOTEL
        // GET: http://localhost:5168/api/hotels/1
        // =====================================================
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound(new
                {
                    message = $"Hotel with ID {id} was not found."
                });
            }

            return Ok(hotel);
        }


        // =====================================================
        // CREATE HOTEL
        // POST: http://localhost:5168/api/hotels
        // =====================================================
        [HttpPost]
        public async Task<ActionResult<Hotel>> CreateHotel(Hotel hotel)
        {
            if (hotel == null)
            {
                return BadRequest(new
                {
                    message = "Hotel information is required."
                });
            }

            _context.Hotels.Add(hotel);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetHotel),
                new { id = hotel.Id },
                hotel
            );
        }


        // =====================================================
        // UPDATE HOTEL
        // PUT: http://localhost:5168/api/hotels/1
        // =====================================================
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Hotel>> UpdateHotel(
            int id,
            Hotel hotel)
        {
            if (hotel == null)
            {
                return BadRequest(new
                {
                    message = "Hotel information is required."
                });
            }

            var existingHotel = await _context.Hotels.FindAsync(id);

            if (existingHotel == null)
            {
                return NotFound(new
                {
                    message = $"Hotel with ID {id} was not found."
                });
            }

            existingHotel.Name = hotel.Name;
            existingHotel.Location = hotel.Location;
            existingHotel.Description = hotel.Description;
            existingHotel.PricePerNight = hotel.PricePerNight;
            existingHotel.ImageUrl = hotel.ImageUrl;
            existingHotel.AvailableRooms = hotel.AvailableRooms;

            await _context.SaveChangesAsync();

            return Ok(existingHotel);
        }


        // =====================================================
        // DELETE HOTEL
        // DELETE: http://localhost:5168/api/hotels/1
        // =====================================================
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound(new
                {
                    message = $"Hotel with ID {id} was not found."
                });
            }

            _context.Hotels.Remove(hotel);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Hotel deleted successfully.",
                deletedHotelId = id
            });
        }
    }
}