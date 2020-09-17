using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using RubiksCubeAPI.Models;

namespace RubiksCubeAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        static List<RubikCubecs> cubes = new List<RubikCubecs>();
        Random rnd = new Random();
        // GET api/values
        
        public RubikCubecs Get()
        {
            if (cubes.Count < 1)
            {
            RubikCubecs newcube = new RubikCubecs();
            newcube.White_Side = new string[] { "Yellow", "Yellow", "Yellow", "Yellow", "White", "Yellow", "Yellow", "Yellow", "Yellow" };
            newcube.Yellow_Side = new string[] { "White", "White", "White", "White", "Yellow", "White", "White", "White", "White" };
            newcube.Red_Side = new string[] { "Orange", "Orange", "Orange", "Orange", "Red", "Orange", "Orange", "Orange", "Orange" };
            newcube.Green_Side = new string[] { "Blue", "Blue", "Blue", "Blue", "Green", "Blue", "Blue", "Blue", "Blue" };
            newcube.Blue_Side = new string[] { "Green", "Green", "Green", "Green", "Blue", "Green", "Green", "Green", "Green" };
            newcube.Orange_Side = new string[] { "Red", "Red", "Red", "Red", "Orange", "Red", "Red", "Red", "Red" };
            cubes.Add(newcube);
            }

            return cubes[rnd.Next(0, cubes.Count)];
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody] RubikCubecs cube)
        {
            cubes.Add(cube);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
