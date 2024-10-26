﻿// <auto-generated />
using System;
using Hospital.Infraestructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace sem5pi_24_25_g202.Migrations
{
    [DbContext(typeof(HospitalDbContext))]
    partial class HospitalDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Hospital.Domain.Users.SystemUser.SystemUser", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("char(36)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("IAMId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ResetToken")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<DateTime?>("TokenExpiry")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<bool>("isVerified")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("SystemUser", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("4282df1c-473c-49e5-ab83-856f7a75b107"),
                            Email = "ruimdv13@gmail.com",
                            IAMId = "1",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "912028969",
                            ResetToken = "",
                            Role = 0,
                            Username = "adminUser",
                            isVerified = true
                        },
                        new
                        {
                            Id = new Guid("1e109e40-ca41-4353-ad3a-bacac35ef261"),
                            Email = "doctor@hospital.com",
                            IAMId = "2",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567891",
                            ResetToken = "",
                            Role = 1,
                            Username = "doctorUser",
                            isVerified = true
                        },
                        new
                        {
                            Id = new Guid("88f34819-97f6-49c1-b89b-1366141be83a"),
                            Email = "nurse@hospital.com",
                            IAMId = "3",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567892",
                            ResetToken = "",
                            Role = 2,
                            Username = "nurseUser",
                            isVerified = true
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
