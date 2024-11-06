﻿// <auto-generated />
using System;
using Hospital.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sem5pi_24_25_g202.Migrations
{
    [DbContext(typeof(HospitalDbContext))]
    [Migration("20241026235647_MakeSystemUserIdNullable4")]
    partial class MakeSystemUserIdNullable4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Hospital.Domain.Patients.Patient", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("char(36)");

                    b.Property<string>("AllergiesOrMedicalConditions")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("AppointmentHistory")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("EmergencyContact")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("MedicalRecordNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.HasKey("Id");

                    b.HasIndex("Email", "PhoneNumber")
                        .IsUnique();

                    b.ToTable("Patients", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("91dae9c7-17f0-4bba-8b50-eab6c8753f39"),
                            AllergiesOrMedicalConditions = "[\"Penicillin allergy\"]",
                            AppointmentHistory = "[\"Checkup on 2024-01-20\"]",
                            DateOfBirth = new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "1220741@isep.ipp.pt",
                            EmergencyContact = "0987654321",
                            FirstName = "Bernardo",
                            Gender = "Male",
                            LastName = "Giao",
                            MedicalRecordNumber = "MRN123456",
                            PhoneNumber = "1234567890"
                        },
                        new
                        {
                            Id = new Guid("4fcc3191-5a50-491e-9544-281d78217be6"),
                            AllergiesOrMedicalConditions = "[\"Nut allergy\"]",
                            AppointmentHistory = "[\"Vaccination on 2023-05-15\"]",
                            DateOfBirth = new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "ruimdvieir@gmail.com",
                            EmergencyContact = "0987654322",
                            FirstName = "Rui",
                            Gender = "Male",
                            LastName = "Vieira",
                            MedicalRecordNumber = "MRN987654",
                            PhoneNumber = "1234567891"
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
                        .HasColumnType("longtext");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<DateTime?>("TokenExpiry")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("VerifyToken")
                        .HasColumnType("longtext");

                    b.Property<bool>("isVerified")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("SystemUser", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("5f294de5-78e3-4f62-8655-b7d7e144e8b1"),
                            Email = "ruimdv13@gmail.com",
                            IAMId = "1",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "912028969",
                            ResetToken = "",
                            Role = 0,
                            Username = "adminUser",
                            VerifyToken = "",
                            isVerified = true
                        },
                        new
                        {
                            Id = new Guid("c7d8a2a5-057d-4e2b-9840-f73178520f61"),
                            Email = "doctor@hospital.com",
                            IAMId = "2",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567891",
                            ResetToken = "",
                            Role = 1,
                            Username = "doctorUser",
                            VerifyToken = "",
                            isVerified = true
                        },
                        new
                        {
                            Id = new Guid("fde98791-34c2-4da3-9771-c121f520277e"),
                            Email = "nurse@hospital.com",
                            IAMId = "3",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567892",
                            ResetToken = "",
                            Role = 2,
                            Username = "nurseUser",
                            VerifyToken = "",
                            isVerified = true
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
