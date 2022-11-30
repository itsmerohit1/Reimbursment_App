using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using finalProject.Models;

namespace finalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeDashBoardsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeDashBoardsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeDashBoards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDashBoard>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET: api/EmployeeDashBoards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDashBoard>> GetEmployeeDashBoard(string id)
        {
            var employeeDashBoard = await _context.Employees.FindAsync(id);

            if (employeeDashBoard == null)
            {
                return NotFound();
            }

            return employeeDashBoard;
        }

        // PUT: api/EmployeeDashBoards/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeDashBoard(string id, EmployeeDashBoard employeeDashBoard)
        {
            if (id != employeeDashBoard.id)
            {
                return BadRequest();
            }

            _context.Entry(employeeDashBoard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeDashBoardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeDashBoards
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EmployeeDashBoard>> PostEmployeeDashBoard(EmployeeDashBoard employeeDashBoard)
        {
            _context.Employees.Add(employeeDashBoard);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmployeeDashBoardExists(employeeDashBoard.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployeeDashBoard", new { id = employeeDashBoard.id }, employeeDashBoard);
        }

        // DELETE: api/EmployeeDashBoards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EmployeeDashBoard>> DeleteEmployeeDashBoard(string id)
        {
            var employeeDashBoard = await _context.Employees.FindAsync(id);
            if (employeeDashBoard == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employeeDashBoard);
            await _context.SaveChangesAsync();

            return employeeDashBoard;
        }

        private bool EmployeeDashBoardExists(string id)
        {
            return _context.Employees.Any(e => e.id == id);
        }
    }
}
