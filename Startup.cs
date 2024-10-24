using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Auth0.AspNetCore.Authentication;
using Hospital.Infraestructure;
using Hospital.Infraestructure.Shared;
using Hospital.Domain.Shared;
using System.Diagnostics;
using System;
using Hospital.Domain.Users;
using Hospital.Infraestructure.Users;
using Hospital.Services;

namespace Hospital
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDistributedMemoryCache();

            services.AddSession(options => {
                    options.IdleTimeout = TimeSpan.FromSeconds(10);
                    options.Cookie.HttpOnly = true;
                    options.Cookie.IsEssential = true;
                    });

            // https support for authentication
            services.Configure<CookiePolicyOptions> ( options => {
                    options.MinimumSameSitePolicy = SameSiteMode.None;
                    });
            
            // inner method gets called twice for some reason, 
            // ignored for now
            services.AddAuth0WebAppAuthentication(options => {
                    string domain = Configuration["Auth0:Domain"];
                    string clientId = Configuration["Auth0:ClientId"];
                    
                    Debug.Assert(domain != null, "Auth0 Domain token is not set in appsettings.json or in user secrets. USE USER SECRETS if not in prod. Check config documentation. [\"Auth0:Domain\"]");
                    Debug.Assert(clientId != null, "Auth0 ClientId is not set in appsettings.json or in user secrets. USE USER SECRETS if not in prod. Check config documentation. [\"Auth0:ClientId\"]");

                    options.Domain = domain;
                    options.ClientId = clientId;
                    options.CallbackPath = new PathString("/api/");
                    options.Scope = "openid profile email";
                    
                    });


            services.AddDbContext<HospitalDbContext>(opt =>
                opt.UseMySql(Configuration.GetConnectionString("DefaultConnection"), MySqlServerVersion.AutoDetect(Configuration.GetConnectionString("DefaultConnection"))));

            ConfigureMyServices(services);
            
            services.AddControllers().AddNewtonsoftJson();
        }
    

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
    
            app.UseSession();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<ISystemUserRepository,SystemUserRepository>();
            services.AddTransient<IEmailService, EmailService>();
            //services.AddTransient<CategoryService>();
            /*services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<ICategoryRepository,CategoryRepository>();
            services.AddTransient<CategoryService>();

            services.AddTransient<IProductRepository,ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IFamilyRepository,FamilyRepository>();
            services.AddTransient<FamilyService>();*/
        }
    }
    
}