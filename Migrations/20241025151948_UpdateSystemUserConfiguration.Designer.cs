﻿// <auto-generated />
using System;
using Hospital.Infraestructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace sem5pi_24_25_g202.Migrations
{
    [DbContext(typeof(HospitalDbContext))]
    [Migration("20241025151948_UpdateSystemUserConfiguration")]
    partial class UpdateSystemUserConfiguration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.HasKey("Id");

                    b.ToTable("SystemUser", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("6bfa9c6f-6156-412d-8b39-feb2e83b9542"),
                            Email = "ruimdv13@gmail.com",
                            IAMId = "1",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "912028969",
                            ResetToken = "",
                            Role = 0,
                            Username = "adminUser"
                        },
                        new
                        {
                            Id = new Guid("fb8f1a9c-38ab-498b-830d-67581d8be8a9"),
                            Email = "doctor@hospital.com",
                            IAMId = "2",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567891",
                            ResetToken = "",
                            Role = 1,
                            Username = "doctorUser"
                        },
                        new
                        {
                            Id = new Guid("ac80239e-cfc6-4cfa-9867-909df44e51a1"),
                            Email = "nurse@hospital.com",
                            IAMId = "3",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567892",
                            ResetToken = "",
                            Role = 2,
                            Username = "nurseUser"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
