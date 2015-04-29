namespace entdemo.website.Models.Entdemo
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class Entdemo : DbContext
    {
        // Your context has been configured to use a 'Entdemo' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'entdemo.website.Models.Entdemo.Entdemo' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'Entdemo' 
        // connection string in the application configuration file.
        public Entdemo()
            : base("name=Entdemo")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

         public virtual DbSet<Tenant> Tenants{ get; set; }
    }

}