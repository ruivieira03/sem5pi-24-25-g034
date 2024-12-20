﻿// <auto-generated />
using System;
using Hospital.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace sem5pi_24_25_g202.Migrations
{
    [DbContext(typeof(HospitalDbContext))]
    [Migration("20241026205722_MakeSystemUserIdNullable2")]
    partial class MakeSystemUserIdNullable2
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

                    b.Property<Guid?>("SystemUserId")
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("SystemUserId1")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("SystemUserId1");

                    b.HasIndex("Email", "PhoneNumber")
                        .IsUnique();

                    b.ToTable("Patients", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("bd999d1c-4801-4995-bdb7-6856cbfb85a9"),
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
                            Id = new Guid("ff1a420a-2bb6-472e-a447-9b37bd2390ce"),
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

                    b.Property<string>("VerifyToken")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("isVerified")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("SystemUser", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("65001c25-a3d2-44f7-8267-ad0acb1e2b48"),
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
                            Id = new Guid("2b09789d-c1b7-4687-b1fb-7a5e8f58dd4a"),
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
                            Id = new Guid("bdd040a9-e0b8-4e7b-a206-314d500604bf"),
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

            modelBuilder.Entity("Hospital.Domain.Patients.Patient", b =>
                {
                    b.HasOne("Hospital.Domain.Users.SystemUser.SystemUser", "SystemUser")
                        .WithMany()
                        .HasForeignKey("SystemUserId1");

                    b.Navigation("SystemUser");
                });
#pragma warning restore 612, 618
        }
    }
}
