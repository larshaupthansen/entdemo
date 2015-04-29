using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using entdemo.website.Models.Entdemo;

namespace entdemo.website.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using entdemo.website.Models.Entdemo;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Tenant>("Tenant");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class TenantController : ODataController
    {
        private Entdemo db = new Entdemo();

        // GET: odata/Tenant
        [EnableQuery]
        public IQueryable<Tenant> GetTenant()
        {
            return db.Tenants;
        }

        // GET: odata/Tenant(5)
        [EnableQuery]
        public SingleResult<Tenant> GetTenant([FromODataUri] int key)
        {
            return SingleResult.Create(db.Tenants.Where(tenant => tenant.TenantId == key));
        }

        // PUT: odata/Tenant(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Tenant> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Tenant tenant = db.Tenants.Find(key);
            if (tenant == null)
            {
                return NotFound();
            }

            patch.Put(tenant);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TenantExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tenant);
        }

        // POST: odata/Tenant
        public IHttpActionResult Post(Tenant tenant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tenants.Add(tenant);
            db.SaveChanges();

            return Created(tenant);
        }

        // PATCH: odata/Tenant(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Tenant> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Tenant tenant = db.Tenants.Find(key);
            if (tenant == null)
            {
                return NotFound();
            }

            patch.Patch(tenant);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TenantExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(tenant);
        }

        // DELETE: odata/Tenant(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Tenant tenant = db.Tenants.Find(key);
            if (tenant == null)
            {
                return NotFound();
            }

            db.Tenants.Remove(tenant);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TenantExists(int key)
        {
            return db.Tenants.Count(e => e.TenantId == key) > 0;
        }
    }
}
