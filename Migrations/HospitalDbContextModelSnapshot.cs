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

            modelBuilder.Entity("Hospital.Domain.Shared.ContactInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ContactInformation");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "ruimdv13@gmail.com",
                            PhoneNumber = "912028969"
                        },
                        new
                        {
                            Id = 2,
                            Email = "doctor@hospital.com",
                            PhoneNumber = "1234567891"
                        },
                        new
                        {
                            Id = 3,
                            Email = "nurse@hospital.com",
                            PhoneNumber = "1234567892"
                        });
                });

            modelBuilder.Entity("Hospital.Domain.Users.SystemUser", b =>
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

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("SystemUser", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("5fc1f233-f7f2-4fa1-909b-d9fda288a4c6"),
                            Email = "ruimdv13@gmail.com",
                            IAMId = "1",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "912028969",
                            Role = 0,
                            Username = "adminUser"
                        },
                        new
                        {
                            Id = new Guid("68a3efb1-85dd-4b0c-9834-aae8fbf7eb97"),
                            Email = "doctor@hospital.com",
                            IAMId = "2",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567891",
                            Role = 1,
                            Username = "doctorUser"
                        },
                        new
                        {
                            Id = new Guid("625070bf-c676-412f-a231-20a2bc64c468"),
                            Email = "nurse@hospital.com",
                            IAMId = "3",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567892",
                            Role = 2,
                            Username = "nurseUser"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
